import React, {useEffect, useState} from 'react';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import {Box} from 'rebass';
import SettingSection from '../layouts/SettingSection';
import TimerSection from '../layouts/TimerSection';
import TimerControlSection from '../layouts/TimerControlSection';
import {useSelector} from 'react-redux';
import {RootState} from '../../stores';
import useAudio from '../../hooks/useAudio';
import {TimerType} from '../../stores/timer';

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
    const remainSecond = useSelector<RootState, number>((state) => state.timer.remainTime);
    const timerType = useSelector<RootState, TimerType>((state) => state.timer.currentTimerType);
    const [isAlreadySounded, setAlreadySounded] = useState(false);
    const [isPlaying, toggleAudioPlayState] = useAudio('/public/sounds/dudungtak.mp3');

    useEffect(() => {
        if (
            (remainSecond !== 0 && isPlaying) ||
            (remainSecond === 0 && !isPlaying && !isAlreadySounded)
        ) {
            setAlreadySounded(true);
            toggleAudioPlayState();
        }
    }, [remainSecond, isPlaying, isAlreadySounded]);

    useEffect(() => {
        setAlreadySounded(false);
    }, [timerType]);

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
