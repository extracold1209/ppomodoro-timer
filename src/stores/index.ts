import {combineReducers, createStore} from 'redux';
import common, {CommonReducer} from './common';
import timer, {TimerReducer} from './timer';

export interface ReduxStore {
    common: CommonReducer;
    timer : TimerReducer;
}


export default createStore(combineReducers<ReduxStore>({
    common,
    timer,
}));
