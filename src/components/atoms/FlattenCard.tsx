import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import useTimer from '../../hooks/useTimer';
import {BiPlayCircle, BiStopCircle, BiXCircle, BiCog} from 'react-icons/bi/index';

const CardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px 15px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: white;
`;

const HeaderContainer = styled.div`
    align-content: space-between;
    display: flex;
    min-height: 10vh;
    font-size: 18px;
`;

const HeaderIconContainer = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 10px;
    padding-right: 10px;
    
    > *:not(:last-child) {
        margin-right: 5px;
    }
`;

const HeaderTitleContainer = styled.div`
    display: flex;
`;

const ContentContainer = styled.div`
    display: flex;
    font-size: 32px;
`;

const FlattenCard: React.FC<{ timer: Timer, onDelete?: () => void }> = (props) => {
    const {timer} = props;
    const {title, initialSecond} = timer;
    const [start, stop, remainSeconds] = useTimer(initialSecond);
    const [isTimerRunning, setTimerStatus] = useState(false);

    const handlePlayButtonClicked = useCallback(() => {
        setTimerStatus(true);
        start();
    }, []);

    const handleStopButtonClicked = useCallback(() => {
        setTimerStatus(false);
        stop();
    }, []);

    const handleDeleteButtonClicked = useCallback(() => {
        props.onDelete?.();
    }, []);

    return (
            <CardContainer>
                <HeaderContainer>
                    <HeaderTitleContainer>
                        {title || '타이틀이 없어욧'}
                    </HeaderTitleContainer>
                    <HeaderIconContainer>
                        <BiCog size={24}/>
                        {
                            isTimerRunning
                                ? <BiStopCircle size={24} onClick={handleStopButtonClicked}/>
                                : <BiPlayCircle size={24} onClick={handlePlayButtonClicked}/>
                        }
                        <BiXCircle size={24} onClick={handleDeleteButtonClicked}/>
                    </HeaderIconContainer>
                </HeaderContainer>
                <ContentContainer>
                    {remainSeconds} / {initialSecond}
                </ContentContainer>
            </CardContainer>
    );
};

export default FlattenCard;
