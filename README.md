# Anna Burgess Portfolio — GitHub Pages

## Upload / update
Upload all files and folders in this package to the root of your GitHub Pages repository. Keep the `assets/` folder structure unchanged.

## Portrait
Add your headshot as:
- `assets/images/anna-portrait.jpg`

## Project images
Every project card uses the **first image** in its carousel as the card image. The project popup cycles through the full image list. If a file is missing, the site shows a gray placeholder with the required filename.

Examples:
- `assets/images/fud-1.jpg`, `fud-2.jpg`, `fud-3.jpg`
- `assets/images/yellow-jacket-1.jpg`, `yellow-jacket-2.jpg`, `yellow-jacket-3.jpg`
- `assets/images/auto-nest-1.jpg`, `auto-nest-2.jpg`, `auto-nest-3.jpg`

## CV
The Home page has a CV button pointing to:
- `Anna_Burgess_CV.pdf`

Upload that file when your CV is ready.

## MAHI Lab poster
Upload your poster as:
- `assets/docs/MAHI_Lab_Poster.pdf`

## Class project documents
The bridge intentionally has no document links. Upload any documents you want to show using these names:

- Yellow Jacket: `assets/docs/Yellow_Jacket_Paper.pdf`, `assets/docs/Yellow_Jacket_Presentation.pdf`
- Nerf turret: `assets/docs/Nerf_Turret_Paper.pdf`, `assets/docs/Nerf_Turret_Presentation.pdf`
- Egg drop: `assets/docs/Egg_Drop_Paper.pdf`, `assets/docs/Egg_Drop_Presentation.pdf`
- Abaqus unit cell: `assets/docs/Abaqus_Unit_Cell_Paper.pdf`, `assets/docs/Abaqus_Unit_Cell_Presentation.pdf`
- Friction/backlash: `assets/docs/Friction_Backlash_Paper.pdf`, `assets/docs/Friction_Backlash_Presentation.pdf`

You do not have to provide both paper and presentation. If you only have one, either upload only that file and remove the unused link from `assets/script.js`, or leave the unused link until you are ready.

## Hobby photos
Current placeholders:
- `assets/images/running-1.jpg`
- `assets/images/national-parks-1.jpg`
- `assets/images/climbing-1.jpg`
- `assets/images/biking-1.jpg`
- `assets/images/swimming-1.jpg`
- `assets/images/soccer-1.jpg`

## Flex / industry projects
The Industry page contains 13 unique cards. The original request listed “Adjustable Hold-Down Concept” twice, so it appears once. Where your resume did not provide enough project-specific information, the popup intentionally contains editable public-safe placeholders instead of invented details.

## Editing project text
Project descriptions, contributions, image lists, and document links are stored near the top of `assets/script.js` in the `PROJECTS` object. Cards on each page are static HTML, while the popup content is loaded from that object.
