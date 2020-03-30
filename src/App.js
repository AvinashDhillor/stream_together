import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <AppRouter></AppRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
