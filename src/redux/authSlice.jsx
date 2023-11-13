import { createSlice } from "@reduxjs/toolkit"

export const tokenSlice = createSlice({
    name: 'newsApi',
    initialState: {accessToken: null,id: null},
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        clearData: (state)=> {
            state.accessToken = []
            state.id = []
        }
    },
})

export const { setAccessToken,setId, clearData } = tokenSlice.actions;

export default tokenSlice.reducer;