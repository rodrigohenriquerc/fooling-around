import { Model } from "@nozbe/watermelondb";
import { date, field, readonly } from "@nozbe/watermelondb/decorators";

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
}
