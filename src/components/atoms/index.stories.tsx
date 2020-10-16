import React from 'react';
import {action} from '@storybook/addon-actions';
import CustomNumberInput from './CustomNumberInput';
import PressButton from './PressButton';
import Card from './Card';
import RadioButtons from './RadioButtons';

export default {title: 'atoms'};

export const customNumberInput = () => <CustomNumberInput
    label='테스트'
    suffix='번'
    value={5}
    onChange={action('ON_CHANGE')}
/>;

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
