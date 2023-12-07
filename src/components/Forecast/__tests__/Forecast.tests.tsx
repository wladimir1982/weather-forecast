import React from 'react';
import { render, screen } from '@testing-library/react';
import Forecast from '../index';

const mockData = {
  city: {
    coord: {
      lat: 51.5074,
      lon: -0.1278,
    },
    country: 'GB',
    id: 2643743,
    name: 'London',
    population: 100000,
    sunrise: 1638084089,
    sunset: 1638121207,
    timezone: 0,
  },
  cnt: 7,
  cod: '200',
  list: [
    {
      clouds: {
        all: 40,
      },
      dt: 1638094800,
      dt_txt: '2021-11-28 15:00:00',
      main: {
        feels_like: 10,
        grnd_level: 1000,
        humidity: 70,
        pressure: 1015,
        sea_level: 1015,
        temp: 15,
        temp_kf: 0,
        temp_max: 20,
        temp_min: 10,
      },
      pop: 0,
      sys: {
        pod: 'd',
      },
      visibility: 10000,
      weather: [
        {
          description: 'Cloudy',
          icon: '04d',
          id: 803,
          main: 'Clouds',
        },
      ],
      wind: {
        deg: 250,
        gust: 2.5,
        speed: 2,
      },
    },
  ],
  message: 0,
};

describe('Forecast', () => {
  it('renders loading state correctly', () => {
    render(<Forecast isLoading={true} data={undefined} isError={false} />);
    const loaderElement = screen.getAllByTestId('loader')[0];
    expect(loaderElement).toBeInTheDocument();
  });

  it('renders error message correctly', () => {
    render(<Forecast isLoading={false} data={undefined} isError={true} />);
    const errorMessageElement = screen.getAllByText('Server error 😢')[0];
    expect(errorMessageElement).toBeInTheDocument();
  });

  it('renders initial message correctly', () => {
    render(<Forecast isLoading={false} data={undefined} isError={false} />);
    const initialMessageElement = screen.getAllByText('Please select a location 😄🌟')[0];
    expect(initialMessageElement).toBeInTheDocument();
  });

  it('renders weather forecast correctly', () => {
    render(<Forecast isLoading={false} data={mockData} isError={false} />);

    const tempMinElement = screen.getAllByText('10°C')[0];
    const tempMaxElement = screen.getAllByText('20°C')[0];
    const feelsLikeElement = screen.getAllByText('10°C')[0];
    const windElement = screen.getAllByText('2 m/s')[0];

    expect(tempMinElement).toBeInTheDocument();
    expect(tempMaxElement).toBeInTheDocument();
    expect(feelsLikeElement).toBeInTheDocument();
    expect(windElement).toBeInTheDocument();
  });
});
