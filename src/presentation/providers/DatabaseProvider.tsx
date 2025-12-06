import { DatabaseProvider as WDatabaseProvider } from "@nozbe/watermelondb/react";
import { PropsWithChildren } from "react";

import database from "@/infra/database";

export function DatabaseProvider({ children }: PropsWithChildren) {
  return <WDatabaseProvider database={database}>{children}</WDatabaseProvider>;
}
