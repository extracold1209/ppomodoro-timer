import React from 'react';
import styled from '@emotion/styled';
import Card from '../atoms/Card';
import ToggleButton from '../atoms/ToggleButton';
import {DefaultTheme} from '../../constants/theme';

const CardContainer = styled(Card)`
    text-align: center;
    background-color: rgba(240, 91, 86, 0.1);
`;

const TimerContainer = styled.div<{ theme: DefaultTheme }>`
    margin-bottom: ${({theme}) => theme.space[2]};
    user-select: none;
    font-size: 100px;
    color: white;
`;

const NewTimerSection: React.FC = () => {
    return (
        <CardContainer>
            <TimerContainer>
                01:00
            </TimerContainer>
            <ToggleButton
                onValue={'시작'}
                offValue={'정지'}
            />
        </CardContainer>
    );
};

export default NewTimerSection;
