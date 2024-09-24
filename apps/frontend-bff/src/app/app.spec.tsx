import { render } from '@testing-library/react';
import 'reflect-metadata';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
