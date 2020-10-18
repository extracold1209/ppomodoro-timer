import React from 'react';
import {addDecorator} from '@storybook/react';
import {Provider} from 'react-redux';
import theme from '../src/constants/theme';
import {ThemeProvider} from "emotion-theming";
import store from '../src/stores';
import GlobalStyles from "../src/components/GlobalStyles";

addDecorator(Context => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {Context()}
        </ThemeProvider>
    </Provider>
));
