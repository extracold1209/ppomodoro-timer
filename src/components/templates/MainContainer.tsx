import React from 'react';
import {Box} from 'rebass';
import SettingSection from '../layouts/SettingSection';
import TimerSection from '../layouts/TimerSection';
import TimerControlSection from '../layouts/TimerControlSection';
import styled from '@emotion/styled';

const RootContainer: React.FC = styled.div`
    max-width: 620px;
    margin: auto;
`;

const MainContainer: React.FC = () => {
    return (
        <>
            <RootContainer>
                <SettingSection/>
                <TimerSection/>
                <Box marginY={4}/>
                <TimerControlSection/>
            </RootContainer>
        </>

    );
};

export default MainContainer;
