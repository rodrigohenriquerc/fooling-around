import { selectCurrentSession } from "@/infra/database/repositories";
import { startTrackingLocation } from "@/infra/services/location";

export async function resumeSession() {
  try {
    await startTrackingLocation();

    const currentSession = await selectCurrentSession();

    if (!currentSession) throw "There is no ongoing session to pause";

    await currentSession.pause();
  } catch (error) {
    throw new Error("Failed to resume session", { cause: error });
  }
}
