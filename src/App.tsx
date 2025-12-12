import "@/tasks";

import { DatabaseProvider } from "@nozbe/watermelondb/react";
import * as Sentry from "@sentry/react-native";
import { StatusBar } from "expo-status-bar";

import database from "@/infra/database";

import { HomeScreen } from "./presentation/screens";

function App() {
  return (
    <DatabaseProvider database={database}>
      <StatusBar style="auto" />
      <HomeScreen />
    </DatabaseProvider>
  );
}

export default Sentry.wrap(App);

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enableLogs: true,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],
  sendDefaultPii: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
});
