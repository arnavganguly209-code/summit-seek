#!/usr/bin/env bash
set -euo pipefail

cd /var/www/summit-seek

echo "BEFORE:$(git rev-parse --short HEAD)"
git fetch origin
git reset --hard origin/main
echo "AFTER:$(git rev-parse --short HEAD)"

mkdir -p storage/media/library storage/media/.uploads data public/media/hero public/media/library

if [ ! -f .env.local ] || ! grep -q '^ORBIT_PASSKEY=' .env.local 2>/dev/null; then
  echo 'ORBIT_PASSKEY=713304977' >> .env.local
fi

if [ ! -f .env ] || ! grep -q '^DATABASE_URL=' .env 2>/dev/null; then
  echo "ERROR: DATABASE_URL missing in /var/www/summit-seek/.env"
  exit 1
fi

npm install --no-audit --no-fund
npx prisma generate
rm -rf .next
npm run build
pm2 restart summit-seek --update-env
pm2 save

echo "DEPLOY_OK:$(git rev-parse --short HEAD)"
