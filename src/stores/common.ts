import {AnyAction, Reducer} from "redux";
import produce from 'immer';


const SAY_HELLO = 'common/SAY_HELLO';

export const sayHelloAction: AnyAction = { type: SAY_HELLO }

const defaultState = {
    count: 1,
}

const reducer: Reducer<typeof defaultState> = (state = defaultState, action) => {
    const {type, payload} = action;

    switch(type) {
        case SAY_HELLO:
            console.log('say hello called!');
            return produce(state, (next: typeof defaultState) => {
                next.count++;
            });
        default:
            return state;
    }
}

export default reducer;
