import { DatabaseProvider, UIProvider } from "./presentation/providers";
import { HomeScreen } from "./presentation/screens";
import { Sentry } from "./tools/monitoring";

function App() {
  return (
    <DatabaseProvider>
      <UIProvider>
        <HomeScreen />
      </UIProvider>
    </DatabaseProvider>
  );
}

export default Sentry.wrap(App);
