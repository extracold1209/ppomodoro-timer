import React from 'react';
import styled from '@emotion/styled';

const ButtonContainer = styled.button`
    min-width: 200px;
    cursor: pointer;
    height: 50px;
    color: red;
    padding: 0 12px;
    border-radius: 4px;
    border-color: initial;
    border-with: initial;
    background-color: white;
    font-size: 22px;
    
    &:focus {
        outline: none;
    }
`;

type IProps = {
    content: string;
    onClick?: () => void;
}

const ToggleButton: React.FC<IProps> = (props) => {
    return (
        <ButtonContainer onClick={props.onClick}>
            {props.content}
        </ButtonContainer>
    );
};

export default ToggleButton;
