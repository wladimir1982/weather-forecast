import React, { useCallback, useState, useMemo } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../../api';
import CurrentWeather from '../../components/CurrentWeather';
import Forecast from '../../components/Forecast';
import Search from '../../components/Search';

import {
  IAutocompleteOption,
  ICurrentWeatherData,
  IForecastData,
  ISearchData
} from '../../interfaces/interfaces';

import styles from './WeatherForecast.module.scss';

const WeatherForecast: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeatherData>();
  const [forecast, setForecast] = useState<IForecastData>();
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<IAutocompleteOption | null>(null);
  const [cities, setCities] = useState<ISearchData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleOnSearchChange = useCallback(async (searchData: ISearchData) => {
    if (!searchData.value) {
      return;
    }

    const [lat, lon] = searchData.value.split(' ');
    setLoading(true);

    try {
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`),
        fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      ]);

      if (!currentWeatherResponse.ok || !forecastResponse.ok) {
        setIsError(true);
      }

      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();

      setCurrentWeather({ city: searchData.label, ...currentWeatherData });
      setForecast({ city: searchData.label, ...forecastData });
      setSelectedCity({ label: searchData.label, value: searchData.value });

      const isDuplicate = cities.some((city: ISearchData) => city.value === searchData.value);
      if (!isDuplicate) {
        setCities(prev => [...prev, searchData]);
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  }, [cities]);

  const handleSelectCity = useCallback((city: ISearchData) => {
    if (city.label !== selectedCity?.label && city.label !== currentWeather?.city) {
      setSelectedCity({ label: city.label, value: city.value });
      handleOnSearchChange(city);
    }
  }, [handleOnSearchChange, selectedCity?.label, currentWeather?.city]);

  const handleDeleteCity = useCallback((deletedCity: ISearchData) => {
    setCities(prev => prev.filter(city => city.label !== deletedCity.label));
  }, []);

  const citiesChips = useMemo(() =>
      cities.map((city: ISearchData, idx: number) => (
        <Chip
          key={`${city.label}${idx}`}
          className={styles.chip}
          label={city.label}
          onClick={() => handleSelectCity(city)}
          onDelete={() => handleDeleteCity(city)}
        />
      )),
    [cities, handleSelectCity, handleDeleteCity]
  );

  return (
    <Box className={styles.container} data-testid="weather-forecast">
      <Box className={styles.mainContent}>
        <Typography className={styles.title}>
          Why did the weather forecast go to therapy? Because it had a "cloudy" outlook on life!
        </Typography>
        <Search selectedCity={selectedCity} onSearchChange={handleOnSearchChange} />
        <Box className={styles.historySearchWrap} data-testid="history-search-wrap">
          {cities.length > 0 ? (<Box className={styles.historySearch}>{citiesChips}</Box>) : null}
        </Box>
        <CurrentWeather
          isLoading={isLoading}
          data={currentWeather}
          isError={isError}
        />
        <Forecast
          isLoading={isLoading}
          data={forecast}
          isError={isError}
        />
      </Box>
    </Box>
  );
};

export default WeatherForecast;
