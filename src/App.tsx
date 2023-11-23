import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ActivityFeed from './components/ActivityFeed/ActivityFeed';
import theme from './theme/teme';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ActivityFeed />
      </ThemeProvider>
    </>
  );
}

export default App;
