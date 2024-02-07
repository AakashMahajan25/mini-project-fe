import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";

const initialState = {
    chatSuggestions: [],
    promptList: [],
}

export const getPromptSuggestion = createAsyncThunk("fruitGpt/getPromptSuggestion", async (number) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.frruitGptSuggestion + number,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getPromptList = createAsyncThunk("fruitGpt/getPromptList", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getPromptList,
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
            .addCase(getPromptList.fulfilled, (state, action) => {
                state.promptList = action.payload;
            })

            .addMatcher(
                (action) =>
                    action.type === getPromptSuggestion.pending.type ||
                    action.type === getPromptSuggestion.fulfilled.type ||
                    action.type === getPromptSuggestion.rejected.type ||
                    action.type === getPromptList.pending.type ||
                    action.type === getPromptList.fulfilled.type ||
                    action.type === getPromptList.rejected.type,

                handleLoading
            )
    }
});
export default fruitGPTSlice.reducer;
