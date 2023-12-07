import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import WeatherForecast from './pages/WeatherForecast';
import theme from './theme/teme';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <WeatherForecast />
      </ThemeProvider>
    </>
  );
}

export default App;
