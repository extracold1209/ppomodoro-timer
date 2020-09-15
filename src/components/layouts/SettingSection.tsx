import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import TabList from '../atoms/TabList';
import {Box, Button, Card} from 'rebass';
import {Checkbox, Input, Label} from '@rebass/forms';
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

const TabViewCard = styled(Card)`
    margin: 8px 0 16px;
`;

const InlineLabel = styled(Label)`
    display: inline; // css 적용 순서상 component property 가 먹지 않음
`;

const TimeSettingInput: React.FC<{ name: string; suffix?: string; value: number, onChange?: (e: ChangeEvent<HTMLInputElement>) => void }> = (
    {name, value, suffix, onChange}
) => (
    <Box
        marginBottom={1}
    >
        <InlineLabel
            htmlFor={`${name}-input`}
            paddingBottom={2}
            paddingRight={2}
        >{name}</InlineLabel>
        <Input
            id={`${name}-input`}
            type='number'
            min={1}
            value={value}
            onChange={onChange}
            paddingRight={1}
            marginRight={2}
            width={'fit-content'}
            display={'inline-block'}
        />
        <span>{suffix}</span>
    </Box>
);

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

    const handleInputChange = useCallback((type: 'WORK' | 'REST' | 'TOMATO_COUNT') => (e: ChangeEvent<HTMLInputElement>) => {
        const nextValue = parseInt(e.target.value);

        if (Number.isNaN(nextValue) || nextValue <= 0) {
            return;
        }
        switch (type) {
            case 'WORK':
                dispatch(changeInitialWorkTime(nextValue * 60));
                break;
            case 'REST':
                dispatch(changeInitialRestTime(nextValue * 60));
                break;
            case 'TOMATO_COUNT':
                dispatch(changeMaxTomatoCount(nextValue));
                break;
        }
    }, []);


    return (
        <TabViewCard>
            <TimeSettingInput
                name='집중시간'
                value={workTime}
                onChange={handleInputChange('WORK')}
                suffix='분'
            />
            <TimeSettingInput
                name='휴식시간'
                value={restTime}
                onChange={handleInputChange('REST')}
                suffix='분'
            />
            <TimeSettingInput
                name='반복횟수'
                value={tomatoCount}
                onChange={handleInputChange('TOMATO_COUNT')}
                suffix='번'
            />
            <Box marginTop={3}>
                <Button
                    marginRight={2}
                >
                    적용
                </Button>
                <Button
                    variant={'secondary'}
                >
                    취소
                </Button>
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
            <Box marginTop={3}>
                <Button
                    marginRight={2}
                >
                    적용
                </Button>
                <Button
                    variant={'secondary'}
                >
                    취소
                </Button>
            </Box>
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
