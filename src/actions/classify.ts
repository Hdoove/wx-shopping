import {
    createActions,
    createAction
} from 'redux-actions';

const actions = createActions({
    SET_CLASSIFY: classify => classify,
    SET_LOADING: loading => loading
});

export const getClassify = createAction('GET_CLASSIFY');

export default actions;