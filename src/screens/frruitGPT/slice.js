import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { setCancelTokens } from "../marketContentGPT/slice";

const initialState = {
    chatSuggestions: [],
    promptList: [],
    chatHistory: [],
    isLoading: false,
    suggestionLoader: false,
    suggestionError: false,
    frruitLoader: false,
    error: null,
    promptLibraryList: [],
}

export const getPromptSuggestion = createAsyncThunk("fruitGpt/getPromptSuggestion", async (number) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.frruitGptSuggestion,
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

export const searchPrompt = createAsyncThunk("fruitGpt/searchPrompt", async (search) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.searchPrompt}${search}`,
        };
        let response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const addChatPrompt = createAsyncThunk("fruitGpt/addChatPrompt", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.addPrompt,
            data: requestData,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const getPromptHistory = createAsyncThunk("fruitGpt/getPromptHistory", async (Id) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.getPromptHistory}${Id}`,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const triggerFrruitGpt = createAsyncThunk("fruitGpt/triggerFrruitGpt", async ({requestData, cancelToken}, { dispatch }) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.triggerChatGpt,
            cancelToken: cancelToken.token,
            data: requestData
        };
        const response = await api(data);
        if (!response.data.status) {
            toast.error(response.data.message)
        }
        const chatData = [{
            person: "bot",
            text: response.data.data,
            type: "text"
        }]
        dispatch(setCancelTokens(null))
        return chatData;

    } catch (error) {
        const message = error?.response?.data?.message
        dispatch(setCancelTokens(null))
        // if (!error.response?.data.status) {
        //     toast.error(error?.response?.data?.message)
        // }
        throw {message, code: error?.code};
    }
});

export const triggerFrruitGptGraph = createAsyncThunk("fruitGpt/triggerFrruitGptGraph", async ({ requestData, cancelToken }, { dispatch }) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.triggerGPTGraph,
            cancelToken: cancelToken?.token,
            data: requestData
        };
        const response = await api(data);
        if (!response.data.status) {
            toast.error(response.data.message)
        }
        const chatData = [{
            person: "bot",
            text: response.data.data,
            type: "graph"
        }]
        dispatch(setCancelTokens(null))
        return chatData;
    } catch (error) {
        dispatch(setCancelTokens(null))
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const getPromptsLibrary = createAsyncThunk("fruitGpt/getPromptsLibrary", async (queryParam) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getPromptsLibrary + queryParam,
        };
        let response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const deletePrompt = createAsyncThunk("watchList/deletePrompt", async (promptId) => {
    try {
        let data = {
            method: METHOD_TYPE.delete,
            url: API_ENDPOINTS.deletePrompt + promptId,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});


const fruitGPTSlice = createSlice({
    name: "fruitGPT",
    initialState,
    reducers: {
        setChatHistory: (state, action) => {
            state.chatHistory = [...state?.chatHistory, ...action.payload];
        },
        clearChatHistory: (state, action) => {
            state.chatHistory = [];
        }
    },
    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };

        const handlefrruitLoading = (state, action) => {
            state.frruitLoader = action.meta.requestStatus === 'pending';
        };

        const handleSuggestionLoader = (state, action) => {
            state.suggestionLoader = action.meta.requestStatus === 'pending';
        }

        builder
            .addCase(getPromptSuggestion.fulfilled, (state, action) => {
                state.chatSuggestions = action.payload;
                state.suggestionError = false;
            })
            .addCase(getPromptSuggestion.rejected, (state, action) => {
                state.suggestionError = true;
            })
            .addCase(getPromptList.fulfilled, (state, action) => {
                state.promptList = action.payload;
            })
            .addCase(searchPrompt.fulfilled, (state, action) => {
                state.promptList = action.payload;
            })
            .addCase(getPromptHistory.fulfilled, (state, action) => {
                const history = action.payload.rows.map(row => {
                    try {
                        if (row.type === 'graph' && row.text) {
                            return {
                                ...row,
                                text: JSON.parse(row.text)
                            };
                        } else if (row.link && row.link.length > 0) {
                            const parsedLinks = row.link.map(link => JSON.parse(link));
                            return {
                                ...row,
                                link: parsedLinks
                            };
                        } else {
                            return row;
                        }
                    } catch (error) {
                        console.error(`Error parsing JSON for row with id ${row.id}:`, error);
                        return row; // Return the original row if parsing fails
                    }
                });
            
                state.chatHistory = history; // Update chat history in the Redux state
                state.cancelTokens = null; // Reset cancelTokens if needed
            })
            
            .addCase(triggerFrruitGpt.fulfilled, (state, action) => {
                state.chatHistory = [...state?.chatHistory, ...action.payload];
            })
            .addCase(triggerFrruitGptGraph.fulfilled, (state, action) => {
                if(action.payload !== undefined)
                state.chatHistory = [...state?.chatHistory, ...action.payload];
        })
        .addCase(getPromptsLibrary.fulfilled, (state, action) => {
            state.promptLibraryList = action.payload;
        })
            .addMatcher(
                (action) =>
                    action.type === getPromptHistory.pending.type ||
                    action.type === getPromptHistory.fulfilled.type ||
                    action.type === getPromptHistory.rejected.type ||
                    action.type === getPromptList.pending.type ||
                    action.type === getPromptList.fulfilled.type ||
                    action.type === getPromptList.rejected.type ||
                    action.type === searchPrompt.pending.type ||
                    action.type === searchPrompt.fulfilled.type ||
                    action.type === searchPrompt.rejected.type||
                    action.type === getPromptsLibrary.pending.type ||
                    action.type === getPromptsLibrary.fulfilled.type ||
                    action.type === getPromptsLibrary.rejected.type||
                    action.type === deletePrompt.pending.type ||
                    action.type === deletePrompt.fulfilled.type ||
                    action.type === deletePrompt.rejected.type,

                handleLoading
            )
            .addMatcher(
                (action) =>
                    action.type === triggerFrruitGpt.pending.type ||
                    action.type === triggerFrruitGpt.fulfilled.type ||
                    action.type === triggerFrruitGpt.rejected.type,
                handlefrruitLoading
            )
            .addMatcher(
                (action) =>
                    action.type === getPromptSuggestion.pending.type ||
                    action.type === getPromptSuggestion.fulfilled.type ||
                    action.type === getPromptSuggestion.rejected.type,
                handleSuggestionLoader
            );
    }
});

export const { setChatHistory, clearChatHistory } = fruitGPTSlice.actions;
export default fruitGPTSlice.reducer;
