import { Q } from "@nozbe/watermelondb";

import database from "@/infra/database";
import { TrackingModel } from "@/infra/database/models";

export const TrackingsRepository = {
  async createTracking() {
    try {
      return await database.write(async () => {
        return await database.get<TrackingModel>("trackings").create(() => {});
      });
    } catch (error) {
      throw new Error("[TrackingsRepository] 'createTracking' failed.", {
        cause: error,
      });
    }
  },
  async finishTracking() {
    try {
      return await database.write(async () => {
        const trackings = await database
          .get<TrackingModel>("trackings")
          .query(Q.where("finished_at", Q.eq(null)), Q.take(1))
          .fetch();

        const currentTracking = trackings[0];

        if (currentTracking) {
          await currentTracking.update((tracking) => {
            tracking.finishedAt = new Date().toISOString();
          });
        }
      });
    } catch (error) {
      throw new Error("[TrackingsRepository] 'finishTracking' failed.", {
        cause: error,
      });
    }
  },
  async getCurrentTracking() {
    try {
      return await database.read(async () => {
        const selected = await database
          .get<TrackingModel>("trackings")
          .query(Q.where("finished_at", Q.eq(null)), Q.take(1))
          .fetch();

        return selected[0];
      });
    } catch (error) {
      throw new Error("[TrackingsRepository] 'getCurrentTracking' failed.", {
        cause: error,
      });
    }
  },
  async deleteTracking(tracking: TrackingModel) {
    try {
      await database.write(async () => {
        await tracking.markAsDeleted();
        await tracking.destroyPermanently();
      });
    } catch (error) {
      throw new Error("[TrackingsRepository] 'deleteTracking' failed.", {
        cause: error,
      });
    }
  },
};
