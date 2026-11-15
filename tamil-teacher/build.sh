#!/bin/sh
# Builds index.html (for GitHub Pages / opening on a computer) from the parts.
cd "$(dirname "$0")"
{
  echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  cat head.html
  echo '<link rel="stylesheet" href="styles.css"></head><body>'
  cat body.html
  echo '<script src="translit.js"></script><script src="data.js"></script><script src="app.js"></script></body></html>'
} > index.html
# Single self-contained file (no other files needed), handy to share or open offline.
{
  echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  cat head.html; echo '<style>'; cat styles.css; echo '</style></head><body>'
  cat body.html
  echo '<script>'; cat translit.js data.js app.js; echo '</script></body></html>'
} > tamil-class-single-file.html
