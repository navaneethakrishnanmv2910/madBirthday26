# For Madhumitha — twenty-one, with love

A personal birthday website for Madhumitha: four years together, twelve real photos, and eight interactive chapters. Built locally in this project with React, TypeScript, Vite, Tailwind CSS, Motion, Radix Dialog, Lucide, and canvas-confetti.

## Run it

Requires Node.js 22.12+ (Node 22 is already installed on this machine).

```bash
nvm use
npm install
npm run dev
```

Open the Local URL printed by Vite, normally **http://localhost:5173**. Dependencies are already installed; `npm install` is only needed on a fresh checkout. If `nvm` is not loaded in your terminal, run `source ~/.nvm/nvm.sh` first.

The dev server also prints a Network URL. Open that address on a phone connected to the same Wi-Fi to preview the mobile version; your firewall must permit the connection.

```bash
npm run build       # Type-check and produce dist/
npm run preview     # Serve the production build locally
npm run test:e2e    # Desktop and mobile browser interaction tests
```

Browser tests use the local Google Chrome installation when available. Elsewhere, install a test browser using `npx playwright install chromium`, or set `CHROME_PATH` to your Chrome executable.

## The journey

1. **Hi, Pondatii.** A scrapbook cover with two personal photographs.
2. **Your special day.** Three scroll-revealed birthday cards in Tanglish and English.
3. **Our little album.** All 12 supplied photos, swipe navigation, an accessible lightbox, and a note for each image.
4. **Four years of us.** A three-part conversation with different replies for her choices.
5. **21 little things.** Twenty-one numbered notes; opened notes are remembered locally.
6. **A little detour.** A shuffled six-pair photo memory game, with a hint and replay.
7. **Dear Madhumitha.** A wax-sealed envelope opens a full letter she can download.
8. **Make a wish.** Hold to blow out the candles, or use the single-tap alternative. Confetti, a birthday message, a private wish, and a downloadable photo card finish the experience.

The complete reading and interaction path is designed for roughly **5–8 minutes**, longer if she explores every photo and plays the game slowly. This is an estimate, not a five-minute lock: the chapter menu and ordinary scrolling always work. She can revisit every part.

Music is an original, synthesized music-box pattern, off until she chooses to enable it. It pauses when the page is hidden. Fonts are bundled locally. The page respects reduced-motion preferences and supports keyboard navigation, focus-trapped dialogs, touch, and screens down to 320px.

## Make the words your own

- `src/content.ts`: photo captions, all 21 notes, conversation choices and replies, and the birthday letter.
- `src/components/Opening.tsx`: greeting and birthday-reveal cards.
- `src/components/Finale.tsx`: birthday finale and downloadable keepsake artwork.
- `src/styles.css`: colors, typography, responsive layouts, and custom CSS effects.
- `Images/`: your untouched originals.
- `public/photos/`: optimized WebP versions of all 12 images, approximately 1.1 MB combined. The numbered files follow the sorted original filenames.

No anniversary date, birthday date, or photo chronology has been invented. The page uses the supplied age and relationship length. Change the wording whenever you have a more specific memory you would like to add.

## Local storage and hosting

This project has **not been published**. It has no backend, analytics, tracking, or external API calls. Opened notes and the optional birthday wish are kept only in that browser's local storage, under `madhu-birthday:` keys. The wish can be edited or deleted in the finale. Storage can be cleared by the browser; if storage is unavailable, the page still works for that visit.

`dist/` can be served by any static host when you choose to share it. The `noindex` meta tag asks search engines not to index it; it is not a password or an access-control system.

## References consulted

- [Loveletter.digital](https://loveletter.digital/) — interactive letter and photo-album reference. The layout, copy, and illustrations here were made for this project.
- [Motion scroll animations](https://motion.dev/docs/react-scroll-animations) and [accessibility](https://motion.dev/docs/react-accessibility) — viewport reveals and reduced-motion behavior.
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite) — the Vite plugin setup.
