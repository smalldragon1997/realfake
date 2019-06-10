import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';


// 获取售后信息
function* fetchAfterSaleInfo(action) {
    try {
        const result = yield call(Api.fetchAfterSaleInfo);
        yield put(Actions.FetchAfterSaleInfoSuccess(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单信息错误："+e.toString()));
    }
}

export function* watchFetchAfterSaleInfo() {
    yield takeEvery(ActionTypes.FetchAfterSaleInfo, fetchAfterSaleInfo);
}
