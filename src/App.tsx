import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/teme';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div>Hello!!!</div>
      </ThemeProvider>
    </>
  );
}

export default App;
