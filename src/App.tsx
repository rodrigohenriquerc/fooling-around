import { DatabaseProvider, UIProvider } from "./main/providers";
import { HomeScreen } from "./presentation/screens";
import { Sentry } from "./tools";

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
