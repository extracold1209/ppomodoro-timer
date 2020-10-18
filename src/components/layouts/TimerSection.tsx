import React, {useCallback, useMemo} from 'react';
import styled from '@emotion/styled';
import Card from '../atoms/Card';
import PressButton from '../atoms/PressButton';
import {DefaultTheme} from '../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../stores';
import {stopTimer, startTimer, selectTimer, TimerMap} from '../../stores/timer';
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

const CardCenterMargin = styled.div`
    margin: auto;
    padding: 0 8px;
`;

const TimerContainer = styled.div<{ theme: DefaultTheme }>`
    user-select: none;
    font-family: Concert One, ArialRounded, cursive;
    font-size: 100px;
    color: white;
`;

const currentTimerSelector = createSelector<RootState, number, { minute: string, second: string }>(
    (state) => state.timer.timers[state.timer.selectedTimer].currentTime,
    (initialTime) => {
        const minute = Math.floor(initialTime / 60);
        const second = initialTime % 60;

        return {
            minute: (minute < 10) ? '0' + minute : minute + '',
            second: (second < 10) ? '0' + second : second + '',
        };
    }
);

const buttonStates = {
    START: '시작',
    STOP: '정지',
};

const TimerSection: React.FC = () => {
    const {minute, second} = useSelector(currentTimerSelector);
    const timerIdsList = useSelector<RootState, string[]>((state) => state.timer.timerIds);
    const timers = useSelector<RootState, TimerMap>((state) => state.timer.timers);
    const selectedTimer = useSelector<RootState, string>((state) => state.timer.selectedTimer);

    const timerStatus = useSelector<RootState>((state) => state.timer.status);
    const dispatch = useDispatch();

    const [selectedTimerName, timerNameList] = useMemo(
        () => {
            return [
                timers[selectedTimer].timerName,
                timerIdsList.map((id) => timers[id].timerName)
            ];
        },
        [selectedTimer, timerIdsList, timers]
    );

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

    const handleOnChangeTimer = useCallback((selectedTimerName: string) => {
        const selectedTimer = Object.values(timers).find((timer) => timer.timerName === selectedTimerName);
        if (selectedTimer) {
            dispatch(stopTimer());
            dispatch(selectTimer(selectedTimer.id));
        }
    }, [timerNameList]);

    return (
        <CardCenterMargin>
            <CardContainer>
                <RadioButtons
                    selected={selectedTimerName}
                    values={timerNameList}
                    onChange={handleOnChangeTimer}
                />
                <TimerContainer>
                    {minute}:{second}
                </TimerContainer>
                <PressButton
                    value={buttonValue}
                    onClick={handleOnClick}
                />
            </CardContainer>
        </CardCenterMargin>
    );
};

export default TimerSection;
