# miko-blog

Toy level static blog generator.

> My first web project.

**This repo is still working in process.**

## Features

* Articles in `mdx` format by using `@mdx-js`.
* Support GitHub pages, serve as a single page application.
* Page and route generation for articles.
* Intend to be lightweight.
  * Depdends on `react` + `@mdx-js` + `eslint` + `typescript`.
  * No third-party dependencies for routing, state management, animation and UI.

## Prerequisites

* nodejs (>= 24.10.1)
* pnpm
* eslint

## Usage

For each post, the article file should be named `index.mdx` and paired with a config file `config.json` in a separate folder in `src/contents/`.

Sample document:

```mdx
export function Thing() {
  return <>World</>
}

# Hello <Thing />
```

Sample config:

```json
{
  "title": "Sample page",
  "date": "2026-01-01",
  "tags": [
    "sample",
    "mdx",
    "react"
  ],
  "draft": false
}
```

The contents folder looks like:

```console
./src/contents
├── sample
│   ├── config.json
│   └── index.mdx
└── sample2
    ├── config.json
    └── index.mdx
```

Run codegen to generate pages and routes for all non-draft articles:

```bash
# Install dependencies
pnpm install

# Generate documents pages and routes.
pnpm gen-doc

# Run
pnpm dev

# Lint
pnpm lint

# (Optional) Lint all files, including generated ones.
pnpm lint:all
```

## Unsupported features

* Frontmatter.
