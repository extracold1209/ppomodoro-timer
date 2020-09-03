import React, {useCallback, useMemo} from 'react';
import {Button, Flex} from 'rebass';
import {endTimer, resetTimer, startTimer, suspendTimer, TimerStatus, TimerType} from '../../stores/timer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores';
import styled from '@emotion/styled';

const NoFocusButton = styled(Button)`
    &:focus {
        outline: none;
    }
`;

const TimerControlSection: React.FC = () => {
    const timerStatus = useSelector<RootState, TimerStatus>((state) => state.timer.status);
    const currentTimerType = useSelector<RootState, TimerType>((state) => state.timer.currentTimerType);
    const currentTomatoCount = useSelector<RootState, number>((state) => state.timer.currentTomatoCount);
    const maxTomatoCount = useSelector<RootState, number>((state) => state.timer.maxTomatoCount);
    const dispatch = useDispatch();

    const handleButtonClicked = useCallback((buttonType: 'START' | 'STOP' | 'RESET' | 'PENDING') => () => {
        if (buttonType === 'START') {
            dispatch(startTimer());
        } else if (buttonType === 'STOP') {
            dispatch(suspendTimer());
        } else if (buttonType === 'RESET') {
            dispatch(resetTimer());
        } else if (buttonType === 'PENDING') {
            dispatch(endTimer());
        }
    }, []);

    const startButtonVariant = useMemo(() => {
        if (currentTimerType === TimerType.WORK) {
            return 'primary';
        } else if (currentTimerType === TimerType.REST) {
            return 'secondary';
        } else {
            throw new Error();
        }
    }, [currentTimerType]);

    const buttonList = useMemo(() => {
        if (timerStatus === TimerStatus.STOPPED) {
            return (
                <>
                    {
                        currentTomatoCount < maxTomatoCount &&
                        <NoFocusButton
                            variant={startButtonVariant}
                            onClick={handleButtonClicked('START')}
                            marginRight={currentTomatoCount > 0 ? 2 : 0}
                        >
                            시작
                        </NoFocusButton>
                    }
                    {
                        currentTomatoCount > 0 &&
                        <NoFocusButton variant='outline' onClick={handleButtonClicked('RESET')}>초기화</NoFocusButton>
                    }
                </>
            );
        } else if (timerStatus === TimerStatus.RUNNING) {
            return (
                <NoFocusButton
                    variant='secondary'
                    onClick={handleButtonClicked('STOP')}
                >
                    정지
                </NoFocusButton>
            );
        } else if (timerStatus === TimerStatus.PENDING) {
            return (
                <NoFocusButton
                    variant='secondary'
                    onClick={handleButtonClicked('PENDING')}
                >
                    다음
                </NoFocusButton>
            );
        }
    }, [timerStatus, currentTomatoCount, maxTomatoCount]);

    return (
        <Flex justifyContent='center'>
            {buttonList}
        </Flex>
    );
};

export default TimerControlSection;
