# Document Scanner

React Native + Expo SDK 54 mobile app for scanning documents with native edge detection (ML Kit on Android, VisionKit on iOS), local history, and PDF export.

## Features

- **Dashboard** — scan documents, view total/weekly stats, recent scans
- **History** — searchable list, long-press to delete
- **Document detail** — page viewer, rename, add pages, export PDF, share image, delete

## Requirements

- Node.js 18+
- [Expo development environment](https://docs.expo.dev/get-started/set-up-your-environment/)
- Physical device or emulator (native scanner does **not** run in Expo Go)

## Setup

```bash
npm install
npx expo prebuild
```

## Run (development build)

Start Metro for the dev client:

```bash
npm start
```

Build and run on a device/emulator:

```bash
# Android
npm run android

# iOS (macOS only)
npm run ios
```

Or use [EAS Build](https://docs.expo.dev/build/introduction/) for a development client on hardware without local native toolchains.

## Project structure

| Path | Purpose |
|------|---------|
| `app/(tabs)/index.tsx` | Dashboard |
| `app/(tabs)/history.tsx` | History |
| `app/document/[id].tsx` | Scan detail |
| `lib/scanner.ts` | Native document scanner wrapper |
| `lib/scanRepository.ts` | SQLite + filesystem persistence |
| `lib/pdfService.ts` | PDF generation |
| `lib/shareService.ts` | System share sheet |

## Data storage

- Metadata: SQLite (`documentscanner.db`)
- Images: `{documentDirectory}/scans/{scanId}/page-N.jpg`

## Verification checklist

1. Tap **Scan document** on Dashboard and complete a scan.
2. Confirm the scan appears under **Recent scans** and **History**.
3. Open the scan, swipe through pages, rename it.
4. Tap **Add pages** and append another scan.
5. Tap **Export PDF** and share via the system sheet.
6. Long-press a scan in History and delete it.

## Notes

- Camera permission is configured via `react-native-document-scanner-plugin` in `app.json`.
- After adding native dependencies, run `npx expo prebuild` again before rebuilding.
