# Anna Burgess Portfolio

This version uses a project-based media hierarchy so images and documents can be uploaded to GitHub in small folders instead of replacing one very large `assets` directory.

## Repository layout

```text
index.html
club-projects.html
research-projects.html
class-projects.html
industry-projects.html
personal-projects.html
hobbies.html
content.json
style.css
script.js
Anna_Burgess_Resume.pdf

assets/
  images/
    clubs/
      HURC/
        URC-Rover/
      HUAC-R/
        Forward-Unto-Dawn/
        RocketLink/
        Mojave-Sphinx/
        IREC-10K-COTS/
        L1-Certification/
        Phase-1-Liquid-Rocket/
    research/
      MAHI-Lab/
      Ability-Lab/
    class/
      Yellow-Jacket/
      Nerf-Turret/
      I-Beam-Bridge/
      Egg-Drop/
      Abaqus-Unit-Cell/
      Friction-Backlash-Controller/
      StockSmart/
      Square-Pendulum/
      Heat-Transfer-Ferns/
      Senior-Thesis-Capstone/
      Engineering-Music/
    industry/
      Flex/
        <one folder per Flex project>/
    personal/
      CNC-Plasma-Cutter/
      Vehicle-Restoration/
      Textiles/
    hobbies/
      running/
      hiking-travel/
      rock-climbing/
      biking/
      swimming/
      soccer/

  docs/
    clubs/
      HURC/...
      HUAC-R/...
    research/
      MAHI-Lab/
      Ability-Lab/
    class/
      <same project folders as images>/
    industry/
      Flex/<same project folders>/
    personal/
      <same project folders>/
    hobbies/
      <same hobby folders>/
```

## Adding media

Add a photo only to the folder for that project, then add its exact path to that project's `images` array in `content.json`.

The first path in a project's `images` array is the project-card cover image. The rest become the full-screen gallery.

Example:

```json
"images": [
  "assets/images/class/Yellow-Jacket/cover.jpg",
  "assets/images/class/Yellow-Jacket/cad.jpg",
  "assets/images/class/Yellow-Jacket/testing.jpg"
]
```

Documents work the same way through the project's `attachments` array.

```json
"attachments": [
  ["Project Paper", "assets/docs/class/Yellow-Jacket/Yellow_Jacket_Paper.pdf"],
  ["Presentation", "assets/docs/class/Yellow-Jacket/Yellow_Jacket_Presentation.pdf"]
]
```

Empty folders contain `.gitkeep` files so GitHub will preserve the folder structure before you add media.


## Project deep-dive tabs

Every project can now have its own detailed tabs inside the full-screen project viewer. The existing **Overview** tab automatically shows Description, My Contribution, Outcome, Technical Toolkit, and Project Documents.

Edit the `deepDive` array for any project in `content.json` to add, remove, rename, or reorder detailed tabs. Example:

```json
"deepDive": [
  {
    "label": "Prototyping",
    "content": "Write your detailed prototyping story here."
  },
  {
    "label": "CAD Development",
    "content": "Write your CAD-development details here."
  }
]
```

You can use blank lines inside `content` to create multiple paragraphs. Each project can use completely different tab names. Yellow Jacket is preconfigured with: Prototyping, CAD Development, Manufacturing Process, Testing, and Design Problems & Resolutions.


## Image captions
Project image entries now use objects with `src` and `caption` fields. The first image is still the project-card cover and its caption is intentionally not shown. Every image after the cover can have an optional caption.

Example:
```json
"images": [
  {
    "src": "assets/images/class/Yellow-Jacket/cover.png",
    "caption": ""
  },
  {
    "src": "assets/images/class/Yellow-Jacket/prototype.png",
    "caption": "Early prototype used to validate the tennis-ball collection mechanism."
  }
]
```
Leave `caption` blank if you do not want text under a gallery image.


## Linking deep-dive sections to gallery images
Each `deepDive` item now supports two optional fields:

```json
{
  "label": "Testing Results",
  "content": "...",
  "galleryStart": 7,
  "galleryImages": [7, 8, 9]
}
```

- `galleryStart`: zero-based image index to jump to when that section becomes active.
- `galleryImages`: optional list of zero-based related image indices. If present, the first valid index is used as the section's starting image.
- The first project image is index `0`, the second is `1`, etc.
- Desktop: scrolling into a deep-dive section automatically changes the gallery image.
- Mobile: normal scrolling does not move the gallery; tapping a contents link changes the gallery.
- Overview returns the gallery to image `0` when tapped.
