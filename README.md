# Shrinath's Kitchen Bill Maker

A mobile-friendly, static bill maker. It runs in the browser and stores saved bills
in that browser's local storage.

## Run locally
Open `index.html` in a browser.

## Deploy to Vercel
1. Create a GitHub repository and upload `index.html`, `vercel.json`, and `README.md`.
2. In Vercel, choose **Add New → Project** and import that GitHub repository.
3. Keep the Framework Preset as **Other**.
4. Leave Build Command and Output Directory empty/default. No build step is required.
5. Click **Deploy**.

You can also deploy the folder using the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Important data note
Saved bills use browser local storage. They stay in the same browser/device and are
not shared across devices or users. Use **Export saved bills** regularly for backups.
