import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './stores';
import MainContainer from './components/templates/mainContainer';

ReactDom.render(
    <Provider store={store}>
        <MainContainer />
    </Provider>
    , document.getElementById('__workspace__'));
