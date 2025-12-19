# Adam's Portfolio & Blog

A minimal, fast portfolio website with blog built using Gatsby.js. Features a clean monospace design with dark/light theme support.

## Features

- 📝 Blog with Markdown support
- 🌓 Dark/Light theme toggle with localStorage persistence
- ⚡ Fast static site generation with Gatsby
- 🎨 Minimal, text-first design with monospace fonts
- 📱 Responsive and accessible
- 🚀 Automated deployment to GitHub Pages

## Project Structure

```
.
├── content/
│   └── blog/              # Blog posts in Markdown
├── src/
│   ├── components/        # React components
│   │   ├── Layout.js      # Main layout wrapper
│   │   ├── Header.js      # Site header
│   │   ├── Footer.js      # Site footer
│   │   └── ThemeToggle.js # Theme switcher
│   ├── pages/             # Gatsby pages
│   │   ├── index.js       # Homepage
│   │   └── blog.js        # Blog listing page
│   ├── styles/            # Global styles
│   │   └── global.css     # CSS with theme variables
│   └── templates/         # Page templates
│       └── blog-post.js   # Blog post template
├── gatsby-config.js       # Gatsby configuration
├── gatsby-node.js         # Dynamic page creation
└── package.json           # Dependencies and scripts
```

## Setup

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run develop
```

The site will be available at `http://localhost:8000`

## Available Scripts

- `npm run develop` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build locally. Build first!!!
- `npm run clean` - Clean Gatsby cache
- `npm run deploy` - Build and deploy to GitHub Pages (manual). After pushing to the repo, the page should be published automatically.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The site automatically deploys to GitHub Pages when you push to the `master` branch using GitHub Actions.

**Setup:**

1. Ensure GitHub Pages is enabled in your repository settings
2. Set the source to the `gh-pages` branch
3. Push to `master` branch - the workflow will automatically build and deploy

### Manual Deployment

You can also deploy manually:

```bash
npm run deploy
```

This builds the site and pushes it to the `gh-pages` branch.

## Adding Blog Posts

Create a new Markdown file in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
slug: "your-post-slug"
---

Your content here...
```

The post will automatically appear on the blog page and be accessible at `/blog/your-post-slug`.

## Customization

### Update Personal Information

Edit the following files:
- [src/pages/index.js](src/pages/index.js) - Update work experience and projects
- [gatsby-config.js](gatsby-config.js) - Update site metadata
- [src/components/Footer.js](src/components/Footer.js) - Update footer text

### Modify Styles

All styles are in [src/styles/global.css](src/styles/global.css). CSS variables are used for theming:

```css
:root {
  --bg: #fafafa;
  --fg: #141618;
  --link: #0b64d6;
  /* ... */
}
```

### Change Color Scheme

Update the CSS variables in [src/styles/global.css](src/styles/global.css) for both light and dark modes.

## Original Design

The original static HTML page has been preserved as [_old_index.html](_old_index.html).

## License

MIT
