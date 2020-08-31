import React, {useMemo} from 'react';
import {Box, Card, Flex} from 'rebass';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../stores';
import {useSelector} from 'react-redux';
import {TimerType} from '../../stores/timer';

const timerTextReSelector = createSelector<RootState, number, { minute: number, second: number }>(
    (state) => state.timer.remainTime,
    (time) => ({
        minute: Math.floor(time / 60),
        second: time % 60,
    }),
);

const timerTypeReSelector = createSelector<RootState, TimerType, string>(
    (state) => state.timer.currentTimerType,
    (currentType) => {
        if (currentType === TimerType.WORK) {
            return '집중시간';
        } else if (currentType === TimerType.REST) {
            return '휴식시간';
        } else {
            return '환상의 똥꼬쑈 타임';
        }
    }
);

const TimerSection: React.FC = () => {
    const {minute, second} = useSelector(timerTextReSelector);
    const timerTypeText = useSelector(timerTypeReSelector);
    const currentTomato = useSelector<RootState, number>((state) => state.timer.currentTomatoCount);
    const maxTomato = useSelector<RootState, number>((state) => state.timer.maxTomatoCount);

    const tomatoCountNotiText = useMemo(() => {
        if (currentTomato === 0) {
            return '';
        } else if (currentTomato === maxTomato) {
            return '마지막 뽀모도로 !!';
        } else {
            return `${currentTomato} / ${maxTomato} 번째 뽀모도로..`;
        }
    }, [currentTomato, maxTomato]);

    return (
        <Card>
            <Box
                padding={2}
                color={'grey'}
                fontSize={1}
            >
                {tomatoCountNotiText}
            </Box>
            <Flex
                padding={4}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
            >
                <Flex
                    fontSize={3}
                >
                    지금은 {timerTypeText} !
                </Flex>
                <Flex
                    fontSize={6}
                >
                    {minute}분 {second}초
                </Flex>
            </Flex>
        </Card>
    );
};

export default TimerSection;
