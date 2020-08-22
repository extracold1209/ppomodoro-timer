import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 10px 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: white;
`;

const FlattenCard: React.FC<{ timer: Timer }> = (props) => {
    return (
        <CardContainer>
            Hello Card
        </CardContainer>
    );
};

export default FlattenCard;
