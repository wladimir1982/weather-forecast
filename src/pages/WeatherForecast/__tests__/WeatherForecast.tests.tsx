import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherForecast from '../index';

describe('WeatherForecast', () => {
  test('renders WeatherForecast component', () => {
    render(<WeatherForecast />);

    expect(screen.getByTestId('weather-forecast')).toBeInTheDocument();
  });

  test('renders search input field', () => {
    render(<WeatherForecast />);

    const searchInput = screen.getByTestId('city-autocomplete');
    expect(searchInput).toBeInTheDocument();
  });

  test('renders History Search container', () => {
    render(<WeatherForecast />);

    const historySearchContainer = screen.getByTestId('history-search-wrap');
    expect(historySearchContainer).toBeInTheDocument();
  });

  test('displays current weather and forecast components', () => {
    render(<WeatherForecast />);

    const currentWeatherComponent = screen.getByTestId('current-weather');
    const currentForecastComponent = screen.getByTestId('forecast');
    expect(currentWeatherComponent).toBeInTheDocument();
    expect(currentForecastComponent).toBeInTheDocument();
  });
});
