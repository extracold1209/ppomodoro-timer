import React from 'react';
import styled from 'styled-components';
import TimerCard from "../atoms/TimerCard";

const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MainContainer: React.FC = () => {

    return (
        <CenterContainer>
            <div>Hello MainContainer</div>
            <TimerCard />
        </CenterContainer>
    )
}

export default MainContainer;
