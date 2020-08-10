import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    padding: 10px 30px;
    background-color: transparent;
`;

const CardContainer = styled.div`
    display: flex;
    height: 55vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    background-color: white;
`;

const CardContainerFC: React.FC<{onClick?: () => void}> = ({children, onClick}) => (
    <CardWrapper onClick={onClick}>
        <CardContainer>
            {children}
        </CardContainer>
    </CardWrapper>
);

export default CardContainerFC;
