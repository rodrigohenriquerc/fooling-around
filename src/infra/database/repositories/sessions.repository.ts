import { Q } from "@nozbe/watermelondb";

import database from "@/infra/database";
import { SessionModel } from "@/infra/database/tables/sessions";

const SessionsCollection = database.get<SessionModel>("sessions");

export async function createSession() {
  try {
    return await database.write(async () => {
      return await SessionsCollection.create((session) => {
        session.state = "active";
      });
    });
  } catch (error) {
    throw new Error("Failed to create session", { cause: error });
  }
}

export async function selectCurrentSession() {
  try {
    return await database.read(async () => {
      const selected = await SessionsCollection.query(
        Q.where("state", Q.oneOf(["active", "paused"])),
        Q.take(1),
      ).fetch();

      return selected[0];
    });
  } catch (error) {
    throw new Error("Failed to select current session", { cause: error });
  }
}
