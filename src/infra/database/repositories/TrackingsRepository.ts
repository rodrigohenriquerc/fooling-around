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
      throw new Error(
        `[TrackingsRepository] 'createTracking' failed: ${error}`,
      );
    }
  },
  async finishTracking() {
    try {
      return await database.write(async (writer) => {
        const currentTracking = await writer.callReader(
          this.getCurrentTracking,
        );

        await currentTracking.update((tracking) => {
          tracking.finishedAt = new Date().toISOString();
        });
      });
    } catch (error) {
      throw new Error(
        `[TrackingsRepository] 'finishTracking' failed: ${error}`,
      );
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
      throw new Error(
        `[TrackingsRepository] 'getCurrentTracking' failed: ${error}`,
      );
    }
  },
  async deleteTracking(tracking: TrackingModel) {
    try {
      await database.write(async () => {
        await tracking.markAsDeleted();
        await tracking.destroyPermanently();
      });
    } catch (error) {
      throw new Error(
        `[TrackingsRepository] 'deleteTracking' failed: ${error}`,
      );
    }
  },
};
