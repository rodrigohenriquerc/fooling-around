import { PropsWithChildren, useEffect, useState } from "react";

import { SessionModel } from "@/infra/database/tables/sessions";
import { initializeSessionState } from "@/presentation/features/session";
import {
  finishSession,
  pauseSession,
  resumeSession,
  startSession,
} from "@/presentation/features/session/usecases";
import { Logger } from "@/tools/monitoring";
import { SessionState } from "@/types/session.types";

import { SessionContext } from "./Session.context";

export function SessionProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<SessionState>("idle");
  const [session, setSession] = useState<SessionModel | null>(null);

  const start = async () => {
    try {
      const newSession = await startSession();
      setState("ongoing");
      setSession(newSession);
      return newSession;
    } catch (error) {
      Logger.logError("Session provider", error);
      throw error;
    }
  };

  const pause = async () => {
    try {
      await pauseSession();
      setState("paused");
    } catch (error) {
      Logger.logError("Session provider", error);
      throw error;
    }
  };

  const resume = async () => {
    try {
      await resumeSession();
      setState("ongoing");
    } catch (error) {
      Logger.logError("Session provider", error);
      throw error;
    }
  };

  const finish = async () => {
    try {
      await finishSession();
      setState("idle");
      setSession(null);
    } catch (error) {
      Logger.logError("Session provider", error);
      throw error;
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const initialSession = await initializeSessionState();

        setState(initialSession.state);
        setSession(initialSession.model);
      } catch (error) {
        Logger.logError("Failed to initialize session", error);
      }
    };

    init();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        state,
        start,
        pause,
        resume,
        finish,
        model: session,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
