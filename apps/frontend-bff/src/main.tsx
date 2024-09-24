import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "@freshgum/typedi";
import { DINING_API_PATH } from "@spos/services/common";
Container.set(
  {
    eager: false,
    multiple: false,
    scope: 'singleton',
    id: DINING_API_PATH,
    value: 'https://dining-backend.spos.polytech.apoorva64.com',
  },
  []
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
