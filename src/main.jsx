// import { store } from '@src/Store';
import rtkStore from './rtkStore';
import { Provider } from 'react-redux';
import { lightTheme } from '@utils/Theme';
import * as ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ApplicationValidator from '@src/ApplicationValidator';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Authenticator>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Provider store={rtkStore}>
        <SnackbarProvider
          dense
          preventDuplicate
          maxSnack={3}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          autoHideDuration={3000}
        >
          <ApplicationValidator />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </Authenticator>
);
