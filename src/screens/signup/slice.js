import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";



const initialState = {
    topics: [],
    isLoading: false,
    error: null
};

export const signupOtp = createAsyncThunk("signUp/signupOtp", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.signupOtp,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response.data.message;
    }
});

export const verifyOtp = createAsyncThunk("signUp/verifyOtp", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.verifyOtp,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        console.log('error::::', error.response)

        throw error.response.data.message;
    }
});

export const signupUser = createAsyncThunk("signUp/signupUser", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.signup,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        console.log('error::::', error.response)

        throw error.response.data.message;
    }
});

export const getAllTopics = createAsyncThunk("signUp/getAllTopics", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getAllTopics,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response.data.message;
    }
});

export const addTopics = createAsyncThunk("signUp/addTopics", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.addTopics,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response.data.message;
    }
});

export const searchTopics = createAsyncThunk("signUp/searchTopics", async (search) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: `${API_ENDPOINTS.searchTopics}?keyword=${search}`,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        console.log('error::::', error.response)
        throw error.response.data.message;
    }
});


const signupSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };

        builder
            .addCase(getAllTopics.fulfilled, (state, action) => {
                state.topics = action.payload;
            })
            .addCase(searchTopics.fulfilled, (state, action) => {
                state.topics = action.payload;
            })
            .addMatcher(
                (action) =>
                    action.type === signupOtp.pending.type ||
                    action.type === signupOtp.fulfilled.type ||
                    action.type === signupOtp.rejected.type ||
                    action.type === verifyOtp.pending.type ||
                    action.type === verifyOtp.fulfilled.type ||
                    action.type === verifyOtp.rejected.type ||
                    action.type === getAllTopics.pending.type ||
                    action.type === getAllTopics.fulfilled.type ||
                    action.type === getAllTopics.rejected.type ||
                    action.type === addTopics.pending.type ||
                    action.type === addTopics.fulfilled.type ||
                    action.type === addTopics.rejected.type ||
                    action.type === searchTopics.pending.type ||
                    action.type === searchTopics.fulfilled.type ||
                    action.type === searchTopics.rejected.type,
                handleLoading
            );
    }

});

export const { } = signupSlice.actions;
export default signupSlice.reducer;