import React, {useCallback, useMemo} from 'react';
import {Button, Flex} from 'rebass';
import {resetTimer, startTimer, stopTimer, TimerStatus} from '../../stores/timer';
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
    const currentTomatoCount = useSelector<RootState, number>((state) => state.timer.currentTomatoCount);
    const dispatch = useDispatch();

    const handleButtonClicked = useCallback((buttonType: 'START' | 'STOP' | 'RESET') => () => {
        if (buttonType === 'START') {
            dispatch(startTimer());
        } else if (buttonType === 'STOP') {
            dispatch(stopTimer());
        } else if (buttonType === 'RESET') {
            dispatch(resetTimer());
        }
    }, []);

    const buttonList = useMemo(() => {
        if (timerStatus === TimerStatus.STOPPED) {
            return (
                <>
                    <NoFocusButton
                        variant='primary'
                        onClick={handleButtonClicked('START')}
                        marginRight={2}
                    >
                        시작
                    </NoFocusButton>
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
        }
    }, [timerStatus]);

    return (
        <Flex justifyContent='center'>
            {buttonList}
        </Flex>
    );
};

export default TimerControlSection;
