import React from 'react';
import TimerControlSection from './TimerControlSection';
import NewTimerSection from './NewTimerSection';
import Header from './Header';

export default {
    title: 'Layouts'
};

export const timerControlSection = () => <TimerControlSection/>;
export const newTimerSection = () => <NewTimerSection/>;
export const header = () => <Header/>;
