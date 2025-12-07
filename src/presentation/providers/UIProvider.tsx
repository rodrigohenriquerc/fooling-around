import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";

export function UIProvider({ children }: PropsWithChildren) {
  return (
    <>
      <StatusBar style="auto" />
      {children}
    </>
  );
}
