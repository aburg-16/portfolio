// Run `node generate-project-pages.cjs` after adding or renaming projects.
const fs = require('node:fs');
const path = require('node:path');
const content = JSON.parse(fs.readFileSync(path.join(__dirname, 'content.json'), 'utf8'));
const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

for (const [id, project] of Object.entries(content.projects)) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`Invalid project ID: ${id}`);
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(project.summary || project.desc)}">
  <title>${escape(project.title)} | Anna Burgess</title>
  <meta name="theme-color" content="#f7f5ef">
  <script src="theme.js?v=celestial2026"></script>
  <link rel="stylesheet" href="style.css?v=celestial2026">
</head>
<body data-page="project" data-project="${escape(id)}">
  <div id="site-root"><div class="loading-screen">Loading project&hellip;</div></div>
  <noscript><main class="container"><h1>${escape(project.title)}</h1><p>${escape(project.desc)}</p><p>Enable JavaScript to view the gallery and complete project details.</p><a href="index.html">Return to portfolio</a></main></noscript>
  <script src="script.js?v=celestial2026"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(__dirname, `project-${id}.html`), html);
}
console.log(`Generated ${Object.keys(content.projects).length} project pages.`);
