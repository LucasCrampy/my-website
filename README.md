# Personal portfolio site

- **Stack**: React 19, Vite 7, Tailwind CSS 4, lucide-react
- **Run**: `npm run dev` | **Build**: `npm run build` | **Preview**: `npm run preview`

## Structure

- `src/App.jsx` — Main layout, hero parallax, modals, lightbox, sections
- `src/components/` — `ProjectCard.jsx`, `ProjectModalContent.jsx`
- `src/data/siteContent.js` — All copy and project data (edit here to change content)
- `src/index.css` — Tailwind + custom scrollbar, reveal animation, hero arch pattern
- `public/` — Static assets (images, PDFs, GIFs). Refer in code by filename only (e.g. `"profile-lucas.jpg"`)

## Using `siteContent.js`

**Exports**: `siteContent` (hero, contact, bio, education, experience) and `projectContent` (project categories and items).

- **Hero**: `name`, `major`, `tagline`, `profileImage` (filename in `public/`)
- **Contact**: `tagline`, `email`
- **Bio**: `title`, `image`, `text`, `linkedin`, `github`, sister block (`sisterText`, `sisterImage`, `sisterLinkedin`, `sisterGithub`)
- **Education**: `transfer`, `olympic`, `highschool` — each has `date`, `school`, `badge`, `badgeClass`, `bgClass`, `description`; `olympic` also has `mathCourses` (array of `{ name, status }`) and `otherCourses` (array of strings)
- **Experience**: array of `{ role, year }`

**Project categories** (math, computers, photography, science, futureProjects) each have: `id`, `icon` (calculator | code | camera | leaf | lightbulb), `title`, `color`, `headerTitle`, `headerSubtitle`, and either `projects` or `images`.

**Project shapes** (add objects to a category’s `projects` array):

- **PDF**: `{ title, pdfLink, description }` — modal shows PDF + download
- **Link**: `{ title, image, link, description }` — modal shows image + GitHub/external link
- **Image + text**: `{ title, image?, paragraphs, status? }` — modal shows image + HTML paragraphs; `paragraphs` can use `<strong>` etc.

**Photography**: `images` is built from a length (e.g. 37 for WEBIMG1–37). To add photos, increase the length in the `Array.from({ length: 37 }, ...)` call and add `WEBIMG38.jpg`, etc. to `public/`.

**Assets**: Put images and PDFs in `public/`. Reference by filename only (e.g. `profileImage: "hero-wave-transparent.gif"`).
