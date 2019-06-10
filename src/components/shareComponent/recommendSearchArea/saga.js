import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    try {
        const result = yield call(Api.fetchRecommendCommodity);
        yield put(Actions.Success(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取recommendSearch错误："+e.toString()));
    }
}

export function* watchFetchRecommendSearch() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}
