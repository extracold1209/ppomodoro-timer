import React, {useCallback} from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import {useDispatch} from 'react-redux';
import {changeTimerStatus, TimerStatusEnum} from '../../stores/timer';


const FooterContainer = styled.div`
    display: flex;
    //position: fixed;
    //width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    background-color: rgb(245, 195, 64);
    bottom: 0;
    left: 0;
    height: 4vh;
`;

const Footer: React.FC = () => {
    const dispatch = useDispatch();

    const handleStartButton = useCallback((nextStatus: TimerStatusEnum) => {
        dispatch(changeTimerStatus(nextStatus));
    }, []);

    return (
        <FooterContainer>
            <Button onClick={() => handleStartButton(TimerStatusEnum.RUNNING)}>시작</Button>
            <Button onClick={() => handleStartButton(TimerStatusEnum.STOPPED)}>정지</Button>
        </FooterContainer>
    );
};

export default Footer;
