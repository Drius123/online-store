import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = () => (next) => async (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const error = action.payload;
    if (error && 'status' in error && error.error?.status === 401) {
      // eslint-disable-next-line no-console
      console.log('401 error', error.message);
    }
    if (error && 'status' in error && error.error?.status === 400) {
      // eslint-disable-next-line no-console
      console.log('400 error', error.message);
    }
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
  return next(action);
};
// eslint-disable-next-line no-empty-pattern,import/prefer-default-export
export const {} = rtkQueryErrorLogger;
