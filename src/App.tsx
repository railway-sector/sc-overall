import { useState, useEffect, useCallback } from "react";
import { MyContext } from "./contexts/MyContext";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import { cpackages } from "./uniqueValues";
import UndergroundSwitch from "./components/UndergroundSwitch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChartMain from "./components/ChartMain";
import { authenticate } from "./autho";

const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  const [loggedInState, setLoggedInState] = useState<boolean>(false);
  useEffect(() => {
    authenticate(setLoggedInState, "ktqrsHNYtJyz0ydp");
  }, []);

  const [cpackage, setCpackage] = useState<any>(cpackages[0]);
  const [utilityLinestats, setUtilityLinestats] = useState<any>();

  const updateCpackage = useCallback((newContractpackage: any) => {
    setCpackage(newContractpackage);
  }, []);

  const updateUtilityLinestats = useCallback((newStats: any) => {
    setUtilityLinestats(newStats);
  }, []);

  return (
    <>
      {loggedInState && (
        <calcite-shell
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #555",
            "--calcite-color-background": "#2b2b2b",
          }}
        >
          <MyContext
            value={{
              cpackage,
              utilityLinestats,
              updateCpackage,
              updateUtilityLinestats,
            }}
          >
            <QueryClientProvider client={queryClient}>
              <UndergroundSwitch />
              <ChartMain />
              <ActionPanel />
              <MapDisplay />
              <Header />
            </QueryClientProvider>
          </MyContext>
        </calcite-shell>
      )}
    </>
  );
}
