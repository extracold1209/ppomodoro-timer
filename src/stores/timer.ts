import {makePayloadAction} from './functions';
import {Reducer} from 'redux';
import {produce} from 'immer';

export enum TimerStatusEnum {
    STOPPED,
    RUNNING
}

// interfaces
export interface TimerReducer {
    currentSelectedTimerIndex: number;
    timers: Timer[];
    status: TimerStatusEnum;
}

// types
const ADDED = 'TIMER/ADDED';
const REMOVED = 'TIMER/REMOVED';
const STATUS_CHANGED = 'TIMER/STATUS_CHANGED';
const TIMER_SELECTED = 'TIMER/TIMER_SELECTED';

// actions
export const addTimer = makePayloadAction<Timer>(ADDED);
export const removeTimer = makePayloadAction<number>(REMOVED); // Timer[] 의 index 가 들어가야 한다.
export const changeTimerStatus = makePayloadAction<TimerStatusEnum>(STATUS_CHANGED);
export const selectTimerIndex = makePayloadAction<number>(TIMER_SELECTED);

// defaultState
const defaultState: TimerReducer = {
    currentSelectedTimerIndex: 0,
    timers: [
        {title: '더미따리1', initialSecond: 10},
        {title: '더미따리2', initialSecond: 15},
        {title: '더미따리3', initialSecond: 20},
        {title: '더미따리4', initialSecond: 25},
    ],
    status: TimerStatusEnum.STOPPED,
};

// reducer
const reducer: Reducer<TimerReducer> = (state = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ADDED:
            return produce(state, (next) => {
                next.timers = [...state.timers, payload as Timer];
            });
        case REMOVED:
            return produce(state, (next) => {
                next.timers = state.timers.splice(payload as number, 1);
            });
        case STATUS_CHANGED:
            return produce(state, (next) => {
                next.status = payload as TimerStatusEnum;
            });
        case TIMER_SELECTED:
            return produce(state, (next) => {
                next.currentSelectedTimerIndex = payload as number;
            });
        default:
            return state;
    }
};

export default reducer;
