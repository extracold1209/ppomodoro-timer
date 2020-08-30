import React from 'react';
import Footer from './Footer';
import Header from './Header';
import SettingSection from './SettingSection';
import TimerSection from './TimerSection';
import TimerControlSection from './TimerControlSection';

export default {
    title: 'Layouts'
};

export const footer = () => <Footer/>;
export const header = () => <Header/>;
export const settingSection = () => <SettingSection/>;
export const timerSection = () => <TimerSection/>;
export const timerControlSection = () => <TimerControlSection/>;
