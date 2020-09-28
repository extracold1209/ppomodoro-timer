import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Input, InputProps, Label} from '@rebass/forms';
import styled from '@emotion/styled';
import createHash from '../../functions/createHash';

const InlineLabel = styled(Label)`
    display: inline; // css 적용 순서상 component property 가 먹지 않음
`;

type IProps = {
    label?: string;
    suffix?: string;
    value: number | string;
    onChange: (e: number) => void;
    inputProps?: Omit<InputProps, 'css'>;
}

const CustomNumberInput: React.FC<IProps> = (props) => {
    const {label, value, onChange, suffix, inputProps} = props;
    const [valueState, setValueState] = useState(value);

    const hashCode = useMemo(() => createHash(), []);

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // 0 으로 시작한다면 trim 한다.
        const nextValue = e.target.value.replace(/^0/, '');
        setValueState(nextValue);

        // 1~9 로만 이루어진 숫자문자열
        if (/^[1-9]+$/.exec(nextValue)) {
            onChange(parseInt(nextValue));
        }
    }, [onChange]);

    const handleOnBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (!/^[1-9]+$/.exec(e.target.value)) {
            onChange(1);
        }
    }, [onChange]);

    useEffect(() => {
        setValueState(value);
    }, [value]);

    return (
        <>
            {
                label && (
                    <InlineLabel
                        htmlFor={`${hashCode}-input`}
                        paddingBottom={2}
                        paddingRight={2}
                    >{label}</InlineLabel>
                )
            }
            <Input
                {...inputProps}
                id={`${hashCode}-input`}
                type='number'
                min={1}
                value={valueState}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                paddingRight={1}
                marginRight={2}
                width={'12%'}
                display={'inline-block'}
            />
            <span>{suffix}</span>
        </>
    );
};

export default CustomNumberInput;
