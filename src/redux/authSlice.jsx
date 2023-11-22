import { createSlice } from "@reduxjs/toolkit"

export const tokenSlice = createSlice({
    name: 'newsApi',
    initialState: {
      user: null,
      token: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },

        clearData: (state)=> {
            state.token = null
            state.user = null
        }
    }
})

export const { setToken, clearData,setUser } = tokenSlice.actions;

export default tokenSlice.reducer;