import {createAction, createReducer} from '@reduxjs/toolkit';

export interface CommonReducer {
    count: number;
}

const sayHelloAction = createAction('common/SAY_HELLO');
const sayByeAction = createAction('common/SAY_BYE');

const defaultState: CommonReducer = {
    count: 1,
};

export default createReducer(defaultState, {
    [sayHelloAction.type]: (state) => {
        state.count += 1;
    },
    [sayByeAction.type]: (state) => {
        state.count -= 1;
    },
});
