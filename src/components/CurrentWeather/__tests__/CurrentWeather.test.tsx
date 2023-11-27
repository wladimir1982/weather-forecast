import React from 'react';
import { render } from '@testing-library/react';
import CurrentWeather from '../index';

const weatherData = {
  base: 'station',
  city: 'London',
  clouds: { all: 75 },
  cod: 200,
  coord: { lon: -0.13, lat: 51.51 },
  dt: 1636545456,
  id: 2643743,
  main: {
    temp: 25,
    feels_like: 28,
    humidity: 70,
    temp_min: 23,
    temp_max: 27,
    pressure: 1015,
  },
  name: 'London',
  sys: { type: 1, id: 1414, country: 'GB', sunrise: 1636512561, sunset: 1636543632 },
  timezone: 0,
  visibility: 10000,
  weather: [
    { description: 'Cloudy', icon: '04d', id: 803, main: 'Clouds' },
  ],
  wind: { speed: 3.1, deg: 220 },
};

describe('CurrentWeather', () => {

  it('should render loader when isLoading prop is true', () => {
    const { getByTestId } = render(<CurrentWeather isLoading={true} data={weatherData} isError={false} />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should render weather data correctly', () => {
    const { getByText, getByAltText } = render(
      <CurrentWeather isLoading={false} data={weatherData} isError={false} />
    );

    expect(getByText('London')).toBeInTheDocument();
    expect(getByText('Cloudy')).toBeInTheDocument();
    expect(getByText('25°C')).toBeInTheDocument();
    expect(getByAltText('weather')).toHaveAttribute('src', 'icons/04d.png');
  });

  it('should render error message when isError prop is true', () => {
    const { getByText } = render(<CurrentWeather isLoading={false} data={undefined} isError={true} />);
    expect(getByText('Server error 😢')).toBeInTheDocument();
  });

  it('should render initial message when data is undefined', () => {
    const { getByText } = render(<CurrentWeather isLoading={false} data={undefined} isError={false} />);
    expect(getByText('Please select a location 😄🌟')).toBeInTheDocument();
  });
});
