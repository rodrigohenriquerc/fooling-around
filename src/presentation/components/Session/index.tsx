import { PropsWithChildren, useEffect, useState } from "react";

import { SessionModel } from "@/infra/database/tables/sessions";
import { getSessionState } from "@/modules/session/services/get-session-state";
import {
  finishSession,
  pauseSession,
  resumeSession,
  startSession,
} from "@/modules/session/usecases";
import { Logger } from "@/tools/monitoring";
import { SessionState } from "@/types/session.types";

import { SessionContext } from "./Session.context";

export function Session({ children }: PropsWithChildren) {
  const [state, setState] = useState<SessionState>("idle");
  const [session, setSession] = useState<SessionModel | null>(null);

  const [distance, setDistance] = useState(0);

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
      setDistance(0);
    } catch (error) {
      Logger.logError("Session provider", error);
      throw error;
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { state, session } = await getSessionState();
        setState(state);
        setSession(session);
      } catch (error) {
        Logger.logError("Failed to initialize session", error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const sub = session?.distance.subscribe(setDistance);
    return () => sub?.unsubscribe();
  }, [session?.distance]);

  return (
    <SessionContext.Provider
      value={{
        state,
        start,
        pause,
        resume,
        finish,
        distance,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export * from "./Button/SessionButton";
export * from "./Controller/SessionController";
export * from "./Distance/SessionDistance";
