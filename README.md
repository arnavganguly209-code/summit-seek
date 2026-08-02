# Summit Seek

Premium Himalayan trekking website built with Next.js, plus **Orbit CMS** for editing the homepage hero and media.

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set ORBIT_PASSKEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Orbit CMS login: [http://localhost:3000/orbit](http://localhost:3000/orbit)

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `ORBIT_PASSKEY` | Yes (for Orbit) | Secret passkey for Orbit CMS login. Never commit the real value. |

Create a local file from the example:

```bash
cp .env.example .env.local
```

Example `.env.local`:

```env
ORBIT_PASSKEY=your_passkey_here
```

Set the same variable on your host (VPS / Netlify / CI) for production. The passkey is read only on the server and is never sent to the browser.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
