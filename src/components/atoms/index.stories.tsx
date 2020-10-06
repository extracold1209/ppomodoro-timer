import React from 'react';
import {action} from '@storybook/addon-actions';
import TabList from './TabList';
import CustomNumberInput from './CustomNumberInput';
import ToggleButton from './ToggleButton';
import Card from './Card';
import RadioButtons from './RadioButtons';

export default {title: 'atoms'};

export const tabList = () => <TabList
    listItems={['바보', '똥개', '해삼', '말미잘']}
    onClick={((item, activated) => action('TAB_SELECTED')({item, activated}))}
    disabled={false}
/>;

export const customNumberInput = () => <CustomNumberInput
    label='테스트'
    suffix='번'
    value={5}
    onChange={action('ON_CHANGE')}
/>;

export const toggleButton = () => <ToggleButton
    trueValue={'Hello'}
    falseValue={'World'}
    onClick={action('ON_CLICK')}
/>;

export const card = () => <Card>Test Card</Card>;

export const radioButtons = () => <RadioButtons
    values={['hello', 'world']}
    onChange={(e) => action('ON_CLICK', )(e)}
/>;
