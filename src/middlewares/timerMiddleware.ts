import {Middleware} from 'redux';
import {PayloadAction} from '@reduxjs/toolkit';
import {endTimer, resetTimer, startTimer, suspendTimer, tick} from '../stores/timer';
import {RootState} from '../stores';

/*
- remainTime 이 0 이 된 경우 (WORK, RUNNING)
1. 소리 재생
2. 틱 정지
3. RUNNING 에서 STOPPED 로 변경 / WORK 에서 REST 로 변경
 */

let tickInterval: number | undefined;
const TimerMiddleware: Middleware<never, RootState> = ({dispatch, getState}) => (next) => (action: PayloadAction) => {
    // tick start
    if (action.type === startTimer.type) {
        tickInterval = setInterval(() => {
            dispatch(tick());
        }, 1000);
    }

    // suspend tick
    if (([
        suspendTimer.type,
        endTimer.type,
        resetTimer.type,
    ] as string[]).includes(action.type) && tickInterval) {
        clearInterval(tickInterval);
        tickInterval = undefined;
    }

    next(action);
};

export default TimerMiddleware;

