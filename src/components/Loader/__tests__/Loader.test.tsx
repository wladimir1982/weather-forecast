import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../index';

describe('Loader', () => {
  test('renders the component with correct size', () => {
    const { getByTestId } = render(<Loader size={50} />);

    const loaderElement = getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();

    const circularProgressElement = loaderElement.querySelector('.MuiCircularProgress-root');
    expect(circularProgressElement).toHaveStyle('width: 50px');
    expect(circularProgressElement).toHaveStyle('height: 50px');
  });
});
