import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {RootState} from '../stores';
import {PayloadAction} from '@reduxjs/toolkit';
import {nextTimer, startTimer, stopTimer, tick} from '../stores/newTimer';
import AudioController from '../utils/AudioController';

let tickInterval: number;
let pendingTimeout: number;
const audioController = new AudioController('/sounds/');

audioController.load('tadya.mp3');

const TimerMiddleware: Middleware = ({dispatch, getState}: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: PayloadAction) => {
    let lockNextAction = false;
    const timerState = getState().newTimer;

    if (action.type === startTimer.type) {
        audioController.pause();
        tickInterval = setInterval(() => {
            dispatch(tick());
        }, 1000);
    }

    if (action.type === stopTimer.type) {
        clearTimeout(tickInterval);
    }

    if (action.type === tick.type && timerState.timers[timerState.selectedTimer].currentTime === 1) {
        lockNextAction = true;
        next(action);
        await audioController.play('tadya.mp3');
        dispatch(stopTimer());
        dispatch(nextTimer());
    }

    !lockNextAction && next(action);
};

export default TimerMiddleware;
