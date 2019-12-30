import {
  all
} from 'redux-saga/effects';
import testSaga from './test';
import classifySaga from './classify';

export default function* rootSaga() {
  yield all([testSaga(), classifySaga()]);
}
