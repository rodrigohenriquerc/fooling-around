import { selectCurrentSession } from "@/infra/database/repositories";
import { SessionModel } from "@/infra/database/tables/sessions";
import { isTrackingLocation } from "@/infra/services/location";
import { SessionState } from "@/types/session.types";

export async function getSessionState(): Promise<{
  session: SessionModel | null;
  state: SessionState;
}> {
  try {
    const currentSession = await selectCurrentSession();

    if (!currentSession) return { session: null, state: "idle" };

    if (await isTrackingLocation()) {
      return { session: currentSession, state: "ongoing" };
    }

    return { session: currentSession, state: "paused" };
  } catch (error) {
    throw new Error("Failed to get session state", { cause: error });
  }
}
