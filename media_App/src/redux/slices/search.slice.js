import { createSlice } from "@reduxjs/toolkit";
import { fetchMedia, fetchVideo, fetchGIFs } from "../../api/mediaAPI";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: "",
        activeTab: "images",
        results: [],
        loading: false,
        error: null
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        setActiveTab(state, action) {
            state.activeTab = action.payload;
        },
        setResults(state, action) {
            state.results = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading(state) {
            state.loading = true;
            state.error = null;
        },
        setError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearResults(state) {
            state.results = [];
            state.error = null;
        }
    }
});

export const { setQuery, setActiveTab, setResults, setLoading, setError, clearResults } = searchSlice.actions;

export const fetchMediaResults = (query, activeTab) => async (dispatch) => {
    if (!query) {
        dispatch(clearResults());
        return;
    }
    dispatch(setLoading());
    try {
        let data;
        if (activeTab === "images") {
            data = await fetchMedia(query);
        } else if (activeTab === "videos") {
            data = await fetchVideo(query);
        } else if (activeTab === "gifs") {
            data = await fetchGIFs(query);
        }
        dispatch(setResults(data));
    } catch (error) {
        dispatch(setError(error.message || "Failed to fetch media"));
    }
};

export default searchSlice.reducer;