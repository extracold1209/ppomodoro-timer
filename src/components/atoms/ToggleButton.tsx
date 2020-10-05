import React, {useCallback, useState} from 'react';
import styled from '@emotion/styled';

const ButtonContainer = styled.button`
    cursor: pointer;
    box-shadow: rgb(235, 235, 235) 0px 6px 0px;
    font-size: 22px;
    height: 50px;
    color: rgb(240, 91, 86);
    font-weight: bold;
    width: 200px;
    background-color: white;
    border-style: none;
    margin: 20px 0px 0px;
    padding: 0px 12px;
    border-radius: 4px;
    transition: color 0.5s ease-in-out 0s;
    &:focus {
        outline: none;
    }
    &:active {
        transform: translateY(3px);
        box-shadow: none;
    }
`;

type IProps = {
    trueValue: string;
    falseValue: string;
    initialState?: boolean;
    onClick?: (isOn: boolean) => void;
}

const ToggleButton: React.FC<IProps> = (props) => {
    const {trueValue, falseValue, onClick, initialState = true} = props;
    const [isOn, toggleState] = useState(initialState);

    const handleOnClick = useCallback(() => {
        toggleState(!isOn);
        onClick?.(!isOn);
    }, [isOn]);

    return (
        <ButtonContainer onClick={handleOnClick}>
            {isOn ? trueValue : falseValue}
        </ButtonContainer>
    );
};

export default ToggleButton;
