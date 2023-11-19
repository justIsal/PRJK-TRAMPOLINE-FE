import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { refreshToken } from "../api/refreshToken";
export const refreshAccessTokenAction = createAsyncThunk(
    'auth/refreshToken',
    async (_, { dispatch }) => {
      try {
        const newToken = await refreshToken(); // Panggil fungsi refresh token dari API
        return newToken.accessToken
      } catch (error) {
        throw error;
      }
    }
  );
export const tokenSlice = createSlice({
    name: 'newsApi',
    initialState: {
        accessToken: null,
        id: null,
        refreshToken: null,
        isRefreshingToken: false
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setIsRefreshingToken: (state, action) => {
            state.isRefreshingToken = action.payload;
        },
        clearData: (state)=> {
            state.accessToken = []
            state.id = []
        }
    },
    extraReducers: {
        [refreshAccessTokenAction.fulfilled]: (state, action) => {
          state.accessToken = action.payload;
          state.isRefreshingToken = false;
        },
        [refreshAccessTokenAction.rejected]: (state) => {
          state.isRefreshingToken = false;
        },
      },
})

export const { setAccessToken,setId,setRefreshToken,setIsRefreshingToken, clearData } = tokenSlice.actions;

export default tokenSlice.reducer;