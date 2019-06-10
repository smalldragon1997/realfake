import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 售后
function* returnOrder(action) {
    try {
        // const result = yield call(Api.fetchPayOrders);
        yield put(Actions.ReturnSuccess());
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("提交售后错误："+e.toString()));
    }
}

export function* watchReturnOrder() {
    yield takeEvery(ActionTypes.ReturnOrder, returnOrder);
}

// 获取支付信息
function* fetchDeliverInfo(action) {
    try {
        const result = yield call(Api.fetchDeliverInfo);
        yield put(Actions.FetchDeliverInfoSuccess(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单信息错误："+e.toString()));
    }
}

export function* watchFetchDeliverInfo() {
    yield takeEvery(ActionTypes.FetchDeliverInfo, fetchDeliverInfo);
}