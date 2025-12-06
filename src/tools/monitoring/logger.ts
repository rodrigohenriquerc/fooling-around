import * as Sentry from "@sentry/react-native";

export class Logger {
  static logError(message: string, error?: unknown) {
    console.error(message, error);
    Sentry.captureException(new Error(message, { cause: error }));
  }
}
