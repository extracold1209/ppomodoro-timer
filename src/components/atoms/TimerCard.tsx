import React from 'react';
import addSeconds from 'date-fns/addSeconds';
import formatDate from 'date-fns/format';
import styled from 'styled-components';
import useTimer from '../../hooks/useTimer';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
`;

function convertSecondToDisplayText(seconds: number) {
    return formatDate(addSeconds(new Date(0), seconds), 'mm:ss');
}

const TimerCard: React.FC = (props) => {
    const [start, stop, remainSeconds] = useTimer(10);

    return (
        <Container>
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
