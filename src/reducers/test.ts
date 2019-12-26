import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import actions from '../actions/test';

const defaultState = Immutable({
    test: [],
});

const reducer = handleActions(
    new Map([
        [
            actions.setTest,
            (state, { payload }) => state.set('test', payload)
        ]
    ]),
    defaultState
);

export default reducer;
