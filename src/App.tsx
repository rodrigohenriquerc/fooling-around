import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { StatusBar } from "expo-status-bar";

import database from "./infra/database";
import Home from "./screens/Home";

export default function App() {
  return (
    <DatabaseProvider database={database}>
      <StatusBar style="auto" />
      <Home />
    </DatabaseProvider>
  );
}
