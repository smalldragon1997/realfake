import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    try {
        const result = yield call(Api.fetchHomeCarousel);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取homeCarousel错误："+e.toString()));
    }
}

export function* watchFetchHomeCarousel() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}
