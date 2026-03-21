const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const sass = require('sass');
const esbuild = require('esbuild');
const http = require('http');

const SRC = path.join(__dirname, 'src');
const BUILD = path.join(__dirname, 'build');
const TEMPLATES = path.join(__dirname, 'templates');
const PUBLIC = path.join(__dirname, 'public');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDirSync(src, dest) {
  mkdirp(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function readFilesRecursive(dir, base) {
  base = base || dir;
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(readFilesRecursive(full, base));
    } else {
      results.push(path.relative(base, full));
    }
  }
  return results;
}

// Parse YAML-ish frontmatter (simple key: value)
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { metadata: {}, body: content };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) {
      meta[m[1]] = m[2].trim();
    }
  }
  return { metadata: meta, body: match[2] };
}

// Simple markdown renderer using the built-in approach
// We use a dynamic import for marked since it's an ES module in newer versions
let marked;
async function getMarked() {
  if (!marked) {
    // Try require first, fall back to dynamic import
    try {
      marked = require('marked');
      if (typeof marked === 'object' && marked.marked) {
        marked = marked.marked;
      }
    } catch (e) {
      const mod = await import('marked');
      marked = mod.marked;
    }
  }
  return marked;
}

// ---------------------------------------------------------------------------
// Build pipeline
// ---------------------------------------------------------------------------

async function build() {
  const startTime = Date.now();

  // Clean build dir
  fs.rmSync(BUILD, { recursive: true, force: true });
  mkdirp(BUILD);

  // 1. Copy static files from public/
  if (fs.existsSync(PUBLIC)) {
    copyDirSync(PUBLIC, BUILD);
  }

  // 2. Load config
  const config = JSON.parse(fs.readFileSync(path.join(SRC, 'config.json'), 'utf8'));

  // 3. Load and register Handlebars partials
  const partialsDir = path.join(TEMPLATES, 'partials');
  for (const file of fs.readdirSync(partialsDir)) {
    if (file.endsWith('.hbs')) {
      const name = path.basename(file, '.hbs');
      Handlebars.registerPartial(name, fs.readFileSync(path.join(partialsDir, file), 'utf8'));
    }
  }

  // 4. Load layout templates
  const layouts = {};
  const layoutsDir = path.join(TEMPLATES, 'layouts');
  for (const file of fs.readdirSync(layoutsDir)) {
    if (file.endsWith('.hbs')) {
      layouts[file] = Handlebars.compile(fs.readFileSync(path.join(layoutsDir, file), 'utf8'));
    }
  }

  // 5. Read all source files
  const allFiles = readFilesRecursive(SRC);
  const markedLib = await getMarked();

  // Collect blog posts
  const blogs = [];
  const outputFiles = [];

  for (const relPath of allFiles) {
    const ext = path.extname(relPath);
    const fullPath = path.join(SRC, relPath);

    // Skip config.json (metadata file, not output)
    if (relPath === 'config.json') continue;

    if (ext === '.md') {
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { metadata, body } = parseFrontmatter(raw);

      // Process Handlebars in-place (for {{{title}}}, {{{date}}}, etc.)
      const hbsTemplate = Handlebars.compile(body);
      const processedBody = hbsTemplate({ ...metadata, config, site: { url: 'http://nwjs.io/' } });

      // Convert markdown to HTML
      const htmlContent = markedLib(processedBody);

      // Determine output path (permalinks: blog/v0.12.3.md -> blog/v0.12.3/index.html)
      const baseName = relPath.replace(/\.md$/, '');
      const outPath = baseName + '/index.html';

      const entry = {
        ...metadata,
        relPath,
        outPath,
        path: baseName,
        content: htmlContent,
        metadata,
        layout: metadata.layout || 'blog-layout.hbs'
      };

      if (relPath.startsWith('blog/')) {
        blogs.push(entry);
      }

      outputFiles.push(entry);

    } else if (ext === '.html') {
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { metadata, body } = parseFrontmatter(raw);

      // Determine output path
      const baseName = relPath.replace(/\.html$/, '');
      let outPath;
      if (baseName === 'index') {
        outPath = 'index.html';
      } else {
        outPath = baseName + '/index.html';
      }

      outputFiles.push({
        relPath,
        outPath,
        path: baseName,
        content: body, // will be processed with Handlebars later
        metadata,
        layout: metadata.layout || 'layout.hbs',
        isHtml: true
      });

    } else if (ext === '.scss') {
      // Compile SCSS (only non-partial files)
      if (!path.basename(relPath).startsWith('_')) {
        const result = sass.compile(fullPath, {
          loadPaths: [path.dirname(fullPath)],
          silenceDeprecations: ['import']
        });
        const cssPath = relPath.replace(/\.scss$/, '.css');
        const outFull = path.join(BUILD, cssPath);
        mkdirp(path.dirname(outFull));
        fs.writeFileSync(outFull, result.css);
      }

    } else if (ext === '.js') {
      // Transpile JSX with esbuild
      const code = fs.readFileSync(fullPath, 'utf8');
      const hasJSX = code.includes('<') && (code.includes('React.createClass') || code.includes('React.createElement'));
      if (hasJSX) {
        const result = esbuild.transformSync(code, {
          loader: 'jsx',
          target: 'es5',
          jsx: 'transform',
          jsxFactory: 'React.createElement',
          jsxFragment: 'React.Fragment'
        });
        const outFull = path.join(BUILD, relPath);
        mkdirp(path.dirname(outFull));
        fs.writeFileSync(outFull, result.code);
      } else {
        const outFull = path.join(BUILD, relPath);
        mkdirp(path.dirname(outFull));
        fs.copyFileSync(fullPath, outFull);
      }

    } else {
      // Copy everything else as-is (images, etc.)
      const outFull = path.join(BUILD, relPath);
      mkdirp(path.dirname(outFull));
      fs.copyFileSync(fullPath, outFull);
    }
  }

  // 6. Sort blog collection by date (newest first)
  blogs.sort((a, b) => {
    const da = a.metadata.date || '';
    const db = b.metadata.date || '';
    return db.localeCompare(da);
  });

  // 7. Process HTML files with Handlebars (they need access to collections)
  // Then apply layouts to all files
  for (const file of outputFiles) {
    // Skip blog.html — we generate paginated listing separately
    if (file.relPath === 'blog.html') continue;

    const layoutFn = layouts[file.layout];
    if (!layoutFn) {
      console.warn(`Layout not found: ${file.layout} for ${file.relPath}`);
      continue;
    }

    const templateData = {
      ...file.metadata,
      config,
      site: { url: 'http://nwjs.io/' },
      collections: { blogs }
    };

    let processedContent = file.content;

    // For HTML source files, process Handlebars in the content
    if (file.isHtml) {
      const contentTemplate = Handlebars.compile(processedContent);
      processedContent = contentTemplate(templateData);
    }

    // Apply layout
    const finalHtml = layoutFn({
      ...templateData,
      contents: processedContent,
      content: processedContent
    });

    const outFull = path.join(BUILD, file.outPath);
    mkdirp(path.dirname(outFull));
    fs.writeFileSync(outFull, finalHtml);
  }

  // 7b. Generate paginated blog listing
  generateBlogPages(blogs, layouts, config);

  // 8. Generate RSS feed
  generateRssFeed(blogs, config);

  // 9. Copy versions.json if it exists in build (it's a manually maintained file)
  // It should already be in build from previous builds or is maintained separately
  const versionsPath = path.join(BUILD, 'versions.json');
  if (!fs.existsSync(versionsPath)) {
    // Check if it exists alongside the source
    const srcVersions = path.join(__dirname, 'versions.json');
    if (fs.existsSync(srcVersions)) {
      fs.copyFileSync(srcVersions, versionsPath);
    }
  }

  const elapsed = Date.now() - startTime;
  console.log(`Build complete in ${elapsed}ms (${outputFiles.length} pages, ${blogs.length} blog posts)`);
}

