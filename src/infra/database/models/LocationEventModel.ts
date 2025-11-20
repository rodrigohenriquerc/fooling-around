import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  nochange,
  readonly,
} from "@nozbe/watermelondb/decorators";

export class LocationEventModel extends Model {
  static table = "location_events";
  static associations = {
    trackings: { type: "belongs_to", key: "tracking_id" },
  } as const;

  @nochange
  @field("tracking_id")
  trackingId!: string;

  @nochange
  @field("latitude")
  latitude!: number;

  @nochange
  @field("longitude")
  longitude!: number;

  @nochange
  @field("timestamp")
  timestamp!: number;

  @nochange
  @field("accuracy")
  accuracy!: number | null;

  @nochange
  @field("speed")
  speed!: number | null;

  @nochange
  @field("heading")
  heading!: number | null;

  @nochange
  @field("altitude")
  altitude!: number | null;

  @nochange
  @field("altitude_accuracy")
  altitudeAccuracy!: number | null;

  @readonly
  @date("created_at")
  createdAt!: Date;
}
