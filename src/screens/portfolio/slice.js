import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";

const initialState = {
    snapshot: null,
    isLoading: false,
    error: null,
}

const call = async (data) => {
    try {
        const response = await api(data);
        return response.data;
    } catch (error) {
        throw error?.response?.data || error;
    }
}

export const fetchPortfolio = createAsyncThunk("portfolio/fetchPortfolio", async () => {
    const res = await call({ method: METHOD_TYPE.get, url: API_ENDPOINTS.portfolio });
    return res.data;
});

// body: { market, symbol, quantity, avg_price, sector?, notes? } → { message, data: { holding_id, merged } }
export const addHolding = createAsyncThunk("portfolio/addHolding", async (body) =>
    call({ method: METHOD_TYPE.post, url: API_ENDPOINTS.portfolioHoldings, data: body })
);

export const updateHolding = createAsyncThunk("portfolio/updateHolding", async ({ id, ...body }) =>
    call({ method: METHOD_TYPE.put, url: `${API_ENDPOINTS.portfolioHoldings}/${id}`, data: body })
);

export const deleteHolding = createAsyncThunk("portfolio/deleteHolding", async (id) =>
    call({ method: METHOD_TYPE.delete, url: `${API_ENDPOINTS.portfolioHoldings}/${id}` })
);

export const searchSymbols = async (q, market) => {
    const res = await call({ method: METHOD_TYPE.get, url: API_ENDPOINTS.portfolioSearch, params: { q, market } });
    return res.data || [];
}

const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPortfolio.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPortfolio.fulfilled, (state, action) => {
                state.isLoading = false;
                state.snapshot = action.payload;
            })
            .addCase(fetchPortfolio.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error?.message || "Couldn't load your portfolio";
            });
    },
});

export default portfolioSlice.reducer;
