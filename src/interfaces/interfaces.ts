// Current Weather interface

export interface ICurrentWeatherData {
  base: string;
  city: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: ICoordinate;
  dt: number;
  id: number;
  main: IMainWeatherData;
  name: string;
  sys: ISysData;
  timezone: number;
  visibility: number;
  weather: IWeather[];
  wind: IWindData;
  message?: string;
}

export interface ICoordinate {
  lon: number;
  lat: number;
}

export interface IMainWeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
}

export interface ISysData {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IWindData {
  speed: number;
  deg: number;
}

// Forecast interface

export interface IForecastData {
  city: {
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: IWeatherInfo[];
  message: number;
}

export interface IWeatherInfo {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: IMainForecast;
  pop: number;
  sys: {
    pod: string;
  };
  visibility: number;
  weather: IWeather[];
  wind: IWindForecast;
}

export interface IWindForecast {
  deg: number;
  gust: number;
  speed: number;
}

export interface IMainForecast {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

// Search Data interface

export interface ISearchData {
  el: string;
  label: string;
  value: string;
}


// CityInfo interface

export interface ICityInfo {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  regionWdId: string;
  type: string;
  wikiDataId: string;
}

// Autocomplete Option interface

export  interface IAutocompleteOption {
  value: string;
  label: string;
}
