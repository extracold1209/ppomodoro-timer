import React, {useCallback} from 'react';
import styled from '@emotion/styled';

const CONTAINER_WIDTH = 45;
const CONTAINER_HEIGHT = 35;
const RIGHT_BUTTON_WIDTH = 20;

const TargetInput = styled.input`
    width: ${CONTAINER_WIDTH}px;
    height: ${CONTAINER_HEIGHT}px;
    line-height: 1.65;
    float: left;
    display: block;
    padding-left: 4px;
    padding-right: ${RIGHT_BUTTON_WIDTH + 2}px;
    border: 1px solid #eee;

    &:before {
        padding-right: 20px;
    }
    &:focus {
        outline: 0;
    }
    
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const UpDownButtonContainer = styled.div`
    float: left;
    position: relative;
    height: ${CONTAINER_HEIGHT}px;
`;

const BaseButton = styled.div`
    position: relative;
    cursor: pointer;
    border-left: 1px solid #eee;
    width: ${RIGHT_BUTTON_WIDTH}px;
    text-align: center;
    color: #333;
    font-size: 13px;
    font-family: "Trebuchet MS", Helvetica, sans-serif !important;
    line-height: 1.7;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
`;

const UpButton = styled(BaseButton)`
    position: absolute;
    height: 50%;
    top: 0;
    border-bottom: 1px solid #eee;
`;

const DownButton = styled(BaseButton)`
    position: absolute;
    bottom: -1px;
    height: 50%;
`;

type IProps = {
    id?: string;
    value?: number;
    onChange?: (value: number) => void;
}

const NumberInput: React.FC<IProps> = ({id, value= 1, onChange}) => {
    const handleInputChanged = useCallback((e) => {
        onChange?.(Number(e.target.value));
    }, [onChange]);

    const handleUpClicked = useCallback(() => {
        onChange?.(Number(value) + 1);
    }, [value, onChange]);

    const handleDownClicked = useCallback(() => {
        onChange?.(Number(value) - 1);
    }, [value, onChange]);


    return (
        <div id={id}>
            <TargetInput
                type="number"
                min="1"
                max="9"
                step="1"
                value={value}
                inputMode="numeric"
                onChange={handleInputChanged}
            />
            <UpDownButtonContainer>
                <UpButton onClick={handleUpClicked}>+</UpButton>
                <DownButton onClick={handleDownClicked}>-</DownButton>
            </UpDownButtonContainer>
        </div>
    );
};

export default NumberInput;
