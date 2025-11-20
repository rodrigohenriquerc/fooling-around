import { Q } from "@nozbe/watermelondb";

import database from "@/infra/database";
import { TrackingModel } from "@/infra/database/models";

export const TrackingsRepository = {
  createTracking,
  finishTracking,
  getCurrentTracking,
  findTrackingById,
};

async function createTracking() {
  try {
    return await database.write(async (writer) => {
      const currentTracking = await writer.callReader(getCurrentTracking);

      console.log("currentTracking:", currentTracking);

      if (currentTracking) {
        return currentTracking;
      }

      return await database.get<TrackingModel>("trackings").create(() => {});
    });
  } catch (error) {
    throw new Error(`[TrackingsRepository] 'createTracking' failed: ${error}`);
  }
}

async function finishTracking() {
  try {
    return await database.write(async (writer) => {
      const currentTracking = await writer.callReader(getCurrentTracking);

      if (!currentTracking) {
        throw new Error("There is no current tracking to finish.");
      }

      await currentTracking.update((tracking) => {
        tracking.finishedAt = new Date().toISOString();
      });
    });
  } catch (error) {
    throw new Error(`[TrackingsRepository] 'finishTracking' failed: ${error}`);
  }
}

async function getCurrentTracking() {
  try {
    return await database.read(async () => {
      const selected = await database
        .get<TrackingModel>("trackings")
        .query(Q.where("finished_at", Q.eq(null)))
        .fetch();

      return selected[0];
    });
  } catch (error) {
    throw new Error(
      `[TrackingsRepository] 'getCurrentTracking' failed: ${error}`,
    );
  }
}

async function findTrackingById(id: string) {
  try {
    return await database.read(async () => {
      return await database.get<TrackingModel>("trackings").find(id);
    });
  } catch (error) {
    throw new Error(
      `[TrackingsRepository] 'getCurrentTracking' failed: ${error}`,
    );
  }
}
