import { Model, Query } from "@nozbe/watermelondb";
import {
  children,
  date,
  field,
  readonly,
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
}
