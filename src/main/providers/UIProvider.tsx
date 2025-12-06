import { StatusBar } from "expo-status-bar";
import { createContext, PropsWithChildren } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }: PropsWithChildren) {
  return (
    <UIContext.Provider value={null}>
      <StatusBar style="auto" />
      {children}
    </UIContext.Provider>
  );
}
