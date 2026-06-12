import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter.slice";
import themeReducer from "./slices/theme.slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        theme: themeReducer,
    }
});