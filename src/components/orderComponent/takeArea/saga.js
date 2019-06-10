import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';


// 获取支付信息
function* fetchTakeInfo(action) {
    try {
        const result = yield call(Api.fetchTakeInfo);
        yield put(Actions.FetchTakeInfoSuccess(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单信息错误："+e.toString()));
    }
}

export function* watchFetchTakeInfo() {
    yield takeEvery(ActionTypes.FetchTakeInfo, fetchTakeInfo);
}