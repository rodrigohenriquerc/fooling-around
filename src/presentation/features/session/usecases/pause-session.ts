import { selectCurrentSession } from "@/infra/database/repositories";
import { stopTrackingLocation } from "@/infra/services/location";

export async function pauseSession() {
  try {
    await stopTrackingLocation();

    const currentSession = await selectCurrentSession();

    if (!currentSession) throw "There is no ongoing session to pause";

    await currentSession.pause();
  } catch (error) {
    throw new Error("Failed to pause session", { cause: error });
  }
}
