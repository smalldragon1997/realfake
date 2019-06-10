import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    try {
        const result = yield call(Api.fetchBrandInfo,{
            brandId:action.brandId
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取品牌信息错误："+e.toString()));
    }
}

export function* watchFetchBrandCarousel() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}

function* fetchCommodities(action) {
    try {
        const result = yield call(Api.fetchLotCommodities,{
            brandId:action.brandId,
            pageNum:1,
            pageSize:1000,
        });
        yield put(Actions.FetchCommoditySuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取商品列表错误："+e.toString()));
    }
}

export function* watchFetchBrandCommodities() {
    yield takeEvery(ActionTypes.Fetching, fetchCommodities);
}