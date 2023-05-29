import { Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  errorMessage: ReactNode;
};

const ItemNotFound = ({ errorMessage }: Props) => (
  <Box display="flex" alignItems="center" mt="20px">
    <Typography variant="h4">
      {errorMessage}
    </Typography>
  </Box>
);

export default ItemNotFound;
