import {
  createActions,
  createAction
} from 'redux-actions';

const actions = createActions({
  SET_TEST: test => test
});

export const getTest = createAction('GET_TEST');

export default actions;