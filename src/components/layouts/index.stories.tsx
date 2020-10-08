import React from 'react';
import SettingSection from './SettingSection';
import TimerSection from './TimerSection';
import TimerControlSection from './TimerControlSection';
import NewTimerSection from './NewTimerSection';
import Header from './Header';

export default {
    title: 'Layouts'
};

export const settingSection = () => <SettingSection/>;
export const timerSection = () => <TimerSection/>;
export const timerControlSection = () => <TimerControlSection/>;
export const newTimerSection = () => <NewTimerSection/>;
export const header = () => <Header/>;
