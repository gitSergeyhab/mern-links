import {createAction} from '@reduxjs/toolkit';


const ActionType = {
    SetTokenAndId: 'Auth/SetTokenAndId',
}

export const setTokenAndId = createAction(ActionType.SetTokenAndId, (data) => ({payload: data}))