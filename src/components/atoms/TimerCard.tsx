import React, {useCallback, useMemo, useState} from 'react';
import {floor} from 'lodash';
import addSeconds from 'date-fns/addSeconds';
import formatDate from 'date-fns/format';
import styled from 'styled-components';
import useTimer from '../../hooks/useTimer';
import {CheckCircleIcon, SettingsIcon, XCircleIcon} from '@primer/octicons-react';
import CardContainer from './CardContainer';

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const IconWrapper = styled.div`
    opacity: 0.7;
    margin-left: 5px;
`;

const TimerNameSpan = styled.span`
    font-size: 32px;
    font-family: 'Cute Font', cursive;
`;

const TimerNameEditInput = styled.input`
    font-size: 32px;
    height: 48px;
    margin-bottom: 5px;
    font-family: 'Cute Font', cursive;
    text-align: center;
`;

const IndicatorContainer = styled.div`
    cursor: default;
    user-select: none;
    font-family: 'Special Elite', cursive;
    font-size: 64px;
`;

const IndicatorSettingInput = styled.input`
    font-family: 'Special Elite', cursive;
    font-size: 64px;
    height: 60px;
    padding-top: 14px;    
    width: 90px;
`;

function convertSecondToDisplayText(seconds: number, format: string) {
    return formatDate(addSeconds(new Date(0), seconds), format);
}

enum TimerCardStatusEnum {
    STOPPED, SETTING, STARTED, PAUSED
}


const TimerCard: React.FC<{initialTime?: number; title?: string;}> = ({initialTime = 10, title: propTitle}) => {
    const [status, changeStatus] = useState(TimerCardStatusEnum.STOPPED);
    const [title, setTitle] = useState(propTitle);

    const [initialMinute, changeInitialMinute] = useState(floor(initialTime / 60));
    const [initialSecond, changeInitialSecond] = useState(initialTime - floor(initialTime / 60));

    const [start, stop, remainSeconds, setInitialTimerSecond] = useTimer(initialMinute * 60 + initialSecond);

    const isSettingMode = useMemo(() => status === TimerCardStatusEnum.SETTING, [status]);

    const minute = useMemo(() => convertSecondToDisplayText(remainSeconds, 'mm'), [remainSeconds]);
    const second = useMemo(() => convertSecondToDisplayText(remainSeconds, 'ss'), [remainSeconds]);

    const handleEditMinute = useCallback((e) => {
        const currentValue = e.target.valueAsNumber;
        if (currentValue < 0 || !Number.isInteger(currentValue)) {
            e.preventDefault();
            return false;
        }
        if (currentValue > 90) {
            const currentValueString = currentValue.toString();
            e.target.valueAsNumber = parseInt(currentValueString[currentValueString.length - 1]);
        }

        changeInitialMinute(e.target.valueAsNumber);
    }, []);

    const handleEditSecond = useCallback((e) => {
        const currentValue = e.target.valueAsNumber;
        if (currentValue < 0 || !Number.isInteger(currentValue)) {
            e.preventDefault();
            return false;
        }
        if (currentValue > 60) {
            const currentValueString = currentValue.toString();
            e.target.valueAsNumber = parseInt(currentValueString[currentValueString.length - 1]);
        }
        changeInitialSecond(e.target.valueAsNumber);
    }, []);

    // 입력된 minute, second 에 대한 initialTime 반영 및 validation
    const handleEditCompleted = useCallback(() => {
        if (initialSecond > 60) {
            changeInitialSecond(59);
        }

        setInitialTimerSecond(initialMinute * 60 + initialSecond);
        changeStatus(TimerCardStatusEnum.STOPPED);
    }, [initialSecond, initialMinute]);

    return (
        <CardContainer>
            <Header>
                {
                    isSettingMode ?
                        <IconWrapper onClick={handleEditCompleted}><CheckCircleIcon size={24}/></IconWrapper> :
                        <IconWrapper onClick={() => changeStatus(TimerCardStatusEnum.SETTING)}><SettingsIcon size={24}/></IconWrapper>
                }

                <IconWrapper><XCircleIcon size={24}/></IconWrapper>
            </Header>
            {
                isSettingMode ?
                    <TimerNameEditInput type={'text'} value={title} onChange={(e) => setTitle(e.target.value)}/> :
                    <TimerNameSpan>{title}</TimerNameSpan>
            }
            <IndicatorContainer>
                {
                    isSettingMode ?
                        (
                            <>
                                <IndicatorSettingInput type={'number'} value={floor(initialMinute)}
                                                       min={0} max={99}
                                                       onChange={handleEditMinute}/>
                                :
                                <IndicatorSettingInput type={'number'} value={initialSecond}
                                                       min={0} max={59}
                                                       onChange={handleEditSecond}/>
                            </>
                        ) :
                        `${minute}:${second}`
                }
            </IndicatorContainer>
            {/*<ControllerContainer>
                <Button
                    disabled={status === TimerCardStatusEnum.SETTING}
                    onClick={() => {
                        start();
                    }}
                >
                    시작
                </Button>
                <Button
                    disabled={status === TimerCardStatusEnum.SETTING}
                    onClick={() => {
                        stop();
                    }}
                >
                    정지
                </Button>
            </ControllerContainer>*/}
        </CardContainer>
    );
};

export default TimerCard;
