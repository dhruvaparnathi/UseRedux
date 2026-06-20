import { configureStore } from '@reduxjs/toolkit';
import searchReducer from "./slices/search.slice";
import collectionReducer from "./slices/collection.slice";

const store = configureStore({
    reducer: {
        search: searchReducer,
        collection: collectionReducer,
    },
});

export default store;