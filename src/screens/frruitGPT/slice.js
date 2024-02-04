import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";

const initialState = {
    chatSuggestions: [],
}

export const getPromptSuggestion = createAsyncThunk("fruitGpt/getPromptSuggestion", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.frruitGptSuggestion + 5,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

const fruitGPTSlice = createSlice({
    name: "fruitGPT",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };
        builder
            .addCase(getPromptSuggestion.fulfilled, (state, action) => {
                state.chatSuggestions = action.payload;
            })

            .addMatcher(
                (action) =>
                    action.type === getPromptSuggestion.pending.type ||
                    action.type === getPromptSuggestion.fulfilled.type ||
                    action.type === getPromptSuggestion.rejected.type,

                handleLoading
            )
    }
});
export default fruitGPTSlice.reducer;
