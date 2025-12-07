import { selectCurrentSession } from "@/infra/database/repositories";
import { isTrackingLocation } from "@/infra/services/location";

export async function getSessionState() {
  try {
    const currentSession = await selectCurrentSession();

    if (!currentSession) return "idle";

    if (await isTrackingLocation()) return "ongoing";

    return "paused";
  } catch (error) {
    throw new Error("Failed to get session state", { cause: error });
  }
}
