import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from '../Loader';
import WeatherDetails from '../WaetherDatails';
import { formatTimestamp } from './helper';
import { WEEK_DAYS } from '../Forecast/helper';

import { ICurrentWeatherData } from '../../interfaces/interfaces';

import styles from './CurrentWeather.module.scss';

type CurrentWeatherProps = {
  isLoading: boolean;
  data: ICurrentWeatherData | undefined;
  isError: boolean;
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ isLoading, data, isError }) => {

  const renderWeatherContent = useCallback(() => {
    if (isLoading) {
      return <Loader size={80} />;
    }

    if (data && !isError) {
      const day = formatTimestamp(data.dt, 'day');
      const date = formatTimestamp(data.dt, 'date');
      const isWeekend = day === WEEK_DAYS[5] || day === WEEK_DAYS[6];

      return (
        <Box>
          <Box className={styles.topContent}>
            <Box>
              <Typography className={styles.city}>{data.city}</Typography>
              <Typography className={`${styles.date} ${isWeekend && styles.weekend}`}>
                {`${day} ${date}`}
              </Typography>
              <Typography className={styles.weatherDescription}>
                {data.weather[0].description}
              </Typography>
            </Box>
            <img alt="weather" className={styles.weatherIcon} src={`icons/${data.weather[0].icon}.png`} />
          </Box>
          <Box className={styles.bottomContent}>
            <Typography className={styles.temperature}>{Math.round(data.main.temp)}°C</Typography>
            <WeatherDetails data={data} />
          </Box>
        </Box>
      );
    }

    return (
      <Box className={styles.textMessage}>
        {isError ? (
          <Typography className={styles.errorMessage}>
            {data?.message ? `${data.message} 😢` : 'Server error 😢'}
          </Typography>
        ) : (
          <Typography className={styles.initialMessage}>Please select a location 😄🌟</Typography>
        )}
      </Box>
    );
  }, [isLoading, data, isError]);

  return <Box className={styles.weather} data-testid="current-weather">{renderWeatherContent()}</Box>;
};

export default React.memo(CurrentWeather);
