import {
  put,
  takeLatest,
  call,
  delay
} from 'redux-saga/effects';
import actions, {
  getClassify,
  getFoods
} from '../actions/classify';
import get_data from '../apis/api';

// 获取分类列表
function* fetchClassify(action) {
  try {
    yield put(actions.setLoading(true));
    const {
      data
    } = yield call(get_data, action.payload);
    if (data.data) {
      yield put(actions.setClassify(data.data.allClassifies));
      yield delay(1000);
      yield put(actions.setLoading(false));
    }
  } catch (error) {
    return error;
  }
}

// 获取商品列表
function* fetchFoods(action) {
  try {
    const {
      data
    } = yield call(get_data, action.payload);
    if (data.data && data.data.allFoods !== null) {
      yield put(actions.setFoods(data.data.allFoods));
    }else {
      yield put(actions.setFoods([]));
    }
  } catch (error) {
    return error;
  }
}

export default function* searchSaga() {
  yield takeLatest(getClassify().type, fetchClassify);
  yield takeLatest(getFoods().type, fetchFoods);
}
