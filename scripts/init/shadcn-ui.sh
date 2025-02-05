#!/bin/bash

echo "
=====================================
Nexidus: Installing Tailwind
-------------------------------------
"

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
