import React from 'react';
import { render } from '@testing-library/react';
import WeatherDetails from '../index';

const mockData = {
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

describe('WeatherDetails', () => {
  test('renders the component with correct data', () => {
    const { getByText } = render(<WeatherDetails data={mockData} />);

    expect(getByText(/Feels like/)).toBeInTheDocument();
    expect(getByText(/Wind/)).toBeInTheDocument();
    expect(getByText(/Humidity/)).toBeInTheDocument();
    expect(getByText(/Pressure/)).toBeInTheDocument();

    expect(getByText(/28°C/)).toBeInTheDocument();
    expect(getByText(/3.1 m\/s/)).toBeInTheDocument();
    expect(getByText(/70%/)).toBeInTheDocument();
    expect(getByText(/1015 hPa/)).toBeInTheDocument();
  });
});
