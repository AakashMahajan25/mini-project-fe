import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";


const initialState = {
    userName: '',
    isLoading: false,
    error: null
};

export const loginOtp = createAsyncThunk("login/loginOtp", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.login,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error.response.data.message;
    }
});

export const verifyLoginOtp = createAsyncThunk("login/verifyLoginOtp", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.verifyLogin,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error.response.data.message;
    }
});


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload
        },
    },
    extraReducers: (builder) => {
        const handleLoading = (state, action) => {
            state.isLoading = action.meta.requestStatus === 'pending';
        };

        builder
            .addMatcher(
                (action) =>
                    action.type === loginOtp.pending.type ||
                    action.type === loginOtp.fulfilled.type ||
                    action.type === loginOtp.rejected.type ||
                    action.type === verifyLoginOtp.pending.type ||
                    action.type === verifyLoginOtp.fulfilled.type ||
                    action.type === verifyLoginOtp.rejected.type ,
                    // action.type === getCompanyList.pending.type ||
                    // action.type === getCompanyList.fulfilled.type ||
                    // action.type === getCompanyList.rejected.type ||
                    // action.type === registration.pending.type ||
                    // action.type === registration.fulfilled.type ||
                    // action.type === registration.rejected.type,
                handleLoading
            );
    }

});

export const { setUserName } = loginSlice.actions;
export default loginSlice.reducer;