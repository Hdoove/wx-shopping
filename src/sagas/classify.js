import {
  put,
  takeLatest,
  call
} from 'redux-saga/effects';
import actions, {
  getClassify
} from '../actions/classify';
import get_data from '../apis/api';

// 获取搜索单曲
function* fetchClassify(action) {
  try {
    yield put(actions.setLoading(true));
    const {
      data
    } = yield call(get_data, action.payload);
    if (data.data) {
      console.log(actions);
      yield put(actions.setClassify(data.data.allClassifies));
      yield put(actions.setLoading(false));
    }
  } catch (error) {
    return error;
  }
}

export default function* searchSaga() {
  yield takeLatest(getClassify().type, fetchClassify);
}
