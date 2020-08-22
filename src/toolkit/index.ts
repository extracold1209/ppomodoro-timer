import {configureStore} from '@reduxjs/toolkit';
import common from './common';

export default configureStore({
    reducer: {
        common
    }
});
