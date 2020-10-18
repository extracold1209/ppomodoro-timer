import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {RootState} from '../stores';
import {PayloadAction} from '@reduxjs/toolkit';
import {changeTimerInitialTime, nextTimer, startTimer, stopTimer, tick} from '../stores/timer';
import AudioController from '../utils/AudioController';

let tickInterval: number;
let pendingTimeout: number;
const audioController = new AudioController('/sounds/');

audioController.load('tadya.mp3');

const TimerMiddleware: Middleware = ({dispatch, getState}: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: PayloadAction) => {
    let lockNextAction = false;
    const rootState = getState();
    const {timer: timerState, common: commonState} = rootState;

    const isLastTick = function () {
        return timerState.timers[timerState.selectedTimer].currentTime <= 1;
    };


    if (action.type === startTimer.type) {
        audioController.pause();
        if (isLastTick()) {
            dispatch(nextTimer());
        }

        tickInterval = setInterval(() => {
            dispatch(tick());
        }, 1000);
    }

    if (action.type === stopTimer.type ||
        action.type === changeTimerInitialTime.type) {
        tickInterval && clearTimeout(tickInterval);
    }

    if (action.type === tick.type && isLastTick()) {
        lockNextAction = true;
        next(action);
        await audioController.play('tadya.mp3');

        dispatch(nextTimer());
        if (!commonState.autoNext) {
            dispatch(stopTimer());
        }
    }

    !lockNextAction && next(action);
};

export default TimerMiddleware;
