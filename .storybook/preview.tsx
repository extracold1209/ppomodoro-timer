import React from 'react';
import {addDecorator} from '@storybook/react';
import {Provider} from 'react-redux';
import theme from '../src/constants/theme';
import {ThemeProvider} from "emotion-theming";
import store from '../src/stores';

addDecorator(Context => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            {Context()}
        </ThemeProvider>
    </Provider>
));
