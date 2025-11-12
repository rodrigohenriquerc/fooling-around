import { Model } from "@nozbe/watermelondb";

import { date, field, readonly } from "@nozbe/watermelondb/decorators";

export default class LocationLog extends Model {
  static table = "location_logs";

  @field("latitude")
  latitude!: number;

  @field("longitude")
  longitude!: number;

  @field("timestamp")
  timestamp!: number;

  @field("accuracy")
  accuracy!: number;

  @field("speed")
  speed!: number;

  @field("heading")
  heading!: number;

  @field("altitude")
  altitude!: number;

  @field("altitude_accuracy")
  altitudeAccuracy!: number;

  @field("mocked")
  mocked!: boolean;

  @field("app_state")
  appState?: "active" | "background" | "inactive";

  @field("event_id")
  eventId!: string;

  @field("task_name")
  taskName!: string;

  @readonly
  @date("created_at")
  createdAt!: Date;
}
