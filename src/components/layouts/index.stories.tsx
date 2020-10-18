import React from 'react';
import TimerSection from './TimerSection';
import Header from './Header';
import useModal from '../../hooks/useModal';
import SettingModal from './SettingModal';

export default {
    title: 'Layouts'
};

export const timerSection = () => <TimerSection/>;
export const header = () => <Header/>;
export const modal = () => {
    const [func, Component] = useModal({
        component: SettingModal,
    });

    return (
        <div>
            <button onClick={() => func(true)}>Open Modal</button>
            <Component/>
        </div>
    );
};
