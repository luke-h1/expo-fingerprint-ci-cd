import { ExpoConfig } from "expo/config";

const bundleIdentifier =
  process.env.EXPO_BUNDLE_IDENTIFIER ?? "com.lhowsam.ota-updates";
const androidPackage =
  process.env.EXPO_ANDROID_PACKAGE ?? "com.lhowsam.ota-updates";

const VARIANT: Record<
  "testflight" | "production",
  { name: string; slug: string }
> = {
  testflight: {
    name: "OTA updates (testflight)",
    slug: "ota-updates-test-flight",
  },
  production: {
    name: "OTA updates",
    slug: "ota-updates-lho-prod",
  },
};

const appConfig =
  VARIANT[process.env.APP_VARIANT as "production" | "testflight"];

const config: ExpoConfig = {
  name: appConfig.name,
  slug: appConfig.slug,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  extra: {
    APP_VARIANT: process.env.APP_VARIANT,
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
