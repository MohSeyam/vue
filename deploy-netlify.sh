#!/bin/bash
# سكريبت نشر تلقائي لموقع Vite على Netlify
set -e

# بناء المشروع
npm run build

# التأكد من وجود ملف _redirects في dist
cp public/_redirects dist/_redirects

# نشر باستخدام Netlify CLI (يجب أن تكون سجلت دخول netlify login)
netlify deploy --prod --dir=dist