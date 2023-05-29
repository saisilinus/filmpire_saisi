import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error(action.payload.data);
  }

  return next(action);
};
