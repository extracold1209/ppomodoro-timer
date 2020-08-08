import React from 'react';
import CardContainer from './CardContainer';
import styled from 'styled-components';
import {PlusCircleIcon} from '@primer/octicons-react';

const IconWrapper = styled.div`
    opacity: 0.5;
`;

const AddTimerCard: React.FC<{ onClick?: () => void }> = ({onClick}) => {
    return (
        <CardContainer onClick={onClick}>
            <IconWrapper>
                <PlusCircleIcon size={64}/>
            </IconWrapper>
        </CardContainer>
    );
};

export default AddTimerCard;
