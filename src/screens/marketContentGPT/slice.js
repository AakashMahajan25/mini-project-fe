import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";
import { toast } from "react-toastify";

const initialState = {
    chatSuggestions: [],
    promptList: [],
    contentChatHistory: [],
    isLoading: false,
    suggestionLoader: false,
    contentGPTLoader: false,
    error: null
}


export const triggerContentPrompt = createAsyncThunk("contentGpt/triggerContentPrompt", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.triggerContentPrompt ,
            data: requestData
        };
        const response = await api(data);
        if (!response.data.status) {
            toast.error(response.data.message)
        }
        const chatData = [{
            person: "bot",
            text: response.data.data,
            type: "link"
        }]
        return chatData;

    } catch (error) {
        if (!error.response?.data.status) {
            toast.error(error?.response?.data?.message)
        }
        throw error.response.data;
    }
});



const contentGPTSlice = createSlice({
    name: "contentGPT",
    initialState,
    reducers: {
        setChatHistory: (state, action) => {
            state.contentChatHistory = [...state?.contentChatHistory, ...action.payload];
        },
        clearChatHistory: (state, action) => {
            state.contentChatHistory = [];
        }
    },
    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };
        const handlefrruitLoading = (state, action) => {
            state.contentGPTLoader = action.meta.requestStatus === 'pending';
        };

        builder
            .addCase(triggerContentPrompt.fulfilled, (state, action) => {
                if(action.payload !== undefined)
                state.contentChatHistory = [...state?.contentChatHistory, ...action.payload];
            })
            .addMatcher(
                (action) =>
                    action.type === triggerContentPrompt.pending.type ||
                    action.type === triggerContentPrompt.fulfilled.type ||
                    action.type === triggerContentPrompt.rejected.type ,

                    handlefrruitLoading
            )
          
    }
});

export const { setChatHistory, clearChatHistory } = contentGPTSlice.actions;
export default contentGPTSlice.reducer;
