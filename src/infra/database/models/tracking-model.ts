import { Model, Query } from "@nozbe/watermelondb";
import {
  children,
  date,
  field,
  readonly,
  writer,
} from "@nozbe/watermelondb/decorators";

import type { LocationEventModel } from "./location-event-model";

export class TrackingModel extends Model {
  static table = "trackings";
  static associations = {
    location_events: { type: "has_many", foreignKey: "tracking_id" },
  } as const;

  @readonly
  @date("created_at")
  createdAt!: Date;

  @field("finished_at")
  finishedAt!: string;

  @children("location_events")
  locationEvents!: Query<LocationEventModel>;

  @writer async finish() {
    try {
      await this.update((tracking) => {
        tracking.finishedAt = new Date().toISOString();
      });
    } catch (error) {
      throw new Error("TrackingModel failed to finish the tracking", {
        cause: error,
      });
    }
  }

  @writer async remove() {
    try {
      await this.locationEvents.destroyAllPermanently();

      await this.destroyPermanently();
    } catch (error) {
      throw new Error("TrackingModel failed to remove the tracking", {
        cause: error,
      });
    }
  }
}
