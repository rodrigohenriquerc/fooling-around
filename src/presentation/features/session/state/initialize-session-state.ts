import { selectCurrentSession } from "@/infra/database/repositories";
import { SessionModel } from "@/infra/database/tables/sessions";
import { SessionState } from "@/presentation/features/session/session.types";

export async function initializeSessionState(): Promise<{
  model: SessionModel | null;
  state: SessionState;
}> {
  try {
    const session = await selectCurrentSession();

    if (!session) return { model: null, state: "idle" };

    if (session.isActive) {
      return { model: session, state: "ongoing" };
    }

    if (session.isPaused) {
      return { model: session, state: "paused" };
    }

    return { model: null, state: "idle" };
  } catch (error) {
    throw new Error("Failed to get session state", { cause: error });
  }
}
