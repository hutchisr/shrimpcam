# Shrimpcam!

This is a rewrite of [shrimpcam](https://github.com/hutchisr/shrimpcam) using SvelteKit and Tailwind CSS.

## Development

Install dependencies with `npm install` and start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Production Install

To create a production version of shrimpcam:

```bash
npm run build
```

then run this to start:

```bash
node build
```
You can use a reverse proxy with Caddy or something after to host the production site on the web! 
