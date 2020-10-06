import React, {useCallback} from 'react';
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
    padding: 0 12px;
    margin: 8px 0;
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
    value: string;
    onClick?: () => void;
}

const LongPressDesignButton: React.FC<IProps> = (props) => {
    const {value, onClick} = props;

    const handleOnClick = useCallback(() => {
        onClick?.();
    }, [onClick]);

    return (
        <ButtonContainer onClick={handleOnClick}>
            {value}
        </ButtonContainer>
    );
};

export default LongPressDesignButton;
