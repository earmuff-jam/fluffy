import { lightTheme } from '@utils/Theme';
import * as ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ApplicationValidator from '@src/ApplicationValidator';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

Amplify.configure(outputs);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Authenticator>
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
