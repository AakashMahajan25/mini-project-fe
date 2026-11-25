import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";

const initialState = {
    articles: [],
    nextCursor: null,
    categories: [],
    lastUpdated: null,
    insights: null,
    isLoading: false,
    isLoadingMore: false,
    error: null,
    requestId: null,
}

// params: { market, category, sentiment, q, cursor }; a cursor appends to the current list
export const fetchNewsFeed = createAsyncThunk("newsFeed/fetchNewsFeed", async (params) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.newsFeed,
            params,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data || error;
    }
});

export const fetchNewsInsights = createAsyncThunk("newsFeed/fetchNewsInsights", async (market) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.newsInsights,
            params: { market },
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data || error;
    }
});

const newsFeedSlice = createSlice({
    name: "newsFeed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsFeed.pending, (state, action) => {
                const append = !!action.meta.arg?.cursor;
                state.isLoading = !append;
                state.isLoadingMore = append;
                state.error = null;
                state.requestId = action.meta.requestId;
            })
            .addCase(fetchNewsFeed.fulfilled, (state, action) => {
                // Ignore responses superseded by a newer filter change
                if (action.meta.requestId !== state.requestId) return;
                const append = !!action.meta.arg?.cursor;
                const { articles = [], nextCursor, categories, lastUpdated } = action.payload || {};
                state.articles = append ? [...state.articles, ...articles] : articles;
                state.nextCursor = nextCursor;
                state.categories = categories || [];
                state.lastUpdated = lastUpdated;
                state.isLoading = false;
                state.isLoadingMore = false;
            })
            .addCase(fetchNewsFeed.rejected, (state, action) => {
                if (action.meta.requestId !== state.requestId) return;
                state.isLoading = false;
                state.isLoadingMore = false;
                state.error = action.error?.message || "Couldn't load news.";
            })
            .addCase(fetchNewsInsights.fulfilled, (state, action) => {
                state.insights = action.payload;
            })
    },
});

export default newsFeedSlice.reducer;
