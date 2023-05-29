/* eslint-disable react/jsx-indent */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { Typography, Button, Theme, SxProps, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

type Props = {
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

const Pagination = ({ currentPage, setPage, totalPages }: Props) => {
  const theme = useTheme();
  const location = useLocation();

  useEffect(() => {
    setPage(1);
  }, [location]);

  const buttonStyle : SxProps<Theme> = {
    margin: '30px 2px',
  };

  const handlePrev = () => setPage((prevPage) => prevPage - 1);

  const handleNext = () => setPage((prevPage) => prevPage + 1);

  if (totalPages === 0) return null;

  return (
    <div
      css={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Button onClick={handlePrev} variant="contained" color="primary" type="button" sx={buttonStyle} disabled={currentPage === 1}>Prev</Button>
      <Typography variant="h4" sx={{ margin: '0 20px !important', color: theme.palette.text.primary }}>{currentPage}</Typography>
      <Button onClick={handleNext} variant="contained" color="primary" type="button" sx={buttonStyle} disabled={currentPage === totalPages}>Next</Button>
    </div>
  );
};

export default Pagination;
