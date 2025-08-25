import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";


const initialState = {
    activePlanList: [],
    userDetails: null,
    userPlan: null,
    userTopics: null,
    userCredits: null,
    faqs : null,
    orderHistory: null,
    isLoading: false,
    error: null,
    paymentLoader: false
};

export const getUserDetails = createAsyncThunk("users/getUserDetails", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getUserDetails,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const updateProfile = createAsyncThunk("users/updateProfile", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.updateProfile,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error.response;
    }
});

export const getUserPlan = createAsyncThunk("users/getUserActivePlan", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getUserActivePlan,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getUserTopics = createAsyncThunk("users/getUserTopics", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.userTopics
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const updateUserTopics = createAsyncThunk("users/updateUserTopics", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.updateTopics,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error.response;
    }
});

export const getAvaliableCredit = createAsyncThunk("users/getAvaliableCredit", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getAvailableCredits,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getAllActivePlans = createAsyncThunk("users/getAllActivePlans", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getPlans,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const getFaqs = createAsyncThunk("users/getFaqs", async () => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getFaqs,
        };
        const response = await api(data);
        return response.data.result;

    } catch (error) {
        throw error.response;
    }
});

export const initiateOrder = createAsyncThunk("users/initiateOrder", async (payload) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.initiateOrder,
            data : payload
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response.data;
    }
});

export const placeOrder = createAsyncThunk("users/placeOrder", async (payload) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.placeOrder,
            data : payload
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response.data;
    }
});

export const getUserOrderHistory = createAsyncThunk("users/getUserOrderHistory", async (params) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getOrderHistory+params,
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response;
    }
});

export const userFeedback = createAsyncThunk("users/userFeedback", async (payload) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.userFeedback,
            data : payload
        };
        const response = await api(data);
        return response.data.data;

    } catch (error) {
        throw error.response.data;
    }
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };
        const paymentLoading = (state, action) => {
            state.paymentLoader = action.meta.requestStatus === 'pending';
        };

        builder
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.userDetails = action.payload;
            })
            .addCase(getUserPlan.fulfilled, (state, action) => {
                state.userPlan = action.payload;
            })
            .addCase(getUserTopics.fulfilled, (state, action) => {
                state.userTopics = action.payload;
            })
            .addCase(getAvaliableCredit.fulfilled, (state, action) => {
                state.userCredits = action.payload;
            })
            .addCase(getAllActivePlans.fulfilled, (state, action) => {
                state.activePlanList = action.payload;
            })
            .addCase(getFaqs.fulfilled, (state, action) => {
                state.faqs = action.payload;
            })
            .addCase(getUserOrderHistory.fulfilled, (state, action) => {
                state.orderHistory = action.payload;
            })
            .addMatcher(
                (action) =>
                    action.type === getUserDetails.pending.type ||
                    action.type === getUserDetails.fulfilled.type ||
                    action.type === getUserDetails.rejected.type ||
                    action.type === updateProfile.pending.type ||
                    action.type === updateProfile.fulfilled.type ||
                    action.type === updateProfile.rejected.type ||
                    action.type === getUserPlan.pending.type ||
                    action.type === getUserPlan.fulfilled.type ||
                    action.type === getUserPlan.rejected.type ||
                    action.type === updateUserTopics.pending.type ||
                    action.type === updateUserTopics.fulfilled.type ||
                    action.type === updateUserTopics.rejected.type ||
                    action.type === getUserTopics.pending.type ||
                    action.type === getUserTopics.fulfilled.type ||
                    action.type === getUserTopics.rejected.type ||
                    action.type === getAllActivePlans.pending.type ||
                    action.type === getAllActivePlans.rejected.type ||
                    action.type === getAllActivePlans.fulfilled.type ||
                    action.type === getFaqs.rejected.type ||
                    action.type === getFaqs.pending.type ||
                    action.type === getFaqs.fulfilled.type ||
                    action.type === initiateOrder.rejected.type ||
                    action.type === initiateOrder.pending.type ||
                    action.type === initiateOrder.fulfilled.type ||
                    action.type === getUserOrderHistory.rejected.type ||
                    action.type === getUserOrderHistory.pending.type ||
                    action.type === getUserOrderHistory.fulfilled.type||
                    action.type === userFeedback.rejected.type ||
                    action.type === userFeedback.pending.type ||
                    action.type === userFeedback.fulfilled.type,
                handleLoading
            )
            .addMatcher(
                (action) =>
                    action.type === placeOrder.rejected.type ||
                    action.type === placeOrder.pending.type ||
                    action.type === placeOrder.fulfilled.type,
                paymentLoading
            )
    }

});

export const { } = userSlice.actions;
export default userSlice.reducer;