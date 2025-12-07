import { selectCurrentSession } from "@/infra/database/repositories";
import { startTrackingLocation } from "@/infra/services/location";

export async function resumeSession() {
  try {
    await startTrackingLocation();

    const currentSession = await selectCurrentSession();

    if (!currentSession) {
      throw new Error("There is no stopped session to resume");
    }

    await currentSession.resume();
  } catch (error) {
    throw new Error("Failed to resume session", { cause: error });
  }
}
