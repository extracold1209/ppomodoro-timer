import React from 'react';
import TimerCard from './TimerCard';
import AddTimerCard from './AddTimerCard';
import FlattenCard from './FlattenCard';

export default {title: 'atoms'};

export const timerCard = () => <TimerCard/>;

export const addTimerCard = () => <AddTimerCard/>;
export const flattenCard = () => <FlattenCard timer={{
    initialSecond: 10,
    title: '테스트'
}}/>;
