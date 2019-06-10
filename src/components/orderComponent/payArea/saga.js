import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 提交订单
function* submit(action) {
    try {
        // const result = yield call(Api.fetchPayOrders);
        yield put(Actions.SubmitSuccess("1"));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("提交支付错误："+e.toString()));
    }
}

export function* watchSubmitPay() {
    yield takeEvery(ActionTypes.Submit, submit);
}

// 获取支付信息
function* fetchPayInfo(action) {
    try {
        const result = yield call(Api.fetchPayInfo);
        yield put(Actions.FetchPayInfoSuccess(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取支付信息错误："+e.toString()));
    }
}

export function* watchFetchPayInfo() {
    yield takeEvery(ActionTypes.FetchPayInfo, fetchPayInfo);
}