import React, {useCallback} from 'react';
import styled from '@emotion/styled';
import {debug} from "webpack";

const SwitchContainer = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
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
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    
    input:checked + & {
        background-color: #2196F3;
    }
    
    input:focus + & {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + &:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`;

type IProps = {
    onChange?: (value: boolean) => void;
}

const Switch: React.FC<IProps> = ({onChange}) => {
    const handleCheckboxChanged = useCallback((e) => {
        onChange?.(e.target.checked);
    }, [onChange]);

    return (
        <SwitchContainer>
            <TargetInput type='checkbox' onChange={handleCheckboxChanged}/>
            <Slider />
        </SwitchContainer>
    );
};

export default Switch;
