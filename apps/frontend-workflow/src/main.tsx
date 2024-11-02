import "reflect-metadata";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { container, TYPES } from "@spos/services/common";
import {
  CartStoreProvider,
  CommandsParameterStoreProvider,
  ContainerContext,
  PaymentStoreProvider
} from "@spos/ui/common";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Configuration as DiningConfiguration } from "@spos/clients-dining";
import { Configuration as KitchenConfiguration } from "@spos/clients-kitchen";
import { Configuration as MenuConfiguration } from "@spos/clients-menu";
import { Configuration as OrderingConfiguration } from "@spos/clients-ordering";

// Sentry.init({
//   dsn: 'https://a1ed2429a37d7de745e333e4f27bb472@sentry.ozeliurs.com/2',
//   integrations: [
//     // See docs for support of different versions of variation of react router
//     // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
//     Sentry.reactRouterV6BrowserTracingIntegration({
//       useEffect,
//       useLocation,
//       useNavigationType,
//       createRoutesFromChildren,
//       matchRoutes,
//     }),
//     Sentry.replayIntegration(),
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for tracing.
//   tracesSampleRate: 1.0,

//   // Capture Replay for 10% of all sessions,
//   // plus for 100% of sessions with an error
//   replaysSessionSampleRate: 1,
//   replaysOnErrorSampleRate: 1.0,
// });
container
  .bind<DiningConfiguration>(TYPES.DiningApiConfiguration)
  .toConstantValue(
    new DiningConfiguration({
      basePath: import.meta.env.VITE_DINING_BASE_URL,
    })
  );
container
  .bind<KitchenConfiguration>(TYPES.KitchenApiConfiguration)
  .toConstantValue(
    new KitchenConfiguration({
      basePath: import.meta.env.VITE_KITCHEN_BASE_URL,
    })
  );
container.bind<MenuConfiguration>(TYPES.MenuApiConfiguration).toConstantValue(
  new MenuConfiguration({
    basePath: import.meta.env.VITE_MENU_BASE_URL,
  })
);


container.bind<OrderingConfiguration>(TYPES.OrderingApiConfiguration).toConstantValue(
  new OrderingConfiguration({
    basePath: import.meta.env.VITE_ORDERING_BASE_URL,
  })
);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient1 = new QueryClient();
const queryClient2 = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient1}>
      <BrowserRouter>
        <ContainerContext.Provider value={container}>
          <CartStoreProvider>
            <CommandsParameterStoreProvider>
              <PaymentStoreProvider>
                <CssBaseline />
                <App />
                <ReactQueryDevtools />
              </PaymentStoreProvider>
            </CommandsParameterStoreProvider>
          </CartStoreProvider>
        </ContainerContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
    <QueryClientProvider client={queryClient2}>
      <BrowserRouter>
        <ContainerContext.Provider value={container}>
          <CartStoreProvider>
            <CommandsParameterStoreProvider>
              <PaymentStoreProvider>
                <CssBaseline />
                <App />
                <ReactQueryDevtools />
              </PaymentStoreProvider>
            </CommandsParameterStoreProvider>
          </CartStoreProvider>
        </ContainerContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
