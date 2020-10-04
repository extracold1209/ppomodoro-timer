import React from 'react';
import SettingSection from './SettingSection';
import TimerSection from './TimerSection';
import TimerControlSection from './TimerControlSection';

export default {
    title: 'Layouts'
};

export const settingSection = () => <SettingSection/>;
export const timerSection = () => <TimerSection/>;
export const timerControlSection = () => <TimerControlSection/>;
