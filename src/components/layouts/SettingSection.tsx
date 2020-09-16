import React, {useCallback, useMemo, useState} from 'react';
import TabList from '../atoms/TabList';
import {Box, Button, Card} from 'rebass';
import {Checkbox, Label} from '@rebass/forms';
import styled from '@emotion/styled';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores';
import {
    changeInitialRestTime,
    changeInitialWorkTime,
    changeMaxTomatoCount,
    setAutoPlay,
    TimerStatus
} from '../../stores/timer';
import {createSelector} from '@reduxjs/toolkit';
import useEachRefresh from '../../hooks/useEachRefresh';
import SuffixInput from '../atoms/SuffixInput';

const TabViewCard = styled(Card)`
    margin: 8px 0 16px;
`;

const InlineLabel = styled(Label)`
    display: inline; // css 적용 순서상 component property 가 먹지 않음
`;

const getPureNumber = (src: number | string, defaultValue = 1): number => {
    if (typeof src === 'string') {
        return parseInt(src) || defaultValue;
    } else {
        return src;
    }
};

const workTimeReSelector = createSelector<RootState, number, number>(
    (state) => state.timer.initialWorkTime,
    (workTimeSecond) => Math.floor(workTimeSecond / 60)
);

const restTimeReSelector = createSelector<RootState, number, number>(
    (state) => state.timer.initialRestTime,
    (workTimeSecond) => Math.floor(workTimeSecond / 60)
);

const TimeSetting: React.FC = () => {
    const dispatch = useDispatch();
    const workTime = useSelector(workTimeReSelector);
    const restTime = useSelector(restTimeReSelector);
    const tomatoCount = useSelector<RootState, number>((state) => state.timer.maxTomatoCount);
    const [workTimeState, setWorkTimeState] = useState<number | string>(workTime);
    const [restTimeState, setRestTimeState] = useState<number | string>(restTime);
    const [tomatoCountState, setTomatoCountState] = useState<number | string>(tomatoCount);

    useEachRefresh(
        [workTime, workTimeState, setWorkTimeState],
        [restTime, restTimeState, setRestTimeState],
        [tomatoCount, tomatoCountState, setTomatoCountState],
    );

    const handleInputChange = useCallback((type: 'WORK' | 'REST' | 'TOMATO_COUNT') => (nextValue: number) => {
        switch (type) {
            case 'WORK':
                dispatch(changeInitialWorkTime(getPureNumber(nextValue * 60)));
                break;
            case 'REST':
                dispatch(changeInitialRestTime(getPureNumber(nextValue) * 60));
                break;
            case 'TOMATO_COUNT':
                dispatch(changeMaxTomatoCount(getPureNumber(nextValue)));
                break;
        }
    }, []);

    return (
        <TabViewCard>
            <Box marginBottom={1}>
                <SuffixInput
                    label={'집중시간'}
                    value={workTimeState}
                    onChange={handleInputChange('WORK')}
                    suffix={'분'}
                />
            </Box>
            <Box marginBottom={1}>
                <SuffixInput
                    label='휴식시간'
                    value={restTimeState}
                    onChange={handleInputChange('REST')}
                    suffix='분'
                />
            </Box>
            <Box marginBottom={1}>
                <SuffixInput
                    label='반복횟수'
                    value={tomatoCountState}
                    onChange={handleInputChange('TOMATO_COUNT')}
                    suffix='번'
                />
            </Box>
        </TabViewCard>
    );
};

const CommonSetting: React.FC = () => {
    const autoPlayChecked = useSelector<RootState, boolean>((state) => state.timer.autoPlay);
    const dispatch = useDispatch();
    const toggleAutoPlay = useCallback(() => {
        dispatch(setAutoPlay(!autoPlayChecked));
    }, [autoPlayChecked]);

    return (
        <TabViewCard>
            <Label width={[1 / 2, 1 / 4]} p={2}>
                <Checkbox
                    checked={autoPlayChecked}
                    onChange={toggleAutoPlay}
                />
                자동시작
            </Label>
        </TabViewCard>
    );
};

const SettingSection: React.FC = () => {
    const [currentShowingTabName, setShowingTab] = useState<string | undefined>(undefined);
    const currentTimerStatus = useSelector<RootState, TimerStatus>((state) => state.timer.status);

    const handleTabSelected = useCallback((item: string, activated: boolean) => {
        setShowingTab(activated ? item : undefined);
    }, []);

    const CurrentTabView = useMemo(() => {
        switch (currentShowingTabName) {
            case '시간설정':
                return <TimeSetting/>;
            case '기타설정':
                return <CommonSetting/>;
            default:
                return <></>;
        }
    }, [currentShowingTabName]);

    return (
        <>
            <TabList
                listItems={['시간설정', '기타설정']}
                onClick={handleTabSelected}
                disabled={currentTimerStatus === TimerStatus.RUNNING}
            />
            {CurrentTabView}
        </>
    );
};

export default SettingSection;
