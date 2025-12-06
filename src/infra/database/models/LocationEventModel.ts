import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  field,
  immutableRelation,
  nochange,
  readonly,
} from "@nozbe/watermelondb/decorators";

import type { TrackingModel } from "./TrackingModel";

export class LocationEventModel extends Model {
  static table = "location_events";
  static associations = {
    trackings: { type: "belongs_to", key: "tracking_id" },
  } as const;

  @nochange
  @field("latitude")
  latitude!: number;

  @nochange
  @field("longitude")
  longitude!: number;

  @nochange
  @field("datetime")
  datetime!: string;

  @nochange
  @field("accuracy")
  accuracy!: number | null;

  @nochange
  @field("tracking_id")
  trackingId!: string;

  @readonly
  @date("created_at")
  createdAt!: Date;

  @immutableRelation("trackings", "tracking_id")
  tracking!: Relation<TrackingModel>;
}
