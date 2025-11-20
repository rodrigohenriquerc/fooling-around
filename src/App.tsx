import { DatabaseProvider } from "@nozbe/watermelondb/react";
import * as Sentry from "@sentry/react-native";
import { StatusBar } from "expo-status-bar";

import database from "./infra/database";
import Home from "./screens/Home";

Sentry.init({
  dsn: "https://df13ab5393fafa420ac74e6ed592cfff@o4510398103748608.ingest.us.sentry.io/4510398113316864",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function App() {
  return (
    <DatabaseProvider database={database}>
      <StatusBar style="auto" />
      <Home />
    </DatabaseProvider>
  );
});
