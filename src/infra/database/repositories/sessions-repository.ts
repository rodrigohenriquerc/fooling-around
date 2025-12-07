import { Q } from "@nozbe/watermelondb";

import database from "@/infra/database";
import { SessionModel } from "@/infra/database/models";

export class SessionsRepository {
  private static get _collection() {
    return database.get<SessionModel>("sessions");
  }

  static async createSession() {
    try {
      return await database.write(async () => {
        return await SessionsRepository._collection.create(() => {});
      });
    } catch (error) {
      throw new Error("SessionsRepository failed to create session", {
        cause: error,
      });
    }
  }

  static async getCurrentSession() {
    try {
      return await database.read(async () => {
        const selected = await SessionsRepository._collection
          .query(Q.where("finished_at", Q.eq(null)), Q.take(1))
          .fetch();

        return selected[0];
      });
    } catch (error) {
      throw new Error("SessionsRepository failed to get current session", {
        cause: error,
      });
    }
  }
}
