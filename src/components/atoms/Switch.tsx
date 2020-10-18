import React, {useCallback} from 'react';
import styled from '@emotion/styled';

const SWITCH_WIDTH = 52;
const SWITCH_HEIGHT = 28;
const ACTIVE_COLOR = '#2196F3';

const CIRCLE_SIZE = 22;

const SwitchContainer = styled.label`
    position: relative;
    display: inline-block;
    width: ${SWITCH_WIDTH}px;
    height: ${SWITCH_HEIGHT}px;
`;

const TargetInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
    
    &:before {
        border-radius: 50%;
        position: absolute;
        content: "";
        height: ${CIRCLE_SIZE}px;
        width: ${CIRCLE_SIZE}px;
        left: 4px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    input:checked + & {
        background-color: ${ACTIVE_COLOR};
    }
    
    input:focus + & {
        box-shadow: 0 0 1px ${ACTIVE_COLOR};
    }
    
    input:checked + &:before {
        transform: translateX(${CIRCLE_SIZE}px);
    }
`;

type IProps = {
    value?: boolean;
    onChange?: (value: boolean) => void;
}

const Switch: React.FC<IProps> = ({value, onChange}) => {
    const handleCheckboxChanged = useCallback((e) => {
        onChange?.(e.target.checked);
    }, [onChange]);

    return (
        <SwitchContainer>
            <TargetInput
                type='checkbox'
                checked={value}
                onChange={handleCheckboxChanged}
            />
            <Slider />
        </SwitchContainer>
    );
};

export default Switch;
