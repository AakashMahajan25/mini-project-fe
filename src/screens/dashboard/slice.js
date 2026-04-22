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
        watchlistNews: [],
        sessionNews: [],
        hotPursuitNews: [],
        corporateNews: [],
        economyNews: [],
        corporateResultsNews: [],
        marketNews: [],
    },
    storyViewed: {
        isWatchlistViewed: false,
        isSessionViewed: false,
        isHotPursuitViewed: false,
        isCorporateViewed: false,
        isEconomyViewed: false,
        isCorporateResultsViewed: false,
        isMarketViewed: false,
    },
    storyIndex:{
        watchlistNews: 0,
        sessionNews: 0,
        hotPursuitNews: 0,
        corporateNews: 0,
        economyNews: 0,
        corporateResultsNews: 0,
        marketNews: 0,
    },
    investorStoryLoading: false,
    investorStoryError: false,
    watchlistLoading: false,
    stockIndexes: [],
    indexLoader: false,
    companyDetails: [],
    companyStatistics: [],
    graphDetails: [],
    cmotsNews: [],
    companyOverview: {},
    financialPeer : [],
    financialsShareHoldings : [],
    companyRevenues : {},
    getResults: [],
    marketSummaryData: null,
    marketSummaryLoading: false,
    marketSummaryError: null
}

export const getStockOverview = createAsyncThunk("dashboard/getStockOverview", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getStockOverview + queryParams,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data;
    }
});

export const getFinancialsPeers = createAsyncThunk("dashboard/getFinancialsPeers", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getFinancialsPeers + queryParams,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data;
    }
});

export const getFinancialsShareHolding = createAsyncThunk("dashboard/getFinancialsShareHolding", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getFinancialsShareHolding + queryParams,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data;
    }
});

export const getStockRevenue = createAsyncThunk("dashboard/getStockRevenue", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getStockRevenue + queryParams,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data;
    }
});

