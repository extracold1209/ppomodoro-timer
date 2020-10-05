import React from 'react';
import {Box} from 'rebass';
import SettingSection from '../layouts/SettingSection';
import TimerControlSection from '../layouts/TimerControlSection';
import styled from '@emotion/styled';
import NewTimerSection from '../layouts/NewTimerSection';

const RootContainer: React.FC = styled.div`
    max-width: 620px;
    margin: auto;
`;

const MainContainer: React.FC = () => {
    return (
        <>
            <RootContainer>
                <SettingSection/>
                <NewTimerSection/>
            </RootContainer>
        </>

    );
};

export default MainContainer;
