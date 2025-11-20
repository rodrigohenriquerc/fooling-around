import * as Sentry from "@sentry/react-native";

export const Logger = (() => {
  return {
    error: (message: unknown, error?: unknown) => {
      const errorMessage = error ? `${message}: ${error}` : message;

      console.error(errorMessage);
      Sentry.captureException(new Error(`${errorMessage}`));
    },
  };
})();
