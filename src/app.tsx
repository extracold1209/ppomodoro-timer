import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './stores';
import Modal from 'react-modal';
import MainCardContainer from './components/templates/MainCardContainer';

const rootElement = document.getElementById('__workspace__') as HTMLElement;
Modal.setAppElement(rootElement);
ReactDom.render(
    <Provider store={store}>
        <MainCardContainer />
    </Provider>
    , rootElement);
