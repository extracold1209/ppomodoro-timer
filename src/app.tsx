import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './stores';
import Modal from 'react-modal';
import MainCardContainer from './components/templates/MainContainer';
import GlobalStyles from './components/GlobalStyles';
import theme from './constants/theme';
import {ThemeProvider} from 'emotion-theming';

const rootElement = document.getElementById('__workspace__') as HTMLElement;
Modal.setAppElement(rootElement);
ReactDom.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <MainCardContainer/>
        </ThemeProvider>
    </Provider>
    , rootElement);
