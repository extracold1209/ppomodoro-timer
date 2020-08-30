import React from 'react';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {Box} from 'rebass';
import SettingSection from '../layouts/SettingSection';
import TimerSection from '../layouts/TimerSection';
import TimerControlSection from '../layouts/TimerControlSection';

const Container: React.FC = (props) => (
    <Box
        sx={{
            maxWidth: 1024,
            mx: 'auto',
            px: 3,
        }}>
        {props.children}
    </Box>
);

const MainContainer: React.FC = () => {

    return (
        <>
            <Header/>
            <Container>
                <SettingSection/>
                <TimerSection/>
                <Box marginY={4}/>
                <TimerControlSection/>
            </Container>
            <Footer/>
        </>

    );
};

export default MainContainer;
