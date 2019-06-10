import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';


// 获取订单信息
function* fetchOrderInfo(action) {
    try {
        const result = yield call(Api.fetchAfterSaleInfo);
        yield put(Actions.FetchAfterSaleInfoSuccess(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单信息错误："+e.toString()));
    }
}

export function* watchFetchOrderInfo() {
    yield takeEvery(ActionTypes.FetchAfterSaleInfo, fetchOrderInfo);
}

// 提交售后申请
function* uploadAfterSaleInfo(action) {
    try {
        // const result = yield call(Api.fetchAfterSaleInfo);
        yield put(Actions.UploadAfterSaleInfoSuccess());
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("提交售后申请错误："+e.toString()));
    }
}

export function* watchUploadAfterSaleInfo() {
    yield takeEvery(ActionTypes.UploadAfterSaleInfo, uploadAfterSaleInfo);
}
