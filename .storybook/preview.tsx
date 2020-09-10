import React from 'react';
import {addDecorator} from '@storybook/react';
import {Provider} from 'react-redux';
import theme from '../src/constants/theme';
import {ThemeProvider} from "emotion-theming";
import store from '../src/stores';
import GlobalStyles from "../src/components/GlobalStyles";
import {changeInitialRestTime, changeInitialWorkTime} from "../src/stores/timer";

store.dispatch(changeInitialRestTime(5));
store.dispatch(changeInitialWorkTime(5));

addDecorator(Context => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {Context()}
        </ThemeProvider>
    </Provider>
));
