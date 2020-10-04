import React, {useCallback, useState} from 'react';
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
    onValue: string;
    offValue: string;
    onClick?: () => void;
}

const ToggleButton: React.FC<IProps> = (props) => {
    const {onValue, offValue, onClick} = props;
    const [isOn, toggleState] = useState(true);

    const handleOnClick = useCallback(() => {
        toggleState(!isOn);
        onClick?.();
    }, [isOn]);

    return (
        <ButtonContainer onClick={handleOnClick}>
            {isOn ? onValue : offValue}
        </ButtonContainer>
    );
};

export default ToggleButton;
