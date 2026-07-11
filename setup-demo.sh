#!/bin/bash

set -ex

LOOG_DARK_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8fcef3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>'
LOGO_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1c6586" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-world"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>'

BLOG_DIR="."
DOC_DIR="${BLOG_DIR}/src/contents"

echo "${LOGO_SVG}" > public/logo.svg
echo "${LOOG_DARK_SVG}" > public/logo-dark.svg

cp assets/logo.png "${BLOG_DIR}/src/assets/logo.png"
cp about.mdx "${BLOG_DIR}/src/values/about.mdx"
cp whispers.mdx "${BLOG_DIR}/src/values/whispers.mdx"
cp config-value.ts "${BLOG_DIR}/src/values/config-value.ts"
[ ! -d "${DOC_DIR}" ] && mkdir "${DOC_DIR}"
cp -r blogs/* "${DOC_DIR}"

pushd "${BLOG_DIR}"

pnpm install

pnpm gen-doc

pnpm build

popd
