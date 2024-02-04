import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";

const initialState = {
    trendingEvents: [],
}

export const getTrendingEvents = createAsyncThunk("marketIntelligence/getTrendingEvents", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url:API_ENDPOINTS.fetchTrendingEvents,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});


const discoverCorrelationSlice = createSlice({
    name: "discoverCorrelation",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };
        builder
            .addCase(getTrendingEvents.fulfilled, (state, action) => {
                state.trendingEvents = action.payload;
            })

            .addMatcher(
                (action) =>
                    action.type === getTrendingEvents.pending.type ||
                    action.type === getTrendingEvents.fulfilled.type ||
                    action.type === getTrendingEvents.rejected.type,

                handleLoading
            )
    }
});
export default discoverCorrelationSlice.reducer;
