# MH4U Database — Mobile

> The mobile client for the **Monster Hunter 4 Ultimate** database. Browse
> monsters, weapons, armor, items and quests, with search — all served from the
> [mh4u-api](https://github.com/Snitzle/mh4u-api).

![Expo](https://img.shields.io/badge/Expo-56-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.85-61DAFB?logo=react&logoColor=black)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

Built with Expo 56 (expo-router, file-based routing), React Native 0.85 and
TanStack Query.

## Prerequisites

- **Node.js 20+** and npm.
- **The API running** at `http://localhost:8088`. Follow the setup in
  [mh4u-api](https://github.com/Snitzle/mh4u-api) first — the quickest path is
  `docker compose up --build` in that repo.
- For the **iOS simulator**: Xcode (with an installed simulator runtime).
- For **Android**: Android Studio with an emulator, or the Expo Go app.

## Getting started

```bash
# 1. Make sure the API is up (see mh4u-api), then:
npm install

# 2. (Optional) copy the env template. The default targets http://localhost:8088,
#    which the iOS simulator can reach directly — only needed for a real device.
cp .env.example .env.local

# 3. Start the app
npx expo start --ios     # or: npm run ios
```

In the Expo CLI output you can also open the app in an Android emulator
(`npm run android`), the web build (`npm run web`), or [Expo Go](https://expo.dev/go)
by scanning the QR code.

## Connecting to the API

The base URL is read from `EXPO_PUBLIC_API_BASE` (default
`http://localhost:8088/api/v1`):

| Target | Value |
| --- | --- |
| iOS simulator | `http://localhost:8088/api/v1` (the default — shares the host's localhost) |
| Android emulator | `http://10.0.2.2:8088/api/v1` (the emulator's alias for the host) |
| Physical device (Expo Go) | `http://<your-machine-LAN-IP>:8088/api/v1`, e.g. `http://192.168.1.50:8088/api/v1` |

Set it per-machine in `.env.local` (gitignored):

```dotenv
EXPO_PUBLIC_API_BASE=http://192.168.1.50:8088/api/v1
```

## Scripts

```bash
npm run ios       # start + open iOS simulator
npm run android   # start + open Android emulator
npm run web       # start the web build
npm run lint      # expo lint
npm start         # start the Metro bundler (choose a target interactively)
```

## Project structure

```
src/
  app/            # expo-router screens: (tabs)/ + monsters|weapons|armor|items|quests/[id]
  components/     # Shared UI (EntityList, Detail, StatTable, FilterChipRow, pickers, …)
  lib/
    api.ts        # API client
    types.ts      # Shared types
    filters.ts    # List filter definitions
    theme.ts      # Colors / styling tokens
```

## Attribution & license

The application source code is released under the [MIT License](LICENSE).

*Monster Hunter 4 Ultimate*, all related names, assets and imagery are
trademarks of **© CAPCOM CO., LTD.** This is an unofficial, non-commercial fan
project and is not affiliated with or endorsed by Capcom. Game data lineage and
attribution are documented in the [mh4u-api](https://github.com/Snitzle/mh4u-api)
repository.
