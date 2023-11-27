import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  Box,
  TextField,
} from '@mui/material';
import { debounce } from '@mui/material/utils'
import { geoApiOptions, GEO_API_URL } from '../../api';

import {
  IAutocompleteOption,
  ICityInfo,
  ISearchData
} from '../../interfaces/interfaces';

type SearchProps = {
  selectedCity: IAutocompleteOption | null;
  onSearchChange: (data: ISearchData) => void;
};

const Search: React.FC<SearchProps> = ({ selectedCity, onSearchChange }) => {
  const [search, setSearch] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [options, setOptions] = useState<IAutocompleteOption[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await fetch(
          `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${search}`,
          geoApiOptions
        );

        if (!response.ok) {
          let error = 'Failed to fetch data of Cities 😢';
          if (response.status === 429) {
            error = `You have exceeded the rate limit per second for your plan, BASIC, by the API provider.
            Type slower, please 😊`;
          }
          throw new Error(error);
        }

        const data = await response.json();
        const mappedOptions = data.data?.map((city: ICityInfo) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }));

        if (mappedOptions) {
          setOptions(mappedOptions);
        }
        setErrorMessage('');
      } catch (error) {
        const errorMessage = (error as Error).message;
        setErrorMessage(errorMessage)
      }
    };

    const fetchData = debounce(loadOptions, 500);
    fetchData();

    return () => {
      fetchData.clear();
    };
  }, [search]);


  const handleOnChange = (
    event: React.SyntheticEvent,
    value: IAutocompleteOption | null
  ): void => {
    const selectedValue = value ? value.value : '';
    onSearchChange({ el: '', label: value ? value.label : '', value: selectedValue });
  };

  const onInputChange = (
    event: React.ChangeEvent<unknown>,
    newInputValue: string,
    reason: AutocompleteChangeReason | string
  ): void => {
    if (reason === 'reset') {
      setSearch('');
    } else {
      setSearch(newInputValue);
    }
  };

  return (
    <Autocomplete
      sx={{
        '.MuiOutlinedInput-root': {
          borderRadius: '20px',
          backgroundColor: 'lightskyblue'
        }
      }}
      data-testid="city-autocomplete"
      noOptionsText={errorMessage ? <Box component="span" sx={{ color: 'red' }}>{errorMessage}</Box> : 'No options'}
      value={selectedCity || null}
      options={options}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.label === value.label && option.value === value.value}
      onInputChange={onInputChange}
      onChange={handleOnChange}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          variant="outlined"
          hiddenLabel
          placeholder="Type the name of the locality"
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
    />
  );
};

export default Search;
