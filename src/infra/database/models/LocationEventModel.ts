import { Model } from "@nozbe/watermelondb";

import { date, field, readonly } from "@nozbe/watermelondb/decorators";

export class LocationEventModel extends Model {
  static table = "location_events";

  @field("latitude")
  latitude!: number;

  @field("longitude")
  longitude!: number;

  @field("timestamp")
  timestamp!: number;

  @field("accuracy")
  accuracy!: number | null;

  @field("speed")
  speed!: number | null;

  @field("heading")
  heading!: number | null;

  @field("altitude")
  altitude!: number | null;

  @field("altitude_accuracy")
  altitudeAccuracy!: number | null;

  @field("mocked")
  mocked?: boolean;

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
