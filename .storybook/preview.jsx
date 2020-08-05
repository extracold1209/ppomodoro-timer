import React from 'react';
import { addDecorator } from '@storybook/react';
import { Provider } from "react-redux";
import store from '../src/stores';

addDecorator(Context => (
    <Provider store={store}>
        <Context />
    </Provider>
));
