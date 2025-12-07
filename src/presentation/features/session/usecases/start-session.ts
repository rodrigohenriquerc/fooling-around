import {
  createSession,
  selectCurrentSession,
} from "@/infra/database/repositories";
import { SessionModel } from "@/infra/database/tables/sessions";
import {
  startTrackingLocation,
  stopTrackingLocation,
} from "@/infra/services/location";

export async function startSession() {
  let newSession: SessionModel | undefined;

  try {
    const currentSession = await selectCurrentSession();

    if (currentSession) {
      throw new Error("Not allowed while another session is ongoing");
    }

    newSession = await createSession();

    await startTrackingLocation();

    return newSession;
  } catch (error) {
    await rollback(newSession);
    throw new Error("Failed to start session", { cause: error });
  }
}

async function rollback(session?: SessionModel) {
  try {
    await session?.remove();
    await stopTrackingLocation();
  } catch (error) {
    throw new Error("Failed to rollback session", { cause: error });
  }
}
