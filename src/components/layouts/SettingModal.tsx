import React, {useCallback, useMemo} from 'react';
import styled from '@emotion/styled';
import Switch from '../atoms/Switch';
import NumberInput from '../atoms/NumberInput';
import {BaseModalContainerProps} from '../../hooks/useModal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores';
import {changeTimerInitialTime, Timer, TimerMap} from '../../stores/timer';
import {createSelector} from '@reduxjs/toolkit';
import {changeAutoNext} from "../../stores/common";

const HEADER_HEIGHT = 52;
const FOOTER_HEIGHT = 52;

const Container = styled.div`
    height: calc(100% - ${FOOTER_HEIGHT}px - ${HEADER_HEIGHT}px);
    margin: 0 15px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    height: ${HEADER_HEIGHT}px;
    margin: 0 15px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 56px);
    border-top: 1px solid rgba(182, 165, 166, 0.2);
`;

const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: grey;
    height: ${FOOTER_HEIGHT}px;
    padding: 0 12px;
`;

const SectionTitle = styled.div`
    padding-bottom: 5px;
`;

const SettingSection = styled.div`
    border-bottom: 1px solid rgba(182, 165, 166, 0.2);
    padding-bottom: 12px;
    padding-top: 12px;
`;

const SpacingColumn = styled.div`
    margin: 4px 0;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    display: flex;
    float: right;
    padding: 6px 14px;
`;

const InputLabel = styled.label`
    display: flex;
    align-items: center;
    margin-right: 8px;
`;

const SettingModal: React.FC<BaseModalContainerProps> = ({onConfirm}) => {
    const timers = useSelector<RootState, TimerMap>(state => state.timer.timers);
    const timerIds = useSelector<RootState, string[]>(state => state.timer.timerIds);
    const autoNext = useSelector<RootState, boolean>(state => state.common.autoNext);
    const dispatch = useDispatch();

    const [workTimer, restTimer] = useMemo(() => timerIds.map((id) => timers[id]), [timers, timerIds]);

    const workTimerMinute = useMemo(() => workTimer.initialTime / 60, [workTimer]);
    const restTimerMinute = useMemo(() => restTimer.initialTime / 60, [restTimer]);

    const handleAutoNextChanged = useCallback((nextValue: boolean) => {
        dispatch(changeAutoNext(nextValue));
    }, []);

    return (
        <>
            <TitleContainer>
                세팅
            </TitleContainer>
            <Container>
                <ContentContainer>
                    <SettingSection>
                        <SectionTitle>시간설정</SectionTitle>
                        <SpacingColumn>
                            <InputLabel htmlFor={'setting__work-time'}>
                                {workTimer.timerName}
                            </InputLabel>
                            <NumberInput
                                id={'setting__work-time'}
                                value={workTimerMinute}
                                onChange={(value) => {
                                    dispatch(changeTimerInitialTime({
                                        id: workTimer.id,
                                        value: value * 60,
                                    }));
                                }}
                            />
                        </SpacingColumn>
                        <SpacingColumn>
                            <InputLabel htmlFor={'setting__rest-time'}>
                                {restTimer.timerName}
                            </InputLabel>
                            <NumberInput
                                id={'setting__rest-time'}
                                value={restTimerMinute}
                                onChange={(value) => {
                                    dispatch(changeTimerInitialTime({
                                        id: restTimer.id,
                                        value: value * 60,
                                    }));
                                }}
                            />
                        </SpacingColumn>
                    </SettingSection>
                    <SettingSection>
                        <SpacingColumn>
                            <InputLabel>
                                자동넘김
                            </InputLabel>
                            <Switch
                                value={autoNext}
                                onChange={handleAutoNextChanged}
                            />
                        </SpacingColumn>
                    </SettingSection>
                </ContentContainer>
            </Container>
            <BottomContainer>
                <Button onClick={onConfirm}>확인</Button>
            </BottomContainer>
        </>
    );
};

export default SettingModal;

