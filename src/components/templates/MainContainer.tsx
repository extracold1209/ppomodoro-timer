import React from 'react';
import styled from '@emotion/styled';
import NewTimerSection from '../layouts/NewTimerSection';
import Header from '../layouts/Header';

const RootContainer: React.FC = styled.div`
    max-width: 620px;
    margin: auto;
`;

const Space = styled.div`
    margin: '5vh 0'
`;

const MainContainer: React.FC = () => {
    return (
        <>
            <RootContainer>
                <Header/>
                <Space/>
                <NewTimerSection/>
            </RootContainer>
        </>

    );
};

export default MainContainer;
