import { selectCurrentSession } from "@/infra/database/repositories";
import { stopTrackingLocation } from "@/infra/services/location";

export async function finishSession() {
  try {
    await stopTrackingLocation();

    const currentSession = await selectCurrentSession();

    if (!currentSession) {
      throw "There is no unfinished session";
    }

    await currentSession.finish();
  } catch (error) {
    throw new Error("Failed to finish session", { cause: error });
  }
}
