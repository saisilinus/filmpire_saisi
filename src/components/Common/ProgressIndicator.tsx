import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ProgressIndicator = () => (
  <Box display="flex" justifyContent="center">
    <CircularProgress size="4rem" />
  </Box>
);

export default ProgressIndicator;
