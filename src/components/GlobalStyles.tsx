import React from 'react';
import {css, Global} from '@emotion/core';

const GlobalStyles: React.FC = () => (
    <Global styles={css`
        html,body {
            margin: 0;
            height: 100%;
        }

        body {
            padding-bottom: 52px;
        }
    `}/>
);

export default GlobalStyles;
