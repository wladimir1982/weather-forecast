import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from '../Loader';
import {
  WEEK_DAYS,
  MONTH_NAMES,
  getMonthDays,
  getCurrentYear,
  getCurrentDate,
  getCurrentMonth
} from './helper';

import { IForecastData, IWeatherInfo } from '../../interfaces/interfaces';

import styles from './Forecast.module.scss';

type ForecastProps = {
  isLoading: boolean;
  data: IForecastData | undefined;
  isError: boolean;
};

const today = getCurrentDate();
const currentMonth = getCurrentMonth(today);
const currentYear = getCurrentYear(today);

const MONTH_DAYS = getMonthDays(currentMonth, currentYear);

const Forecast: React.FC<ForecastProps> = ({ isLoading, data, isError }) => {
  const renderErrorOrInitialMessage = useCallback(() => {
    if (isError) {
      return <Typography className={styles.errorMessage}>Server error 😢</Typography>;
    } else {
      return <Typography className={styles.initialMessage}>Please select a location 😄🌟</Typography>;
    }
  }, [isError]);

  const getForecastInfo = useCallback((item: IForecastData | IWeatherInfo, idx: number) => {
    const dayInAWeek = getCurrentDate().getDay();
    const forecastDaysOfTheWeek = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + idx + 1);
    const dayOfTheMonth = MONTH_DAYS[idx + 1];
    const month = MONTH_NAMES[currentDate.getMonth()];

    return {
      forecastDay: forecastDaysOfTheWeek[idx],
      dayOfTheMonth,
      month,
    };
  }, []);

  const renderWeatherForecast = useCallback(() => {
    return data?.list.slice(0, 7).map((item, idx) => {
      const { forecastDay, dayOfTheMonth, month } = getForecastInfo(item, idx);
      const isWeekend = forecastDay === WEEK_DAYS[5] || forecastDay === WEEK_DAYS[6];

      return (
        <Box className={styles.dailyItem} key={idx}>
          {isLoading ? (
            <Loader size={50} />
          ) : (
            <>
              <Box>
                <Typography className={styles.dayOfTheWeek}>{forecastDay}</Typography>
                <Typography
                  className={`${styles.dayOfTheMonth} ${isWeekend && styles.weekend}`}
                >
                  {dayOfTheMonth}
                </Typography>
                <Typography className={styles.month}>{month}</Typography>
              </Box>
              <img alt="weather" className={styles.weatherIcon} src={`icons/${item.weather[0].icon}.png`} />
              <Box className={styles.parameterRow}>
                <Box component="span" className={styles.parameterLabel}>
                  Min.
                </Box>
                <Box component="span" className={styles.parameterValue}>
                  {Math.round(item.main.temp_min)}°C
                </Box>
              </Box>
              <Box className={styles.parameterRow}>
                <Box component="span" className={styles.parameterLabel}>
                  Max.
                </Box>
                <Box component="span" className={styles.parameterValue}>
                  {Math.round(item.main.temp_max)}°C
                </Box>
              </Box>
              <Box className={styles.parameterRow}>
                <Box component="span" className={styles.parameterLabel}>
                  Feels like
                </Box>
                <Box component="span" className={styles.parameterValue}>
                  {Math.round(item.main.feels_like)}°C
                </Box>
              </Box>
              <Box className={styles.parameterRow}>
                <Box component="span" className={styles.parameterLabel}>
                  Wind
                </Box>
                <Box component="span" className={styles.parameterValue}>
                  {item.wind.speed} m/s
                </Box>
              </Box>
            </>
          )}
        </Box>
      );
    });
  }, [data, isLoading, getForecastInfo]);

  const renderWeatherForecastContainer = useCallback(() => {
    return (
      <Box className={styles.weeklyWeatherForecastContainer}>
        {renderWeatherForecast()}
      </Box>
    );
  }, [renderWeatherForecast]);

  return (
    <Box data-testid="forecast">
      {data && !isError ? renderWeatherForecastContainer() : (
        <Box className={styles.weeklyWeatherForecastContainer}>
          {Array.from({ length: 7 }).map((_, idx) => (
            <Box className={styles.dailyItem} key={idx}>
              {isLoading ? <Loader size={50} /> : (
                <Box className={styles.textMessage}>{renderErrorOrInitialMessage()}</Box>
              )}
            </Box>
          ))}
          <Box />
        </Box>
      )}
    </Box>
  );
};

export default React.memo(Forecast);
