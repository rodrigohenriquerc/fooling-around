import * as Location from "expo-location";

export async function requestForegroundPermissions() {
  try {
    return await Location.requestForegroundPermissionsAsync();
  } catch (error) {
    throw new Error(`Requesting foreground permissions failed: ${error}`);
  }
}
