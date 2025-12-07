import { LocationObject } from "expo-location";
import { TaskManagerError } from "expo-task-manager";

import {
  createLocationLogs,
  selectCurrentSession,
} from "@/infra/database/repositories";
import { Logger } from "@/tools/monitoring";

import { LOCATION_UPDATE_TASK_NAME } from "./location-update-task-config";

export async function locationUpdateTaskExecutor(update: LocationUpdate) {
  if (update.error) throw update.error;

  if (!update.data?.locations?.length) return;

  try {
    const currentSession = await selectCurrentSession();
    if (!currentSession) return;

    const locationLogs = update.data.locations.map(
      ({ coords: { accuracy, latitude, longitude }, timestamp }) => ({
        accuracy,
        latitude,
        longitude,
        timestamp,
      }),
    );

    await createLocationLogs(currentSession.id, locationLogs);
  } catch (error) {
    Logger.logError(`${LOCATION_UPDATE_TASK_NAME} failed`, error);
  }
}

interface LocationUpdate {
  data: { locations: LocationObject[] };
  error: TaskManagerError | null;
}
