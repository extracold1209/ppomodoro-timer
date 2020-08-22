/*

무엇이 필요한가?

- 시작버튼을 누르면 현재 설정된 타이머가 진행되어야 한다
- 정지버튼을 누르면 현재 설정된 타이머가 멈춰야 한다.
- 리셋버튼을 누르면 모든 타이머가 초기화 되고, 인덱스가 0 으로 돌아가야 한다

- 타이머 리스트를 보여줄 수 있어야 한다
- 타이머의 분초가 변경될때마다 해당 컴포넌트가 렌더될 수 있어야 한다

reducer
- 타이머리스트
- 타이머 상태 변경(인덱스, 상태)
- 타이머 추가
- 타이머 삭제
- 타이머 순서 변경(예정)

 */

import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';

export interface TimerReducer {
    timers: Timer[];
    currentSelectedTimerIndex: number;
}

export const addTimer = createAction<Timer>('TIMER/ADDED');
export const removeTimer = createAction<number>('TIMER/REMOVED');
export const selectTimer = createAction<number>('TIMER/SELECTED');
export const changeTimerOrder = createAction<[number, number]>('TIMER/CHANGE_ORDER');
export const selectTimerIndex = createAction<number>('TIMER/TIMER_SELECTED');

const defaultState: TimerReducer = {
    currentSelectedTimerIndex: 0,
    timers: [
        {title: '더미따리1', initialSecond: 10},
        {title: '더미따리2', initialSecond: 15},
        {title: '더미따리3', initialSecond: 20},
        {title: '더미따리4', initialSecond: 25},
    ],
};

export default createReducer(defaultState, {
    [addTimer.type]: (state, {payload}: PayloadAction<Timer>) => {
        state.timers = [...state.timers, payload];
    },
    [removeTimer.type]: (state, {payload}: PayloadAction<number>) => {
        state.timers = state.timers.splice(payload, 1);
    },
    [selectTimerIndex.type]: (state, {payload}: PayloadAction<number>) => {
        state.currentSelectedTimerIndex = payload;
    }
});
