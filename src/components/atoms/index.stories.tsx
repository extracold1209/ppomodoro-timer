import React from 'react';
import {action} from '@storybook/addon-actions';
import TabList from './TabList';

export default {title: 'atoms'};

export const tabList = () => <TabList
    listItems={['바보', '똥개', '해삼', '말미잘']}
    onClick={((item, activated) => action('TAB_SELECTED')({item, activated}))}
/>;
