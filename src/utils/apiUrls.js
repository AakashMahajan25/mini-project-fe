export const METHOD_TYPE = {
    get: "get",
    post: "post",
    put: "put",
    delete: "delete",
};

export const API_ENDPOINTS = {
    trendingLatestStocks: 'stocks/trending',
    trendingLatestNews: 'news/trending',
    getMostFrruitGpt: 'users/getMostOnFruitGPT',
    getUserWatchList: 'watchlist/fetchWatchList',
    getTickersById: 'watchlist/fetchWatchListTickerByWatchlist',
    frruitGptSuggestion: 'stocks/getPrompts?num=',
    fetchTrendingEvents: 'eventCategories/fetchtrendingEvents',
}