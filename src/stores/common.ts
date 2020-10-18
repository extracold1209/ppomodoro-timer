import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';

export interface CommonReducer {
    autoNext: boolean;
}

export const changeAutoNext = createAction<boolean>('COMMON/AUTO_NEXT');

const defaultState: CommonReducer = {
    autoNext: true,
};

export default createReducer(defaultState, {
    [changeAutoNext.type]: (state, {payload}: PayloadAction<boolean>) => {
        state.autoNext = payload;
    },
});
