import React, {useCallback} from 'react';
import styled from '@emotion/styled';
import Card from '../atoms/Card';
import ToggleButton from '../atoms/ToggleButton';
import {DefaultTheme} from '../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../stores';
import {Timer, stopTimer, startTimer, NewTimerReducer, selectTimer} from '../../stores/newTimer';
import RadioButtons from "../atoms/RadioButtons";

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

const timerReSelector = createSelector<RootState, NewTimerReducer,[string[], string]>(
    (state) => state.newTimer,
    (reducer) => ([
        reducer.timers.map((timer) => timer.timerName),
        reducer.selectedTimer.timerName,
    ]),
);

const NewTimerSection: React.FC = () => {
    const {minute, second} = useSelector(timerTextReSelector);
    const [timers, selected] = useSelector(timerReSelector);
    const dispatch = useDispatch();

    const handleOnClick = useCallback((nextFlag: boolean) => {
        if (!nextFlag) {
            dispatch(startTimer());
        } else {
            dispatch(stopTimer());
        }
    }, []);

    const handleOnChangeTimer = useCallback((e: string) => {
        dispatch(selectTimer(e));
    }, [timers]);

    return (
        <CardContainer>
            <RadioButtons
                defaultSelected={selected}
                values={timers}
                onChange={handleOnChangeTimer}
            />
            <TimerContainer>
                {minute}:{second}
            </TimerContainer>
            <ToggleButton
                trueValue={'시작'}
                falseValue={'정지'}
                onClick={handleOnClick}
            />
        </CardContainer>
    );
};

export default NewTimerSection;
