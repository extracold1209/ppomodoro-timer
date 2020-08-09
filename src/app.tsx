import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from './stores';
import CarouselContainer from './components/templates/CarouselContainer';

ReactDom.render(
    <Provider store={store}>
        <CarouselContainer />
    </Provider>
    , document.getElementById('__workspace__'));
