import 'reflect-metadata';
import { StrictMode, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import App from './app/app';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { container } from '@spos/services/common';
import { ContainerContext } from '@spos/ui/common';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContainerContext.Provider value={container}>
          <CssBaseline />
          <App />
          <ReactQueryDevtools />
        </ContainerContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
