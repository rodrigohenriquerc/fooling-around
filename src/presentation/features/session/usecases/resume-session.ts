import { startTrackingLocation } from "@/infra/services/location";

export async function resumeSession() {
  try {
    await startTrackingLocation();
  } catch (error) {
    throw new Error("Failed to resume session", { cause: error });
  }
}
