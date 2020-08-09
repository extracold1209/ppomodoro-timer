import {Action} from 'redux';

type NoPayloadAction = Action<string>;
type PayloadAction<P> = Action<string> & { payload: P };

type NoPayloadActionCreator = (type: string) => () => NoPayloadAction;
type PayloadActionCreator = <P>(type: string) => (payload: P) => PayloadAction<P>;

export const makeNoPayloadAction: NoPayloadActionCreator = (type) => () => ({type});
export const makePayloadAction: PayloadActionCreator = (type) => (payload) => ({
    type,
    payload
});
