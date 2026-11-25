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
    isRefreshing: false,
    error: null,
    requestId: null,
}

// params: { market, category, sentiment, q, cursor, silent }; a cursor appends to the current list.
// `silent` reloads the first page while the current stories stay on screen (live "new stories" refresh).
export const fetchNewsFeed = createAsyncThunk("newsFeed/fetchNewsFeed", async ({ silent, ...params } = {}) => {
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

// How many stories arrived after `since` (ISO published_at of the newest story the user has) → { count, latest_published_at, lastUpdated }
export const checkNewsUpdates = createAsyncThunk("newsFeed/checkNewsUpdates", async ({ market, since }) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.newsUpdates,
            params: { market, since },
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
                const silent = !append && !!action.meta.arg?.silent;
                state.isLoading = !append && !silent;
                state.isLoadingMore = append;
                state.isRefreshing = silent;
                if (!silent) state.error = null;
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
                state.isRefreshing = false;
                state.error = null;
            })
            .addCase(fetchNewsFeed.rejected, (state, action) => {
                if (action.meta.requestId !== state.requestId) return;
                const silent = !action.meta.arg?.cursor && !!action.meta.arg?.silent;
                state.isLoading = false;
                state.isLoadingMore = false;
                state.isRefreshing = false;
                // A failed background refresh keeps the stories already on screen
                if (!silent || state.articles.length === 0) state.error = action.error?.message || "Couldn't load news.";
            })
            .addCase(fetchNewsInsights.fulfilled, (state, action) => {
                state.insights = action.payload;
            })
            .addCase(checkNewsUpdates.fulfilled, (state, action) => {
                const lastUpdated = action.payload?.lastUpdated;
                if (lastUpdated && (!state.lastUpdated || new Date(lastUpdated) > new Date(state.lastUpdated))) {
                    state.lastUpdated = lastUpdated;
                }
            })
    },
});

export default newsFeedSlice.reducer;
