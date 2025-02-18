import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
  // <Authenticator>
  //   <App />
  // </Authenticator>
);
