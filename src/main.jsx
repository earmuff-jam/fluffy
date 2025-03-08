import * as ReactDOM from 'react-dom/client';

import { lightTheme } from '@utils/Theme';

import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider, Button, Typography } from '@mui/material';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import ApplicationValidator from '@src/ApplicationValidator';

import AuthFooter from '@features/LandingPage/AuthFooter';
import AuthHeader from '@features/LandingPage/AuthHeader';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

Amplify.configure(outputs);
const queryClient = new QueryClient();

const components = {
  Header() {
    return <AuthHeader />;
  },
  Footer() {
    return <AuthFooter />;
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Authenticator components={components}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SnackbarProvider
          dense
          preventDuplicate
          maxSnack={3}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          autoHideDuration={3000}
        >
          <ApplicationValidator />
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Authenticator>
);
