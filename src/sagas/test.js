import {
  put,
  takeLatest,
  call
} from 'redux-saga/effects';
import actions, {
  getTest
} from '../actions/test';
import get_data from '../apis/api';

// 获取搜索单曲
function* fetchTest() {
  try {
    yield put(actions.setTest('测试文字'));
    const data = yield call(get_data);
    if (data.statusCode && data.data) {
      yield put(actions.setTest(data.data));
    }
  } catch (error) {
    return error;
  }
}

export default function* searchSaga() {
  yield takeLatest(getTest().type, fetchTest);
}
