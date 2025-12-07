import { stopTrackingLocation } from "@/infra/services/location";

export async function pauseSession() {
  try {
    await stopTrackingLocation();
  } catch (error) {
    throw new Error("Failed to pause session", { cause: error });
  }
}
