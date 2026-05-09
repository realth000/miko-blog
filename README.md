# miko-blog

Toy level static blog generator.

> My first web project.

**This repo is still working in process.**

## Features

- Articles in `mdx` format.
- Support GitHub pages, serve as a single page application.
- Page and route generation.
- Lightweight.
  - Depdends on `react` + `@mdx-js` + `eslint` + `typescript` + `tailwindcss`.
  - No third-party dependencies for routing, state management, animation and UI components.

## Prerequisites

- nodejs (>= 25.6.2)
- pnpm
- (For develop) vscode eslint plugin.
  - Plugin id: `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode`.

## Usage

1. Setup the website info in `src/values/config-values.ts`.
   - See [src/values/config-value.example.ts](./src/values/config-value.example.ts).
2. Prepare blog articles. Each article should be named `index.mdx` in a subdir in `src/contents`, together with a `config.json` file.
   - Directory structure for a article.

     ```console
     src/contents
     └── sample
         ├── config.json
         └── index.mdx
     ```

   - e.g. `config.json`:

     ```json
     {
       "title": "Sample",
       "summary": "Sample document",
       "date": "2026-01-01",
       "tags": ["mdx", "sample blog"],
       "draft": false
     }
     ```

   - The directory name is not required to be the same as article title.
3. Preapre `about.mdx` and `whispers.mdx` in `./src/values/` for additional pages.
   - No document format requirements in these documents.
4. Prepare website favicon in `assets/logo.png` and `assets/logo.svg`
5. Run `pnpm gen-doc` to generate code.
   - Rerun `pnpm gen-doc` every time the articles changed.
6. Run `pnpm dev` to serve.
7. Run `pnpm build` to package all files in `./src/dist` folder.

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

# Packaging, artifacts in ./src/dist directory.
pnpm build
```

## Unsupported features

- Frontmatter.
