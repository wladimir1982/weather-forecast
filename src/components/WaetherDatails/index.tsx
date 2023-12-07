import React from 'react';
import { Box } from '@mui/material';

import { ICurrentWeatherData } from '../../interfaces/interfaces';

import styles from './WeatherDetails.module.scss';

const WeatherDetails: React.FC<{ data: ICurrentWeatherData }> = ({ data }) => (
  <Box className={styles.details}>
    <Box className={styles.parameterRow}>
      <Box component="span" className={styles.parameterLabel}>
        Details
      </Box>
    </Box>
    <Box className={styles.parameterRow}>
      <Box component="span" className={styles.parameterLabel}>
        Feels like
      </Box>
      <Box component="span" className={styles.parameterValue}>
        {Math.round(data.main.feels_like)}°C
      </Box>
    </Box>
    <Box className={styles.parameterRow}>
      <Box component="span" className={styles.parameterLabel}>
        Wind
      </Box>
      <Box component="span" className={styles.parameterValue}>
        {data.wind.speed} m/s
      </Box>
    </Box>
    <Box className={styles.parameterRow}>
      <Box component="span" className={styles.parameterLabel}>
        Humidity
      </Box>
      <Box component="span" className={styles.parameterValue}>
        {data.main.humidity}%
      </Box>
    </Box>
    <Box className={styles.parameterRow}>
      <Box component="span" className={styles.parameterLabel}>
        Pressure
      </Box>
      <Box component="span" className={styles.parameterValue}>
        {data.main.pressure} hPa
      </Box>
    </Box>
  </Box>
);

export default WeatherDetails;
