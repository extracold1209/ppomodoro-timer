import {makePayloadAction} from './functions';
import {Reducer} from 'redux';
import {produce} from 'immer';

// interfaces
export interface TimerReducer {
    timers: Timer[];
}

// types
const ADDED = 'TIMER/ADDED';
const REMOVED = 'TIMER/REMOVED';

// actions
export const addTimer = makePayloadAction<Timer>(ADDED);
export const removeTimer = makePayloadAction<number>(REMOVED); // Timer[] 의 index 가 들어가야 한다.

// defaultState
const defaultState: TimerReducer = {
    timers: [
        {title: '더미따리1', initialSecond: 10},
        {title: '더미따리2', initialSecond: 15},
        {title: '더미따리3', initialSecond: 20},
        {title: '더미따리4', initialSecond: 25},
    ]
};

// reducer
const reducer: Reducer<TimerReducer> = (state = defaultState, action) => {
    const {type, payload} = action;
    switch(type) {
        case ADDED:
            return produce(state, (next) => {
                next.timers = [...state.timers, payload as Timer];
            });
        case REMOVED:
            return produce(state, (next) => {
                next.timers = state.timers.splice(payload as number, 1);
            });
        default:
            return state;
    }
};

export default reducer;
