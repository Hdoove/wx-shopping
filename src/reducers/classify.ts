import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import actions from '../actions/classify';

const defaultState = Immutable({
    classify: [],
    loading: false
});

const reducer = handleActions(
    new Map([
        [
            actions.setClassify,
            (state, { payload }) => state.set('classify', payload)
        ],
        [
            actions.setLoading,
            (state, { payload }) => state.set('loading', payload)
        ]
    ]),
    defaultState
);

export default reducer;
