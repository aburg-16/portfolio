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
