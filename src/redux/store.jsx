import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenReducer from "./authSlice";

const reducers = combineReducers({
    token: tokenReducer,
});
const persistConfig = {
    key: "getUser",
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
const persistor = persistStore(store);

export { store,persistor };