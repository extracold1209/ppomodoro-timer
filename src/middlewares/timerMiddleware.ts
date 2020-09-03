import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {PayloadAction} from '@reduxjs/toolkit';
import {endTimer, resetTimer, startTimer, suspendTimer, tick, TimerType} from '../stores/timer';
import AudioController from '../utils/AudioController';
import {RootState} from '../stores';

/*
- remainTime 이 0 이 된 경우 (WORK, RUNNING)
1. 소리 재생
2. 틱 정지
3. RUNNING 에서 STOPPED 로 변경 / WORK 에서 REST 로 변경
 */

const audioController = new AudioController('/public/sounds/');
let tickInterval: number | undefined;
const TimerMiddleware: Middleware = ({dispatch, getState}: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: PayloadAction) => {
    const rootState = getState();
    const timerState = rootState.timer;

    // check audio exist
    if (!audioController.include(timerState.workTimeSound)) {
        audioController.load(timerState.workTimeSound);
    }
    if (!audioController.include(timerState.restTimeSound)) {
        audioController.load(timerState.restTimeSound);
    }

    // tick start
    if (action.type === startTimer.type && !tickInterval) {
        tickInterval = setInterval(() => {
            tickInterval && dispatch(tick());
        }, 1000);
    }

    // suspend tick
    if (([suspendTimer.type, resetTimer.type] as string[]).includes(action.type) && tickInterval) {
        clearInterval(tickInterval);
        tickInterval = undefined;
    }

    // if remainTime is 0
    if (timerState.remainTime === 1) {
        if (timerState.currentTimerType === TimerType.WORK) {
            await audioController.play(timerState.workTimeSound);
        } else {
            await audioController.play(timerState.restTimeSound);
        }
    } else if (timerState.remainTime === 0) {
        clearInterval(tickInterval);
        tickInterval = undefined;
        next(endTimer());
    }

    next(action);
};

export default TimerMiddleware;

