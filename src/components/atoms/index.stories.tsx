import React, {useState} from 'react';
import {action} from '@storybook/addon-actions';
import CustomNumberInput from './CustomNumberInput';
import PressButton from './PressButton';
import Card from './Card';
import RadioButtons from './RadioButtons';
import Switch from './Switch';
import NumberInput from './NumberInput';

export default {title: 'atoms'};

export const customNumberInput = () => <CustomNumberInput
    label='테스트'
    suffix='번'
    value={5}
    onChange={action('ON_CHANGE')}
/>;

export const _switch = () => <Switch onChange={action('ON_CHANGE')}/>;
export const numberInput = () => {
    const [value, setValue] = useState(5);

    return (
        <NumberInput
            value={value}
            onChange={(e) => {
                setValue(e);
            }}
        />
    );
};

export const pressButton = () => <PressButton
    value={'Hello'}
    onClick={action('ON_CLICK')}
/>;

export const card = () => <Card>Test Card</Card>;

export const radioButtons = () => <RadioButtons
    selected={'hello'}
    values={['hello', 'world']}
    onChange={(e) => action('ON_CLICK')(e)}
/>;
