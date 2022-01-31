import {createReducer} from '@reduxjs/toolkit';
import { setTokenAndId } from './action';

const initState = {
    token: null,
    userId: null,
}

export const reducer = createReducer(initState, (builder) => {
    builder
        .addCase(setTokenAndId, (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        })
})