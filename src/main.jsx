import { Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';

import { lightTheme } from '@utils/Theme';

import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';

import Loading from '@utils/Loading';
import ApplicationValidator from '@src/ApplicationValidator';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


Amplify.configure(outputs);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={lightTheme}>
    <Suspense fallback={<Loading />}>
      <Authenticator.Provider>
        <QueryClientProvider client={queryClient}>
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Authenticator.Provider>
    </Suspense>
  </ThemeProvider>
);
