import "reflect-metadata";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { bffContainer, container } from "@spos/services/common";
import { ContainerContext } from "@spos/ui/common";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContainerContext.Provider value={bffContainer}>
          <CssBaseline />
          <App />
        </ContainerContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
