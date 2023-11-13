import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./authSlice";


const store = configureStore({
    reducer : {
        token: tokenReducer
    }
});


export { store };