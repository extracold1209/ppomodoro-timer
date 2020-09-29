import React, {useCallback, useEffect, useMemo, useState} from 'react';
import TabList from '../atoms/TabList';
import {Box, Card} from 'rebass';
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
import CustomNumberInput from '../atoms/CustomNumberInput';

const TabViewCard = styled(Card)`
    margin: 8px 0 16px;
`;

const workTimeReSelector = createSelector<RootState, number, number>(
    (state) => state.timer.initialWorkTime,
    (workTimeSecond) => Math.floor(workTimeSecond)
);

const restTimeReSelector = createSelector<RootState, number, number>(
    (state) => state.timer.initialRestTime,
    (workTimeSecond) => Math.floor(workTimeSecond)
);

const MinuteSecondInput: React.FC<{ value: number, onChange: (nextSecond: number) => void }> = (props) => {
    const {value, onChange} = props;
    const [minute, second] = useMemo(() => {
        return [
            Math.floor(value / 60),
            Math.floor(value % 60),
        ];
    }, [value]);

    const handleOnMinuteChanged = useCallback((e: number) => {
        onChange(e * 60 + second);
    }, [value]);

    const handleOnSecondChanged = useCallback((e: number) => {
        onChange(minute * 60 + e);
    }, [value]);

    return (
        <>
            <CustomNumberInput
                label={'집중시간'}
                value={minute}
                onChange={handleOnMinuteChanged}
                suffix={'분'}
            />
            <Box mr={2} as={'span'}/>
            <CustomNumberInput
                value={second}
                onChange={handleOnSecondChanged}
                suffix={'초'}
            />
        </>
    );
};

const TimeSetting: React.FC = () => {
    const dispatch = useDispatch();
    const workTime = useSelector(workTimeReSelector);
    const restTime = useSelector(restTimeReSelector);
    const tomatoCount = useSelector<RootState, number>((state) => state.timer.maxTomatoCount);

    const handleInputChange = useCallback((type: 'WORK' | 'REST' | 'TOMATO_COUNT') => (nextValue: number) => {
        switch (type) {
            case 'WORK':
                dispatch(changeInitialWorkTime(nextValue));
                break;
            case 'REST':
                dispatch(changeInitialRestTime(nextValue));
                break;
            case 'TOMATO_COUNT':
                dispatch(changeMaxTomatoCount(nextValue));
                break;
        }
    }, []);

    return (
        <TabViewCard>
            <Box marginBottom={1}>
                <MinuteSecondInput
                    value={workTime}
                    onChange={handleInputChange('WORK')}
                />
            </Box>
            <Box marginBottom={1}>
                <MinuteSecondInput
                    value={restTime}
                    onChange={handleInputChange('REST')}
                />
            </Box>
            <Box marginBottom={1}>
                <CustomNumberInput
                    label='반복횟수'
                    value={tomatoCount}
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

    useEffect(() => {
        setShowingTab(undefined);
    }, [currentTimerStatus]);

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
