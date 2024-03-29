import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
    isLoading: false,
    contentChatHistory: [],
    contentPromptList: [],
    error: null,
    cancelTokens: null
}


export const triggerContentPrompt = createAsyncThunk("contentGpt/triggerContentPrompt", async ({requestData, cancelToken}) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.triggerContentPrompt,
            cancelToken: cancelToken.token,
            data: requestData
        };
        const response = await api(data);
        if (!response.data.status) {
            toast.error(response.data.message)
        }

        return response.data.data;

    } catch (error) {
        if (!error.response?.data.status) {
            toast.error(error?.response?.data?.message)
        }
        const message = error?.response?.data?.message
        throw {message, code: error?.code}
    }
});


export const getUploadURL = createAsyncThunk("contentGpt/getUploadURL", async (fileDetail) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.get_uploadUrl}?fileName=${fileDetail.name}&fileType=${fileDetail.type}`,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const updateUploadURL = createAsyncThunk("contentGpt/updateUploadURL", async ({ url, file }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await axios.put(url, file, config);
        return response;
    } catch (error) {
        console.log('error::::', error);
        throw error;
    }
});

export const addDocument = createAsyncThunk("contentGpt/addDocument", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.addDocument,
            data: requestData,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});


export const triggerDocumentChat = createAsyncThunk("contentGpt/triggerDocumentChat", async ({requestData, cancelToken}) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.triggerDocumentChat,
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
            type: "attachment"
        }]
        return chatData;

    } catch (error) {
        if (!error.response?.data.status) {
            toast.error(error?.response?.data?.message)
        }
        const message = error?.response?.data?.message
        throw {message, code: error?.code};
    }
});

export const getContentPromptList = createAsyncThunk("fruitGpt/getContentPromptList", async (filterType) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getContentPromptList + filterType,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getContentPromptHistory = createAsyncThunk("fruitGpt/getContentPromptHistory", async (Id) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.getContentPromptHistory}${Id}`,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const searchContentPrompt = createAsyncThunk("fruitGpt/searchContentPrompt", async ({ type, search }) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.searchContentPrompt}?type=${type}&prompt=${search}`,
        };
        let response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const deleteContentPrompt = createAsyncThunk("watchList/deleteContentPrompt", async (promptId) => {
    try {
        let data = {
            method: METHOD_TYPE.delete,
            url: API_ENDPOINTS.deleteContentPrompt + promptId,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response;
    }
});

export const triggerContentLinkGraph = createAsyncThunk("fruitGpt/triggerContentLinkGraph", async ({ question,id, cancelToken }, { dispatch }) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.triggerLinkGraph,
            cancelToken: cancelToken?.token,
            data: {
                link: question,
                prompt_id:id
            }
        };
        const response = await api(data);
        if (!response.data.status) {
            toast.error(response.data.message)
        }
        const chatData = [{
            person: "bot",
            text: response.data.data,
            type: "link",
            render_type: "graph"
        }]
        dispatch(setCancelTokens(null))
        return chatData;
    } catch (error) {
        dispatch(setCancelTokens(null))
        console.log('error::::', error.response)
        throw error.response;
    }
});
export const triggerContentAttachmentGraph = createAsyncThunk("fruitGpt/triggerContentAttachmentGraph", async ({ question,id, cancelToken }, { dispatch }) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.triggerAttachmentGraph,
            cancelToken: cancelToken?.token,
            data: {
                object_key: question,
                prompt_id:id
            }
        };
        const response = await api(data);
        if (!response.data.status) {
            toast.error(response.data.message)
        }
        const chatData = [{
            person: "bot",
            text: response.data.data,
            type: "attachment",
            render_type: "graph"
        }]
        dispatch(setCancelTokens(null))
        return chatData;
    } catch (error) {
        dispatch(setCancelTokens(null))
        console.log('error::::', error.response)
        throw error.response;
    }
});


const contentGPTSlice = createSlice({
    name: "contentGPT",
    initialState,
    reducers: {
        setChatHistory: (state, action) => {
            state.contentChatHistory = [...state?.contentChatHistory, ...action.payload];
        },
        clearContentChatHistory: (state, action) => {
            state.contentChatHistory = [];
        },
        clearAttactmentUrl: (state, action) => {
            state.attactmentUrl = [];
        },
        setCancelTokens: (state, action) => {
            state.cancelTokens = action.payload
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
            .addCase(getContentPromptHistory.fulfilled, (state, action) => {
                const history = action.payload.map(row => (row.type === 'link' && row.person === 'bot') ? ({ ...row, text: JSON.parse(row.text) }) : (row.type === 'attachment' && row.person === 'bot'&& row.render_type === 'graph') ? ({ ...row, text: JSON.parse(row.text) }): row)
                state.contentChatHistory = history;
            })
            .addCase(triggerContentPrompt.fulfilled, (state, action) => {
                if (action.payload !== undefined){
                    const chatData = [{
                        person: "bot",
                        text: action.payload.data,
                        type: "link"
                    }]
                    state.contentChatHistory = [...state?.contentChatHistory, ...chatData];
                }
                state.cancelTokens = null
            })
            .addCase(triggerContentPrompt.rejected, (state, action) => {
                state.cancelTokens = null
            })
            .addCase(triggerDocumentChat.fulfilled, (state, action) => {
                if (action.payload !== undefined)
                    state.contentChatHistory = [...state?.contentChatHistory, ...action.payload];
                    state.cancelTokens = null
            })
            .addCase(triggerContentLinkGraph.fulfilled, (state, action) => {
                if(action?.payload !== undefined)
                state.contentChatHistory = [...state?.contentChatHistory, ...action?.payload];
                state.cancelTokens = null
            })
            .addCase(triggerContentAttachmentGraph.fulfilled, (state, action) => {
                if(action?.payload !== undefined)
                state.contentChatHistory = [...state?.contentChatHistory, ...action?.payload];
                state.cancelTokens = null
            })
            .addCase(triggerDocumentChat.rejected, (state, action) => {
                state.cancelTokens = null
            })
            .addCase(getContentPromptList.fulfilled, (state, action) => {
                state.contentPromptList = action.payload;
            })
            .addCase(searchContentPrompt.fulfilled, (state, action) => {
                state.contentPromptList = action.payload;
            })
            .addMatcher(
                (action) =>
                    action.type === getUploadURL.pending.type ||
                    action.type === getUploadURL.fulfilled.type ||
                    action.type === getUploadURL.rejected.type ||
                    action.type === updateUploadURL.pending.type ||
                    action.type === updateUploadURL.fulfilled.type ||
                    action.type === updateUploadURL.rejected.type ||
                    action.type === getContentPromptList.pending.type ||
                    action.type === getContentPromptList.fulfilled.type ||
                    action.type === getContentPromptList.rejected.type ||
                    action.type === getContentPromptHistory.pending.type ||
                    action.type === getContentPromptHistory.fulfilled.type ||
                    action.type === getContentPromptHistory.rejected.type||
                    action.type === searchContentPrompt.pending.type ||
                    action.type === searchContentPrompt.fulfilled.type ||
                    action.type === searchContentPrompt.rejected.type||
                    action.type === deleteContentPrompt.pending.type ||
                    action.type === deleteContentPrompt.fulfilled.type ||
                    action.type === deleteContentPrompt.rejected.type,
                handleLoading
            )
            .addMatcher(
                (action) =>
                    action.type === triggerContentPrompt.pending.type ||
                    action.type === triggerContentPrompt.fulfilled.type ||
                    action.type === triggerContentPrompt.rejected.type ||
                    action.type === triggerDocumentChat.pending.type ||
                    action.type === triggerDocumentChat.fulfilled.type ||
                    action.type === triggerDocumentChat.rejected.type||
                    action.type === triggerContentLinkGraph.pending.type ||
                    action.type === triggerContentLinkGraph.fulfilled.type ||
                    action.type === triggerContentLinkGraph.rejected.type||
                    action.type === triggerContentAttachmentGraph.pending.type ||
                    action.type === triggerContentAttachmentGraph.fulfilled.type ||
                    action.type === triggerContentAttachmentGraph.rejected.type,
                handlefrruitLoading
            )

    }
});

export const { setChatHistory, clearContentChatHistory, clearAttactmentUrl, setCancelTokens } = contentGPTSlice.actions;
export default contentGPTSlice.reducer;
