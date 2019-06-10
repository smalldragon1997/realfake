import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取代付款订单
function* fetchPays(action) {
    try {
        const result = yield call(Api.fetchOrders);
        yield put(Actions.FetchingOrdersSuccess(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单错误："+e.toString()));
    }
}

export function* watchFetchOrders() {
    yield takeEvery(ActionTypes.FetchingOrders, fetchPays);
}

// 取消订单
function* cancelOrder(action) {
    try {
        // const result = yield call(Api.fetchDoneOrders);
        yield put(Actions.CancelOrderSuccess(action.orderId));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("取消订单错误："+e.toString()));
    }
}

export function* watchCancelOrder() {
    yield takeEvery(ActionTypes.CancelOrder, cancelOrder);
}


// 取消售后申请
function* cancelAfterSale(action) {
    try {
        // const result = yield call(Api.fetchAfterSaleInfo);
        yield put(Actions.CancelAfterSaleSuccess(action.orderId));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("取消售后申请错误："+e.toString()));
    }
}

export function* watchCancelAfterSale() {
    yield takeEvery(ActionTypes.CancelAfterSale, cancelAfterSale);
}