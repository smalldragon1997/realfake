import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 提交订单
function* submit(action) {
    try {
        // const result = yield call(Api.fetchPayOrders);
        yield put(Actions.SubmitSuccess("1","1"));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("提交订单错误："+e.toString()));
    }
}

export function* watchFetchSubmitOrder() {
    yield takeEvery(ActionTypes.Submit, submit);
}

// 获取可选快递
function* fetchExpress(action) {
    try {
        const result = yield call(Api.fetchExpress);
        yield put(Actions.FetchExpressSuccess(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取可选快递错误："+e.toString()));
    }
}

export function* watchFetchFetchExpress() {
    yield takeEvery(ActionTypes.FetchExpress, fetchExpress);
}