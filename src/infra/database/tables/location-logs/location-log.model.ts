import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  field,
  immutableRelation,
  nochange,
  readonly,
} from "@nozbe/watermelondb/decorators";

import type { SessionModel } from "@/infra/database/tables/sessions/session.model";

export class LocationLogModel extends Model {
  static table = "location_logs";
  static associations = {
    sessions: { type: "belongs_to", key: "session_id" },
  } as const;

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
  @field("session_id")
  sessionId!: string;

  @readonly
  @date("created_at")
  createdAt!: Date;

  @immutableRelation("sessions", "session_id")
  session!: Relation<SessionModel>;
}
