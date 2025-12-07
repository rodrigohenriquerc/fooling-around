import { PropsWithChildren, useEffect, useState } from "react";

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

  const start = async () => {
    try {
      const newSession = await startSession();
      setState("ongoing");
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
    } catch (error) {
      Logger.logError("Session provider", error);
      throw error;
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const initialState = await getSessionState();
        setState(initialState);
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
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export * from "./Button/SessionButton";
export * from "./Controller/SessionController";
export * from "./Distance/SessionDistance";
