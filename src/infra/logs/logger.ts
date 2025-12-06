import * as Sentry from "@sentry/react-native";

export const Logger = (() => {
  return {
    error: (message: string, error?: unknown) => {
      console.error(message, error);
      Sentry.captureException(new Error(message, { cause: error }));
    },
  };
})();
