import React, {useCallback} from 'react';
import styled from '@emotion/styled';
import Card from '../atoms/Card';
import ToggleButton from '../atoms/ToggleButton';
import {DefaultTheme} from '../../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../stores';
import {endTimer, startTimer} from '../../stores/timer';

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

const timerTextReSelector = createSelector<RootState, number, { minute: string, second: string }>(
    (state) => state.timer.remainTime,
    (time) => {
        const minute = Math.floor(time / 60);
        const second = time % 60;

        return {
            minute: (minute < 10) ? '0' + minute : minute + '',
            second: (second < 10) ? '0' + second : second + '',
        };
    },
);

const NewTimerSection: React.FC = () => {
    const {minute, second} = useSelector(timerTextReSelector);
    const dispatch = useDispatch();

    const handleOnClick = useCallback((nextFlag: boolean) => {
        if (!nextFlag) {
            dispatch(startTimer());
        } else {
            dispatch(endTimer());
        }
    }, []);

    return (
        <CardContainer>
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
