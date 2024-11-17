import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

export default buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
