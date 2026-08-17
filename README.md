# Anna Burgess Portfolio — JSON-Driven Version

This version is designed so you **do not need to edit the HTML for normal content changes**.

## Edit `content.json`

Open `content.json` in VS Code, Notepad/TextEdit, or directly on GitHub and edit the text between quotation marks.

You can change:

- homepage text and motto
- portrait filename
- About Me copy
- featured project list
- skills
- honors and awards
- certifications
- contact copy and links
- navigation labels
- every project title, organization, description, contribution, outcome, technical tags, images, and PDF links
- page titles and introductions
- hobby text and images

The HTML files are now just page shells. Normally, leave them alone.

## Important JSON rules

1. Keep double quotes around text.
2. Keep commas between items.
3. Do not add a comma after the final item in an object or list.
4. If you need a literal double quote inside text, write it as `\"`.

VS Code will highlight JSON mistakes automatically.

## Project images

Each project has an `images` list in `content.json`. The **first image is automatically the project-card cover**.

Example:

```json
"images": [
  "assets/images/yellow-jacket-1.jpg",
  "assets/images/yellow-jacket-2.jpg",
  "assets/images/yellow-jacket-3.jpg"
]
```

Upload those image files into `assets/images/`.

## Project documents

Project papers, presentations, and posters are controlled by each project's `attachments` list.

Example:

```json
"attachments": [
  ["Project Paper", "assets/docs/Yellow_Jacket_Paper.pdf"],
  ["Presentation", "assets/docs/Yellow_Jacket_Presentation.pdf"]
]
```

Upload the actual PDFs into `assets/docs/`.

## Portrait

The homepage portrait currently points to:

`assets/images/anna-portrait.jpg`

You can either upload a photo with that exact name or change `home.hero.portrait` in `content.json`.

## CV

The CV button currently points to:

`Anna_Burgess_CV.pdf`

When your CV is ready, upload it to the repository root with that filename, or change `site.links.cv` in `content.json`.

## Previewing the site

Because the site now loads `content.json` using JavaScript, double-clicking `index.html` on your computer may not work because browsers restrict local `fetch()` requests.

Use your GitHub Pages URL for normal viewing. If you want a local preview, run a simple local web server from the repository folder, for example with VS Code Live Server.

## Adding a new project

1. Copy an existing project object inside `projects` in `content.json`.
2. Give it a unique ID/key.
3. Edit its content and image paths.
4. Add that project ID to the appropriate `projectIds` list under a page or under `home.featured.projectIds`.

No HTML editing is required.
