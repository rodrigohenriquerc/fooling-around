import { DatabaseProvider, UIProvider } from "./main/providers";
import { Sentry } from "./main/tools";
import { HomeScreen } from "./presentation/screens";

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
