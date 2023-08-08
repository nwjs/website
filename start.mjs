import { exec}  from 'node:child_process';
import { watch } from "node:fs/promises";

import express from 'express';

async function build () {
    exec('metalsmith');
}

async function watchr () {
    try {
        const watcher = await watch("src", { recursive: true });
      
        for await (const event of watcher) {
          if (event) {
            build();
          }
        }
      } catch (e) {
        log.error(e);
      }
}

async function serve () {
  const app = express();
  app.use(express.static('build'));
  app.listen(3000);
}

serve();