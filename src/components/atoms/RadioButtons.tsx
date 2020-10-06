import React, {useCallback, useMemo, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import styled from '@emotion/styled';

type IProps = {
    values: string[];
    defaultSelected?: string;
    onChange?: (value: string) => void;
}

const Button = styled.button<{ selected: boolean }>`
    font-size: 18px;
    cursor: pointer;
    color: white;
    padding: 4px 16px;
    margin: 0 4px;
    border-radius: 4px;
    border-style: none;
    background-color: transparent;
    outline: none;
    ${({selected}) => selected && `
        background-color: rgba(200, 200, 200, 0.4);
    `}
    
    transition: ease 0.5s;
    
    // enter from
    &.fade-enter {
        background-color: transparent;
    
    }
    
    // enter to
    &.fade-enter-active {
        background-color: rgba(200, 200, 200, 0.4);
    }
    
    // exit from
    &.fade-exit {
        background-color: rgba(200, 200, 200, 0.4);
    }
    
    // exit to 
    &.fade-exit-active {
        background-color: transparent;
    }
`;

const RadioButtons: React.FC<IProps> = (props) => {
    const {values, defaultSelected, onChange} = props;
    const [selectedValue, setSelectedValue] = useState(defaultSelected);

    const handleOnClick = useCallback((value: string) => () => {
        setSelectedValue(value);
        onChange?.(value);
    }, [values]);

    return (
        <div>
            {values.map((value) => (
                <CSSTransition
                    key={value}
                    classNames={'fade'}
                    timeout={500}
                >
                    <Button
                        onClick={handleOnClick(value)}
                        selected={value === selectedValue}
                    >{value}</Button>
                </CSSTransition>
            ))}
        </div>
    );
};

export default RadioButtons;
