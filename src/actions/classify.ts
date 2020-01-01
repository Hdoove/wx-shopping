import {
    createActions,
    createAction
} from 'redux-actions';

const actions = createActions({
    SET_CLASSIFY: classify => classify,
    SET_FOODS: foods => foods,
    SET_LOADING: loading => loading
});

export const getClassify = createAction('GET_CLASSIFY');
export const getFoods = createAction('GET_FOODS');

export default actions;