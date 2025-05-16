import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState } from '../../types/AuthState';

const initialState: AuthState = {
    token: null,
    userId: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAuth: (state, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token
            state.userId = action.payload.userId
        },
        logoutAuth: (state) => {
            state.token = null
            state.userId = null
        }
    }
})

const authReducer = authSlice.reducer

export const { loginAuth, logoutAuth } = authSlice.actions
export default authReducer