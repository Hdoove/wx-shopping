import {
  put,
  takeLatest,
  call
} from 'redux-saga/effects';
import actions, {
  getTest
} from '../actions/test';
import get_data from '../apis/api';

const GET_ALL_USERS = `
{
  allTodos {
    name,
    address,
    file {
      filename,
      publicUrl
    }
  }
}`;

// 获取搜索单曲
function* fetchTest() {
  try {
    yield put(actions.setTest('测试文字'));
    const {
      data
    } = yield call(get_data, GET_ALL_USERS);
    if (data.data) {
      yield put(actions.setTest(data.data.allTodos));
    }
  } catch (error) {
    return error;
  }
}

export default function* searchSaga() {
  yield takeLatest(getTest().type, fetchTest);
}
