import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import styles from './Loader.module.scss';

type LoaderProps = {
  size: number | string;
};

const Loader: React.FC<LoaderProps> = ({ size }) => (
  <Box className={styles.loaderBox} data-testid="loader">
    <CircularProgress size={size} />
  </Box>
);

export default Loader;
