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
    stockSearch: [],
    stockSearchLoading: false,
    stockSearchError: null,
    investorStory: {
        topicsNews: [],
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

    stockIndexes: [],
    indexLoader: false,
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
            url: API_ENDPOINTS.getInvestorStories,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getStockIndexes = createAsyncThunk("watchList/getStockIndexes", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.stockIndexes,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getStockBySearch = createAsyncThunk("stocks/getStockBySearch", async (keyword) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.stockSearchByKeyword + keyword,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const addTickertoWatchList = createAsyncThunk("watchList/addTickertoWatchList", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.addTickerToWatchList,
            data: requestData
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});


const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setStoryViewed: (state, action) => {
            const storyEnum = {
                Topics_news: 'isTopicViewed',
                Watchlist_news: 'isWatchListViewed',
                Tren_stock_news: 'isStockViewed',
                Trending_news: 'isNewsViewed'
            }
            state.storyViewed = {
                ...state.storyViewed,
                [storyEnum[action.payload]]: true
            }
        }
    },

    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };
        const handleIndexLoading = (state, action) => {
            state.indexLoader = action.meta.requestStatus === 'pending';
        };
        const handleStockSearchLoading = (state, action) => {
            state.stockSearchLoading = action.meta.requestStatus === 'pending';
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
            .addCase(getStockBySearch.fulfilled, (state, action) => {
                state.stockSearch = action.payload; 
            })
            .addCase(getInvestorStories.fulfilled, (state, action) => {
                const topicsNews = Object.values(action.payload["Topics_news"]).flat();
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

            .addCase(getStockIndexes.fulfilled, (state, action) => {
                state.stockIndexes = action.payload;
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
                    action.type === getTickersById.rejected.type ||
                    action.type === getInvestorStories.pending.type ||
                    action.type === getInvestorStories.fulfilled.type ||
                    action.type === getInvestorStories.rejected.type||
                    action.type === addTickertoWatchList.fulfilled.type ||
                    action.type === addTickertoWatchList.pending.type ||
                    action.type === addTickertoWatchList.rejected.type,


                handleLoading
            )
            .addMatcher(
                (action) =>
                    action.type === getStockIndexes.fulfilled.type ||
                    action.type === getStockIndexes.pending.type ||
                    action.type === getStockIndexes.rejected.type,
                handleIndexLoading
            )
            .addMatcher(
                (action) =>
                    action.type === getStockBySearch.pending.type ||
                    action.type === getStockBySearch.fulfilled.type ||
                    action.type === getStockBySearch.rejected.type,
                handleStockSearchLoading
            );
    }
});
export const { setStoryViewed } = dashboardSlice.actions;
export default dashboardSlice.reducer;
