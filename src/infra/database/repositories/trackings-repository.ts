import { Q } from "@nozbe/watermelondb";

import database from "@/infra/database";
import { TrackingModel } from "@/infra/database/models";

export class TrackingsRepository {
  private static get _collection() {
    return database.get<TrackingModel>("trackings");
  }

  static async createTracking() {
    try {
      return await database.write(async () => {
        return await TrackingsRepository._collection.create(() => {});
      });
    } catch (error) {
      throw new Error("TrackingsRepository failed to create tracking", {
        cause: error,
      });
    }
  }

  static async getCurrentTracking() {
    try {
      return await database.read(async () => {
        const selected = await TrackingsRepository._collection
          .query(Q.where("finished_at", Q.eq(null)), Q.take(1))
          .fetch();

        return selected[0];
      });
    } catch (error) {
      throw new Error("TrackingsRepository failed to get current tracking", {
        cause: error,
      });
    }
  }
}
