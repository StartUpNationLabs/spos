import "reflect-metadata";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { bffContainer, container, TYPES } from "@spos/services/common";
import { ContainerContext } from "@spos/ui/common";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Configuration as BffConfiguration } from "@spos/clients-bff";
import { Configuration as DiningConfiguration } from "@spos/clients-dining";
import process from "process";
import { Configuration as KitchenConfiguration } from "@spos/clients-kitchen";
import { Configuration as MenuConfiguration } from "@spos/clients-menu";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
bffContainer
  .bind<BffConfiguration>(TYPES.BackendBffConfiguration)
  .toDynamicValue(() => {
    return new BffConfiguration({
      basePath: import.meta.env.VITE_BFF_BASE_URL,
    });
  });


bffContainer
  .bind<DiningConfiguration>(TYPES.DiningApiConfiguration)
  .toConstantValue(
    new DiningConfiguration({
      basePath: import.meta.env.VITE_DINING_BASE_URL
    })
  );
bffContainer
  .bind<KitchenConfiguration>(TYPES.KitchenApiConfiguration)
  .toConstantValue(
    new KitchenConfiguration({
      basePath: import.meta.env.VITE_KITCHEN_BASE_URL,
    })
  );
bffContainer
  .bind<MenuConfiguration>(TYPES.MenuApiConfiguration)
  .toConstantValue(
    new MenuConfiguration({
      basePath: import.meta.env.VITE_MENU_BASE_URL,
    })
  );
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContainerContext.Provider value={bffContainer}>
          <CssBaseline />
          <ReactQueryDevtools />
          <App />
        </ContainerContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
