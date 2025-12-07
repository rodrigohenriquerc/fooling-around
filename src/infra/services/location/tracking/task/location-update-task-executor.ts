import { LocationObject } from "expo-location";
import { TaskManagerError } from "expo-task-manager";

import {
  LocationLogsRepository,
  SessionsRepository,
} from "@/infra/database/repositories";
import { Logger } from "@/tools/monitoring";

import { LOCATION_UPDATE_TASK_NAME } from "./location-update-task-config";

interface LocationUpdate {
  data: { locations: LocationObject[] };
  error: TaskManagerError | null;
}

export async function locationUpdateTaskExecutor(update: LocationUpdate) {
  if (update.error) throw update.error;

  if (!update.data?.locations?.length) return;

  try {
    const tracking = await SessionsRepository.getCurrentSession();
    if (!tracking) return;

    const { locations: newLocations } = update.data;

    const locationEvents = newLocations.map(
      ({ coords: { accuracy, latitude, longitude }, timestamp }) => ({
        accuracy,
        latitude,
        longitude,
        timestamp,
      }),
    );

    await LocationLogsRepository.createLocationLogs(
      tracking.id,
      locationEvents,
    );
  } catch (error) {
    Logger.logError(`${LOCATION_UPDATE_TASK_NAME} failed`, error);
  }
}
