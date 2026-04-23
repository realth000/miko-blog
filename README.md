# miko-blog

Toy level static blog generator.

> My first web project.

**This repo is still working in process.**

## Features

- Articles in `mdx` format by using `@mdx-js`.
- Support GitHub pages, serve as a single page application.
- Page and route generation for articles.
- Intend to be lightweight.
  - Depdends on `react` + `@mdx-js` + `eslint` + `typescript`.
  - No third-party dependencies for routing, state management, animation and UI components.

## Prerequisites

- nodejs (>= 24.10.1)
- pnpm
- (optional) vscode eslint plugin.

## Usage

Follow these steps to use miko-blog:

1. Configure the blog info in `src/values/config-values.ts`.
   - See [src/values/config-values.example.ts](./src/values/config-values.example.ts) for example.
2. Prepare blog articles. Each article should be named `index.mdx` in a subdir in `src/contents`, together with a json config file in the same directory.
   - Directory structure for a article.

     ```console
     src/contents
     └── sample
         ├── config.json
         └── index.mdx
     ```

   - Example `config.json`:

     ```json
     {
       "title": "Sample",
       "summary": "Sample document",
       "date": "2026-01-01",
       "tags": ["mdx", "sample blog"],
       "draft": false
     }
     ```

   - The directory name can be anything not only the article name, e.g. name the folder `001-sample` for sorted order.
3. Run `pnpm gen-doc` to run code generation.
4. Run `pnpm dev` to build and serve your blog.

## Development

```bash
# Install dependencies
pnpm install

# Generate documents pages and routes.
pnpm gen-doc

# Run
pnpm dev

# Lint
pnpm lint
```

## Unsupported features

- Frontmatter.
