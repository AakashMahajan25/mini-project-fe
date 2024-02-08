import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";

const initialState = {
    trendingNews: [],
    trendingStocks: [],
    isLoading: false,
    mostOnFrruitGpt: [],
    watchLists: [],
    tickers: [],
    investorStory: {
        topicsNews:[],
        watchlistNews: [],
        trendingStock: [],
        trendingNews: [],
    },
    storyViewed: {
        isWatchListViewed: false,
        isStockViewed: false,
        isTopicViewed: false,
        isNewsViewed: false
    },

}

export const getTrendingStocks = createAsyncThunk("dashboard/getTrendingStocks", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.trendingLatestStocks,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data;
    }
});

export const getTrendingNews = createAsyncThunk("dashboard/getTrendingNews", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.trendingLatestNews,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getMostOnFrruitGpt = createAsyncThunk("dashboard/getMostOnFrruitGpt", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getMostFrruitGpt,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getUserWatchLists = createAsyncThunk("watchList/getUserWatchLists", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getUserWatchList,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getTickersById = createAsyncThunk("watchList/getTickersById", async (id) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getTickersById + `?watchListId=${id}`,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getInvestorStories = createAsyncThunk("dashboard/getInvestorStories", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url:API_ENDPOINTS.getInvestorStories,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});




const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };
        builder
            .addCase(getTrendingStocks.fulfilled, (state, action) => {
                state.trendingStocks = action.payload;
            })
            .addCase(getTrendingNews.fulfilled, (state, action) => {
                state.trendingNews = action.payload;
            })
            .addCase(getMostOnFrruitGpt.fulfilled, (state, action) => {
                state.mostOnFrruitGpt = action.payload;
            })
            .addCase(getUserWatchLists.fulfilled, (state, action) => {
                state.watchLists = action.payload;
            })
            .addCase(getTickersById.fulfilled, (state, action) => {
                state.tickers = action.payload;
            })
            .addCase(getInvestorStories.fulfilled, (state, action) => {
                const topicsNews =  Object.values(action.payload["Topics_news"]).flat();
                const watchlist = Object.values(action.payload["Watchlist_news"]).flat();
                const stocks = Object.values(action.payload["Tren_stock_news"]).flat();
                const news = Object.values(action.payload["Trending_news"]).flat();

                state.investorStory = {
                    topicsNews: topicsNews,
                    watchlistNews: watchlist,
                    trendingStock: stocks,
                    trendingNews: news
                }; 
                state.storyViewed = {
                    isWatchListViewed: false,
                    isStockViewed: false,
                    isTopicViewed: false,
                    isNewsViewed: false
                }
            })

            .addMatcher(
                (action) =>
                    action.type === getTrendingStocks.pending.type ||
                    action.type === getTrendingStocks.fulfilled.type ||
                    action.type === getTrendingStocks.rejected.type ||
                    action.type === getTrendingNews.pending.type ||
                    action.type === getTrendingNews.fulfilled.type ||
                    action.type === getTrendingNews.rejected.type ||
                    action.type === getMostOnFrruitGpt.pending.type ||
                    action.type === getMostOnFrruitGpt.fulfilled.type ||
                    action.type === getMostOnFrruitGpt.rejected.type ||
                    action.type === getUserWatchLists.pending.type ||
                    action.type === getUserWatchLists.fulfilled.type ||
                    action.type === getUserWatchLists.rejected.type ||
                    action.type === getTickersById.pending.type ||
                    action.type === getTickersById.fulfilled.type ||
                    action.type === getTickersById.rejected.type||
                    action.type === getInvestorStories.pending.type ||
                    action.type === getInvestorStories.fulfilled.type ||
                    action.type === getInvestorStories.rejected.type,


                handleLoading
            )
    }
});
export default dashboardSlice.reducer;
