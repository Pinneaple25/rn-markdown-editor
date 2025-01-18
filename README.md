# Run app

1. Install the dependencies:

```bash
npm install
```

2. Start the app:
```bash
npm start
```

# Generate builds
For remote builds, be sure to have installed [EAS CLI](https://docs.expo.dev/build/setup/#install-the-latest-eas-cli) and be [loged](https://docs.expo.dev/build/setup/#log-in-to-your-expo-account).

## Generate remote production builds
```bash
npm run build ios
```
```bash
npm run build android
```

## Generate local builds
For **IOS**:\
Follow the steps in the [oficial documentation](https://docs.expo.dev/guides/local-app-production/#ios).

For **Android**:
1. Generate the `./android` directory:
```bash
npx expo prebuild
```
2. Follow the steps in the [oficial documentation](https://docs.expo.dev/guides/local-app-production/).
3. Run the command:
```bash
npm run local
```

## Generate a remote APK
```bash
npm run preview
```
