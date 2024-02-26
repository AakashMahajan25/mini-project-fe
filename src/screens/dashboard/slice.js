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
    stockSearchData: [],
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
    investorStoryLoading: false,
    watchlistLoading: false,
    stockIndexes: [],
    indexLoader: false,
    companyDetails: [],
    companyStatistics: [],
    graphDetails: [],
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

export const getMostOnFrruitGpt = createAsyncThunk("dashboard/getMostOnFrruitGpt", async (limit) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getMostFrruitGpt + limit,
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

export const editWatchList = createAsyncThunk("watchList/editWatchList", async ({ watchlistId, watchListName }) => {
    try {
        let data = {
            method: METHOD_TYPE.put,
            url: API_ENDPOINTS.editWatchList + watchlistId,
            data: {
                watchlist_name: watchListName
            }
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const deleteWatchList = createAsyncThunk("watchList/deleteWatchList", async (watchlistId) => {
    try {
        let data = {
            method: METHOD_TYPE.delete,
            url: API_ENDPOINTS.deleteWatchList + watchlistId,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const addWatchList = createAsyncThunk("watchList/addWatchList", async (watchListName) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.addWatchList,
            data: { watchlist_name: watchListName }
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const getStocksCompanyDetail = createAsyncThunk("watchList/getStocksCompanyDetail", async (symbol) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getCompanyDetail + symbol,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});
export const getStockStatistics = createAsyncThunk("watchList/getStockStatistics", async (symbol) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getStockStatistics + symbol,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const getGraphDetail = createAsyncThunk("watchList/getGraphDetail", async ({ symbol, multiplier, timespan, from, to, limit }) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.getGraphDetail}?stocksTicker=${symbol}&multiplier=${multiplier}&timespan=${timespan}&from=${from}&to=${to}&adjusted=false&sort=asc&limit=${limit}`,
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
        const handleInvestoryStoriesLoading = (state, action) => {
            state.investorStoryLoading = action.meta.requestStatus === 'pending';
        };
        const handleStockSearchLoading = (state, action) => {
            state.stockSearchLoading = action.meta.requestStatus === 'pending';
        };
        const handleWatchlistLoading = (state, action) => {
            state.watchlistLoading = action.meta.requestStatus === 'pending';
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
                state.stockSearchData = action.payload;
            })
            .addCase(getStocksCompanyDetail.fulfilled, (state, action) => {
                state.companyDetails = action.payload;
            })
            .addCase(getStockStatistics.fulfilled, (state, action) => {
                state.companyStatistics = action.payload;
            })
            .addCase(getGraphDetail.fulfilled, (state, action) => {
                state.graphDetails = action.payload;
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
                    action.type === getStocksCompanyDetail.fulfilled.type ||
                    action.type === getStocksCompanyDetail.pending.type ||
                    action.type === getStocksCompanyDetail.rejected.type ||
                    action.type === getStockStatistics.fulfilled.type ||
                    action.type === getStockStatistics.pending.type ||
                    action.type === getStockStatistics.rejected.type ||
                    action.type === getGraphDetail.fulfilled.type ||
                    action.type === getGraphDetail.pending.type ||
                    action.type === getGraphDetail.rejected.type,
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
                    action.type === getUserWatchLists.fulfilled.type ||
                    action.type === getUserWatchLists.pending.type ||
                    action.type === getUserWatchLists.rejected.type ||
                    action.type === getTickersById.pending.type ||
                    action.type === getTickersById.fulfilled.type ||
                    action.type === getTickersById.rejected.type ||
                    action.type === addWatchList.pending.type ||
                    action.type === addWatchList.fulfilled.type ||
                    action.type === addWatchList.rejected.type ||
                    action.type === editWatchList.fulfilled.type ||
                    action.type === editWatchList.rejected.type ||
                    action.type === editWatchList.pending.type ||
                    action.type === deleteWatchList.fulfilled.type ||
                    action.type === deleteWatchList.pending.type ||
                    action.type === deleteWatchList.rejected.type ||
                    action.type === addTickertoWatchList.fulfilled.type ||
                    action.type === addTickertoWatchList.pending.type ||
                    action.type === addTickertoWatchList.rejected.type,

                handleWatchlistLoading
            )
            .addMatcher(
                (action) =>
                    action.type === getInvestorStories.pending.type ||
                    action.type === getInvestorStories.fulfilled.type ||
                    action.type === getInvestorStories.rejected.type,
                handleInvestoryStoriesLoading
            )
            .addMatcher(
                (action) =>
                    action.type === getStockBySearch.fulfilled.type ||
                    action.type === getStockBySearch.pending.type ||
                    action.type === getStockBySearch.rejected.type,
                handleStockSearchLoading
            );
    }
});
export const { setStoryViewed } = dashboardSlice.actions;
export default dashboardSlice.reducer;
