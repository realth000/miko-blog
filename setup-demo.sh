#!/bin/bash

# Setup demo pages.
# This script is used for deploying demo pages on GitHub Pages.

set -ex

LOGO_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1c6586" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>'
LOOG_DARK_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8fcef3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>'

BLOG_DIR="."
DOC_DIR="${BLOG_DIR}/src/contents"
VALUES_DIR="${BLOG_DIR}/src/values"

echo -n "${LOGO_SVG}" > public/logo.svg
echo -n "${LOOG_DARK_SVG}" > public/logo-dark.svg

cp "${VALUES_DIR}/about.example.mdx" "${VALUES_DIR}/about.mdx"
cp "${VALUES_DIR}/config-value.example.ts" "${VALUES_DIR}/config-value.ts"
cp "${VALUES_DIR}/whispers.example.mdx" "${VALUES_DIR}/whispers.mdx"

mkdir "${DOC_DIR}/000-sample"
cp -r "${VALUES_DIR}/about.example.mdx" "${DOC_DIR}/000-sample/index.mdx"
cat << EOF > "${DOC_DIR}/000-sample/config.json"
{
  "title": "Sample article",
  "date": "$(date +%Y-%m-%d)",
  "tags": ["sample", "testing"],
  "draft": false,
  "summary": "Document showcase"
}
EOF

pushd "${BLOG_DIR}"

pnpm install

pnpm gen-doc

pnpm build

popd
