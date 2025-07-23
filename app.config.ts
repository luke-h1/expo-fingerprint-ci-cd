import { ExpoConfig } from "expo/config";

const bundleIdentifier =
  process.env.EXPO_BUNDLE_IDENTIFIER ?? "com.lhowsam.ota-updates-test";
const androidPackage =
  process.env.EXPO_ANDROID_PACKAGE ?? "com.lhowsam.ota-updates-test";

const VARIANT: Record<
  "testflight" | "production",
  { name: string; slug: string }
> = {
  testflight: {
    name: "OTA updates (testflight)",
    slug: "expo-fingerprint-ci-cd",
  },
  production: {
    name: "OTA updates",
    slug: "expo-fingerprint-ci-cd",
  },
};

const appConfig =
  VARIANT[process.env.APP_VARIANT as "production" | "testflight"] ??
  "testflight";

const config: ExpoConfig = {
  owner: "lukehowsam123",
  name: appConfig.name,
  slug: appConfig.slug,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  extra: {
    APP_VARIANT: process.env.APP_VARIANT,
    eas: {
      projectId: "c8aa8d87-0bb3-467f-a8f1-86f47fc9ebca",
    },
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier,
  },
  runtimeVersion: {
    policy: "fingerprint",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#001A72",
    },
    edgeToEdgeEnabled: true,
    package: androidPackage,
  },
  web: {
    bundler: "metro",
    output: "static",
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
};
export default config;
