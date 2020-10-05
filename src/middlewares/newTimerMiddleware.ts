import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {RootState} from '../stores';
import {PayloadAction} from '@reduxjs/toolkit';
import {startTimer, stopTimer, tick} from '../stores/newTimer';

let tickInterval: number;
let pendingTimeout: number;

const TimerMiddleware: Middleware = ({dispatch, getState}: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: PayloadAction) => {
    let lockNextAction = false;

    if (action.type === startTimer.type) {
        tickInterval = setInterval(() => {
            dispatch(tick());
        }, 1000);
    }

    if (action.type === stopTimer.type) {
        clearTimeout(tickInterval);
    }

    !lockNextAction && next(action);
};

export default TimerMiddleware;
