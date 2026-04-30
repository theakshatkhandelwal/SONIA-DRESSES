# Sonia Dresses — mobile shell (Expo)

This app loads your live store in a **WebView** (`https://soniadresses.vercel.app` by default). It is the fastest path to **Google Play** and the **Apple App Store** without rewriting the Next.js site in native code.

For a **fully native** cart, checkout, and offline mode, you would need a separate React Native (or Flutter) build—much larger scope.

## Run locally

```bash
cd mobile
npm install
npm start
```

Press `a` (Android emulator), `i` (iOS simulator on macOS), or scan the QR code with **Expo Go** on a phone.

## Point at another URL

Set when starting:

```bash
npx expo start -- --clear
```

Or create `mobile/.env` (not committed) with:

```
EXPO_PUBLIC_STORE_URL=https://your-domain.com
```

Expo loads `EXPO_PUBLIC_*` at build time; restart the dev server after changing.

## Store assets

Replace `assets/icon.png`, `splash-icon.png`, and `adaptive-icon.png` with **Sonia Dresses** branding (1024×1024 icon for iOS; follow [Expo icons](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)).

Update `app.json`: `name`, `slug`, `ios.bundleIdentifier`, `android.package` must be **unique** to your developer accounts (change `com.soniadresses.app` if the ID is taken).

## Build installable apps (EAS)

1. Create a free [Expo](https://expo.dev) account.
2. Install EAS CLI: `npm i -g eas-cli`
3. From `mobile/`:

   ```bash
   eas login
   eas build:configure
   eas build --platform android
   eas build --platform ios
   ```

4. **iOS** requires an **Apple Developer** account ($99/year) and certificates; EAS can manage them if you follow the prompts.
5. **Android** needs a [Google Play Console](https://play.google.com/console) one-time fee and an upload key; EAS outputs an **AAB** for Play.

## Submit to stores

- **Play:** `eas submit --platform android` (after `eas build`), or upload the AAB manually in Play Console.
- **App Store:** `eas submit --platform ios`, or upload the IPA via Transporter.

You must provide privacy policy URL, support email, and store listing text/screenshots per Google and Apple rules.

## Notes

- Payments, cookies, and file uploads behave like the **website inside the WebView** (including admin login if users navigate there—consider hiding `/admin` on web for app-only builds, or use a separate hostname).
- Deep links / universal links can be added later with `expo-linking` if you need `soniadresses://` routes.
