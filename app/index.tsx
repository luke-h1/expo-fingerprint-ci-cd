import { useOTAUpdates } from "@/hooks/useOTAUpdates";
import * as Application from "expo-application";
import {
  checkForUpdateAsync,
  fetchUpdateAsync,
  useUpdates,
} from "expo-updates";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { lastChecked } = useOTAUpdates();
  const { isUpdatePending } = useUpdates();

  const checkForUpdates = async () => {
    try {
      console.debug("Checking for update...");
      const res = await checkForUpdateAsync();

      if (res.isAvailable) {
        console.debug("Attempting to fetch update...");
        await fetchUpdateAsync();
      } else {
        console.debug("No update available.");
      }
    } catch (e) {
      console.error("OTA Update Error", { error: `${e}` });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>
        Native Application version:{" "}
        {Application.nativeApplicationVersion ?? "UNKNOWN"}
      </Text>
      <Text>
        Native Build version: {Application.nativeBuildVersion || "UNKNOWN"}
      </Text>
      <Text>Update pending: {String(isUpdatePending)}</Text>
      <Text>App variant: {process.env.APP_VARIANT || "unknown"}</Text>
      <Text>Dev mode: {String(__DEV__)}</Text>
      <Text>
        Last update check: {lastChecked ? lastChecked.toISOString() : "Never"}
      </Text>
      <Button title="Check for Updates" onPress={checkForUpdates} />
    </View>
  );
}
