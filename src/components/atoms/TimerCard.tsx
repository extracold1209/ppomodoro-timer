import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const IndicatorContainer = styled.div`
    font-family: 'Special Elite', cursive;
    font-size: 64px;
`;

const ControllerContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const FlexButton = styled.button`
    display: flex;
`

const TimerCard: React.FC = (props) => {
    return (
        <Container>
            이름따리
            <IndicatorContainer>
                08:45
            </IndicatorContainer>
            <ControllerContainer>
                <FlexButton>시작</FlexButton>
                <FlexButton>정지</FlexButton>
            </ControllerContainer>
        </Container>
    )
};

export default TimerCard;
