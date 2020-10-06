import React, {useCallback, useMemo} from 'react';
import styled from '@emotion/styled';
import Card from '../atoms/Card';
import LongPressDesignButton from '../atoms/LongPressDesignButton';
import {DefaultTheme} from '../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../stores';
import {Timer, stopTimer, startTimer, NewTimerReducer, selectTimer} from '../../stores/newTimer';
import RadioButtons from '../atoms/RadioButtons';
import {TimerStatus} from '../../stores/timer';

const CardContainer = styled(Card)`
    text-align: center;
    margin: auto;
    max-width: 480px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
    border-radius: 8px;
    border: none;
`;

const TimerContainer = styled.div<{ theme: DefaultTheme }>`
    user-select: none;
    font-family: Concert One, ArialRounded, cursive;
    font-size: 100px;
    color: white;
`;

const timerTextReSelector = createSelector<RootState, Timer, { minute: string, second: string }>(
    (state) => state.newTimer.selectedTimer,
    (timer) => {
        const minute = Math.floor(timer.currentTime / 60);
        const second = timer.currentTime % 60;

        return {
            minute: (minute < 10) ? '0' + minute : minute + '',
            second: (second < 10) ? '0' + second : second + '',
        };
    },
);

const timerReSelector = createSelector<RootState, NewTimerReducer, [string[], string]>(
    (state) => state.newTimer,
    (reducer) => ([
        reducer.timers.map((timer) => timer.timerName),
        reducer.selectedTimer.timerName,
    ]),
);

const buttonStates = {
    START: '시작',
    STOP: '정지',
};

const NewTimerSection: React.FC = () => {
    const {minute, second} = useSelector(timerTextReSelector);
    const [timers, selected] = useSelector(timerReSelector);
    const timerStatus = useSelector<RootState>((state) => state.newTimer.status);
    const dispatch = useDispatch();

    const buttonValue = useMemo(() => {
        if (timerStatus === TimerStatus.STOPPED) {
            return buttonStates.START;
        } else {
            return buttonStates.STOP;
        }
    }, [timerStatus]);

    const handleOnClick = useCallback(() => {
        if (buttonValue === buttonStates.START) {
            dispatch(startTimer());
        } else {
            dispatch(stopTimer());
        }
    }, [buttonValue]);

    const handleOnChangeTimer = useCallback((e: string) => {
        dispatch(stopTimer());
        dispatch(selectTimer(e));
    }, [timers]);

    return (
        <CardContainer>
            <RadioButtons
                selected={selected}
                values={timers}
                onChange={handleOnChangeTimer}
            />
            <TimerContainer>
                {minute}:{second}
            </TimerContainer>
            <LongPressDesignButton
                value={buttonValue}
                onClick={handleOnClick}
            />
        </CardContainer>
    );
};

export default NewTimerSection;
