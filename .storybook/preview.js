import { useMemo } from 'react';

import { MemoryRouter } from 'react-router-dom';

import { Box, CssBaseline, ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../src/utils/Theme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';

import { Authenticator } from '@aws-amplify/ui-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const THEMES = {
  lightTheme: lightTheme,
  darkTheme: darkTheme,
};

export const MockAuthenticatorProvider = ({ children }) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};

const queryClient = new QueryClient();

export const decorators = [
  (story, context) => {
    const { theme: themeKey } = context.globals;
    const theme = useMemo(() => THEMES[themeKey] || THEMES['lightTheme'], [themeKey]);
    return (
      <Box sx={{ padding: '2rem' }}>
        <MockAuthenticatorProvider>
          <MemoryRouter>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDayjs}>{story()}</LocalizationProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </MemoryRouter>
        </MockAuthenticatorProvider>
      </Box>
    );
  },
];

export const globalTypes = {
  theme: {
    name: 'Theme',
    title: 'theme',
    description: 'theme selection',
    toolbar: {
      icon: 'paintbrush',
      title: 'Light Theme',
      dynamicTitle: true,
      items: [
        {
          value: 'lightTheme',
          title: 'Light Theme',
        },
        {
          value: 'darkTheme',
          title: 'Dark Theme',
        },
      ],
    },
  },
};

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
  },
};

export default preview;
