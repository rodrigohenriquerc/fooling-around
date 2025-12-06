import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { StatusBar } from "expo-status-bar";

import Sentry from "./config/sentry";
import database from "./infra/database";
import Home from "./presentation/screens/Home";

function App() {
  return (
    <DatabaseProvider database={database}>
      <StatusBar style="auto" />
      <Home />
    </DatabaseProvider>
  );
}

export default Sentry.wrap(App);
