import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    try {
        const result = yield call(Api.fetchUniteInfo,{
            uniteId:action.uniteId
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取联名轮播图错误："+e.toString()));
    }
}

export function* watchFetchUniteCarousel() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}
