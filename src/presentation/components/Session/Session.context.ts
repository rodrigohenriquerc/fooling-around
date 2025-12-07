import { createContext, useContext } from "react";

import { SessionModel } from "@/infra/database/tables/sessions";
import { SessionState } from "@/presentation/features/session/session.types";

export const SessionContext = createContext<Session | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("SessionContext must be used within SessionProvider");
  }

  return context;
};

interface Session {
  state: SessionState;
  start: () => Promise<SessionModel>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  finish: () => Promise<void>;
  model: SessionModel | null;
}
