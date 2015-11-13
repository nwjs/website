---
layout: default
---
<div class="container blog">
	<div class="content">
		<h1 class="heading">Blog Entry</h1>
		<ul class="post-list">
			{% for post in site.posts %}
			<li>
				<h2>
					<a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
				</h2>
				<span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
				<div class="post-content">
					{{ post.excerpt }}
				</div>
			</li>
			{% endfor %}
		</ul>

	</div>
</div>