// ---------------------------------------------------------------------------
// Paginated blog listing
// ---------------------------------------------------------------------------

const POSTS_PER_PAGE = 20;

function generateBlogPages(blogs, layouts, config) {
  const layoutFn = layouts['blog-layout.hbs'];
  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);

  for (let page = 1; page <= totalPages; page++) {
    const start = (page - 1) * POSTS_PER_PAGE;
    const pagePosts = blogs.slice(start, start + POSTS_PER_PAGE);

    let html = '<ul>\n';
    for (const post of pagePosts) {
      html += `    <li>\n        <h3>[${post.date || ''}] - <a href="/${post.path}">${post.title || ''}</a></h3>\n    </li>\n`;
    }
    html += '</ul>\n';

    // Pagination nav
    html += '<div class="pagination">';
    if (page > 1) {
      const prevUrl = page === 2 ? '/blog/' : `/blog/page/${page - 1}/`;
      html += `<a href="${prevUrl}">&laquo; Newer</a>`;
    }
    html += `<span class="page-info">Page ${page} of ${totalPages}</span>`;
    if (page < totalPages) {
      html += `<a href="/blog/page/${page + 1}/">Older &raquo;</a>`;
    }
    html += '</div>\n';

    const finalHtml = layoutFn({
      title: page === 1 ? 'Blogs' : `Blogs - Page ${page}`,
      config,
      site: { url: 'http://nwjs.io/' },
      contents: html,
      content: html
    });

    const outDir = page === 1
      ? path.join(BUILD, 'blog')
      : path.join(BUILD, 'blog', 'page', String(page));
    mkdirp(outDir);
    fs.writeFileSync(path.join(outDir, 'index.html'), finalHtml);
  }
}

// ---------------------------------------------------------------------------
// RSS Feed
// ---------------------------------------------------------------------------

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateRssFeed(blogs, config) {
  const siteUrl = 'http://nwjs.io';
  const items = blogs.slice(0, 20).map(blog => {
    const link = `${siteUrl}/${blog.path}/`;
    return `    <item>
      <title>${escapeXml(blog.metadata.title || '')}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <description>${escapeXml(blog.content)}</description>
    </item>`;
  }).join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NW.js Blog</title>
    <link>${siteUrl}/</link>
    <atom:link href="${siteUrl}/feed/blog.xml" rel="self" type="application/rss+xml"/>
    <description>NW.js Blog</description>
${items}
  </channel>
</rss>`;

  mkdirp(path.join(BUILD, 'feed'));
  fs.writeFileSync(path.join(BUILD, 'feed', 'blog.xml'), feed);
}

// ---------------------------------------------------------------------------
// Dev server
// ---------------------------------------------------------------------------

function serve() {
  const port = 3003;
  http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(BUILD, urlPath);

    // Try the path as-is, then as directory with index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const extMap = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.xml': 'application/xml',
      '.gz': 'application/gzip',
      '.zip': 'application/zip'
    };
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': extMap[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  }).listen(port, '0.0.0.0', () => {
    console.log(`Serving at http://0.0.0.0:${port}`);
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

build().then(() => {
  if (process.argv.includes('--serve')) {
    serve();
  }
}).catch(err => {
  console.error(err);
  process.exit(1);
});
