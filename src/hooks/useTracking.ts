import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";

import database from "@/infra/database";
import { TrackingModel } from "@/infra/database/models";
import { Logger } from "@/infra/logs/logger";
import { TrackingService } from "@/services/tracking-service";
import { TrackingState } from "@/types/tracking.types";

export const useTracking = () => {
  const [tracking, setTracking] = useState<TrackingModel | null>(null);

  useEffect(() => {
    const trackingCollection = database.get<TrackingModel>("trackings");
    const query = trackingCollection.query(Q.where("finished_at", Q.eq(null)));

    const subscription = query.observe().subscribe((trackings) => {
      setTracking(trackings[0] || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateTrackingState = async (newState: TrackingState) => {
    try {
      if (newState === "on") {
        await TrackingService.start();
      } else {
        await TrackingService.finish();
      }
    } catch (error) {
      Logger.error(error);
    }
  };

  return {
    tracking,
    state: (tracking ? "on" : "off") as TrackingState,
    updateState: updateTrackingState,
  };
};