export const getTrendingStocks = createAsyncThunk("dashboard/getTrendingStocks", async (market) => {
    try {
        // Get market from parameter or localStorage
        const marketValue = market || localStorage.getItem("trendingCountry") || 'IN';

        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.trendingLatestStocks}?market=${marketValue}`,
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
        return response.data;

    } catch (error) {
        throw error.response.data;
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
        throw error.response;
    }
});

export const fetchAllNews = createAsyncThunk("dashboard/fetchAllNews", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.fetchAllNews + queryParams,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data;
    }
});

export const fetchTrendingStocksFromAI = createAsyncThunk("dashboard/fetchTrendingStocksFromAI", async () => {
    try {
        // Determine the endpoint based on selected country
        const selectedCountry = localStorage.getItem('selectedCountry');
        const countryCode = selectedCountry === 'India' ? 'IN' : 'US';

        // Use different endpoint for US vs India
        const endpoint = countryCode === 'US'
            ? 'stocks/fetch_trending_stocks_us_ai'
            : API_ENDPOINTS.fetchTrendingStocksFromAI;

        let data = {
            method: METHOD_TYPE.get,
            url: endpoint,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const removeTickerFromWatchList = createAsyncThunk("watchList/removeTickerFromWatchList", async (watchListTickerId) => {
    try {
        let data = {
            method: METHOD_TYPE.delete,
            url: API_ENDPOINTS.removeTickerFromWatchList + watchListTickerId,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getFinancialsResults = createAsyncThunk("stocks/getFinancialsResults", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getFinancialsResults + queryParams,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error?.response?.data;
    }
});

export const getTrendingDashboardData = createAsyncThunk("dashboard/getTrendingDashboardData", async (market = 'IN') => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.getTrendingDashboardData}?market=${market}`
        };
        const response = await api(data);
        return response.data;
    } catch (error) {
        console.log('Error in getTrendingDashboardData:', error);
        throw error;
    }
});

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        resetStockDetail(state, action) {
            state.companyOverview = initialState.companyOverview;
            state.financialPeer = initialState.financialPeer;
            state.financialsShareHoldings = initialState.financialsShareHoldings
            state.companyRevenues = initialState.companyRevenues
        },
        setStoryViewed: (state, action) => {
            const storyEnum = {
                watchlist_news :'isWatchlistViewed',
                session_news:'isSessionViewed',
                hot_pursuit_news:'isHotPursuitViewed',
                corporate_news:'isCorporateViewed',
                economy_news:'isEconomyViewed',
                corporate_results_news:'isCorporateResultsViewed',
                market_news:'isMarketViewed',
            }
            state.storyViewed = {
                ...state.storyViewed,
                [storyEnum[action.payload]]: true
            }
        },

        setStoryIndex: (state, action) => {
            const storyEnum = {
                watchlist_news :'watchlistNews',
                session_news:'sessionNews',
                hot_pursuit_news:'hotPursuitNews',
                corporate_news:'corporateNews',
                economy_news:'economyNews',
                corporate_results_news:'corporateResultsNews',
                market_news:'marketNews',
            }
            state.storyIndex = {
                ...state.storyIndex,
                [storyEnum[action.payload.type]]: action.payload.number
            }
        },
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
        const handleMarketSummaryLoading = (state, action) => {
            state.marketSummaryLoading = action.meta.requestStatus === 'pending';
        };
        const handleWatchlistLoading = (state, action) => {
            state.watchlistLoading = action.meta.requestStatus === 'pending';
        };
        builder
            .addCase(getTrendingStocks.fulfilled, (state, action) => {
                state.trendingStocks = action.payload;
            })
            .addCase(getStockOverview.fulfilled, (state,action)=>{
                state.companyOverview = action.payload;
            })
            .addCase(getFinancialsPeers.fulfilled, (state,action)=>{
                state.financialPeer = action.payload;
            })
            .addCase(getFinancialsShareHolding.fulfilled, (state,action)=>{
                state.financialsShareHoldings = action.payload;
            })
            .addCase(getStockRevenue.fulfilled, (state,action)=>{
                state.companyRevenues = action.payload;
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
            .addCase(getInvestorStories.rejected, (state, action) => {
                state.investorStoryError = true;
                state.investorStoryLoading = false;
            })
            .addCase(fetchAllNews.fulfilled, (state, action) => {
                state.cmotsNews = action.payload;
            })
            .addCase(getFinancialsResults.fulfilled, (state, action) => {
                state.getResults = action.payload;
            })
            .addCase(getInvestorStories.fulfilled, (state, action) => {
                const watchlist = Object.values(action.payload["watchlist_news"] || []).flat();
                const session = Object.values(action.payload["session_news"] || []).flat();
                const hotPursuit = Object.values(action.payload["hot_pursuit_news"] || []).flat();
                const corporate = Object.values(action.payload["corporate_news"] || []).flat();
                const economy = Object.values(action.payload["economy_news"] || []).flat();
                const corporateResults = Object.values(action.payload["corporate_results_news"] || []).flat();
                const market = Object.values(action.payload["market_news"] || []).flat();

                state.investorStory = {
                    watchlistNews: watchlist,
                    sessionNews: session,
                    hotPursuitNews: hotPursuit,
                    corporateNews:corporate,
                    economyNews: economy,
                    corporateResultsNews:corporateResults,
                    marketNews: market,
                };
                state.storyViewed = {
                    isWatchlistViewed: false,
                    isSessionViewed: false,
                    isHotPursuitViewed: false,
                    isCorporateViewed: false,
                    isEconomyViewed: false,
                    isCorporateResultsViewed: false,
                    isMarketViewed: false
                };
                state.storyIndex = {
                    watchlistNews: 0,
                    sessionNews: 0,
                    hotPursuitNews: 0,
                    corporateNews: 0,
                    economyNews: 0,
                    corporateResultsNews: 0,
                    marketNews: 0,
                }
                state.investorStoryError = false;
                state.investorStoryLoading = false;
            })

            .addCase(getStockIndexes.fulfilled, (state, action) => {
                state.stockIndexes = action.payload;
            })
            .addCase(getTrendingDashboardData.fulfilled, (state, action) => {
                state.marketSummaryData = action.payload;
                state.marketSummaryError = null;
            })
            .addCase(getTrendingDashboardData.rejected, (state, action) => {
                state.marketSummaryData = null;
                state.marketSummaryError = action.error.message;
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
                    action.type === getGraphDetail.rejected.type ||
                    action.type === fetchAllNews.fulfilled.type ||
                    action.type === fetchAllNews.pending.type ||
                    action.type === fetchAllNews.rejected.type ||
                    action.type === getStockOverview.fulfilled.type ||
                    action.type === getStockOverview.pending.type ||
                    action.type === getStockOverview.rejected.type ||
                    // action.type === getFinancialsPeers.fulfilled.type ||
                    // action.type === getFinancialsPeers.pending.type ||
                    // action.type === getFinancialsPeers.rejected.type ||
                    // action.type === getFinancialsShareHolding.fulfilled.type ||
                    // action.type === getFinancialsShareHolding.pending.type ||
                    // action.type === getFinancialsShareHolding.rejected.type ||
                    action.type === getStockRevenue.fulfilled.type ||
                    action.type === getStockRevenue.pending.type ||
                    action.type === getStockRevenue.rejected.type ||
                    action.type === getFinancialsResults.fulfilled.type ||
                    action.type === getFinancialsResults.pending.type ||
                    action.type === getFinancialsResults.rejected.type,
                    
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
                    action.type === removeTickerFromWatchList.fulfilled.type ||
                    action.type === removeTickerFromWatchList.pending.type ||
                    action.type === removeTickerFromWatchList.rejected.type ||
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
            )
            .addMatcher(
                (action) =>
                    action.type === fetchTrendingStocksFromAI.fulfilled.type ||
                    action.type === fetchTrendingStocksFromAI.pending.type ||
                    action.type === fetchTrendingStocksFromAI.rejected.type,
            )
            .addMatcher(
                (action) =>
                    action.type === getTrendingDashboardData.fulfilled.type ||
                    action.type === getTrendingDashboardData.pending.type ||
                    action.type === getTrendingDashboardData.rejected.type,
                handleMarketSummaryLoading
            );
    }
});
export const { setStoryViewed, setStoryIndex, resetStockDetail } = dashboardSlice.actions;
export default dashboardSlice.reducer;
