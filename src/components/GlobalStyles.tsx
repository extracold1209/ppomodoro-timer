import React from 'react';
import {css, Global} from '@emotion/core';

const GlobalStyles: React.FC = () => (
    <Global styles={css`
        html,body {
            margin: 0;
            height: 100%;
        }

        body {
            background-color: #FF6C5C;
            padding-bottom: 52px;
        }
        
        .ReactModal__Overlay {
            opacity: 0;
            transform: translateY(-10px);
            transition: all 500ms ease-in-out;
        }
        
        .ReactModal__Overlay--after-open {
            opacity: 1;
            transform: translateY(0px);
        }
        
        .ReactModal__Overlay--before-close {
            opacity: 0;
            transform: translateY(-10px);
        }
    `}/>
);

export default GlobalStyles;
