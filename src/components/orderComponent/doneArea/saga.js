import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';


// 获取支付信息
function* fetchEvaluateInfo(action) {
    try {
        const result = yield call(Api.fetchEvaluateInfo);
        yield put(Actions.FetchEvaluateInfoSuccess(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单信息错误："+e.toString()));
    }
}

export function* watchFetchEvaluateInfo() {
    yield takeEvery(ActionTypes.FetchEvaluateInfo, fetchEvaluateInfo);
}