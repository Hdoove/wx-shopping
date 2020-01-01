import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import actions from '../actions/classify';

const defaultState = Immutable({
    classify: [
        {
            classifys: []
        }
    ],
    foods: [],
    loading: true
});

const reducer = handleActions(
    new Map([
        [
            actions.setClassify,
            (state, { payload }) => state.set('classify', payload)
        ],
        [
            actions.setFoods,
            (state, { payload }) => state.set('foods', payload)
        ],
        [
            actions.setLoading,
            (state, { payload }) => state.set('loading', payload)
        ]
    ]),
    defaultState
);

export default reducer;
