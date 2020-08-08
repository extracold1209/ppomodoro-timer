import React from 'react';
import addSeconds from 'date-fns/addSeconds';
import formatDate from 'date-fns/format';
import styled from 'styled-components';
import useTimer from '../../hooks/useTimer';
import {SettingsIcon, XCircleIcon} from '@primer/octicons-react';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
`;

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

const IndicatorContainer = styled.div`
    cursor: default;
    user-select: none;
    font-family: 'Special Elite', cursive;
    font-size: 64px;
`;

const ControllerContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const FlexButton = styled.button`
    display: flex;
    border: none;
    border-radius: 4px;
    background-color: lightgrey;
    cursor: pointer;
    padding: 7px 14px;
    margin: 0 6px;
`;

function convertSecondToDisplayText(seconds: number) {
    return formatDate(addSeconds(new Date(0), seconds), 'mm:ss');
}

const TimerCard: React.FC = (props) => {
    const [start, stop, remainSeconds] = useTimer(10);

    return (
        <Container>
            <Header>
                <IconWrapper><SettingsIcon size={24}/></IconWrapper>
                <IconWrapper><XCircleIcon size={24}/></IconWrapper>
            </Header>
            <TimerNameSpan>이름따리</TimerNameSpan>
            <IndicatorContainer>
                {convertSecondToDisplayText(remainSeconds)}
            </IndicatorContainer>
            <ControllerContainer>
                <FlexButton onClick={() => {
                    start();
                }}>시작</FlexButton>
                <FlexButton onClick={() => {
                    stop();
                }}>정지</FlexButton>
            </ControllerContainer>
        </Container>
    );
};

export default TimerCard;
