import React from 'react';
import {Transition} from 'react-transition-group';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 1,
};

const transitionStyles: { [key: string]: { opacity: number } } = {
    entering: {opacity: 1},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0},
};

const Fade: React.FC<{ enter: boolean; onFaded?: () => void; }> = ({children, enter, onFaded}) => (
    <Transition
        in={enter}
        timeout={duration}
        onExited={onFaded}
    >
        {state => (
            <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}>
                {children}
            </div>
        )}
    </Transition>
);

export default Fade;
