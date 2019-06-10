import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    try {
        const result = yield call(Api.fetchLotCommodities,{
            uniteId:action.uniteId,
            scrollId:action.scrollId,
            pageSize:200,
            sort:"date",
            desc:true
        });
        yield put(Actions.FetchCommoditySuccess(result.data));
    } catch (e) {
        console.log(e);
        const result = yield call(Api.fetchLotCommodities,{
            uniteId:action.uniteId,
            scrollId:undefined,
            pageSize:200,
            sort:"date",
            desc:true
        });
        yield put(Actions.FetchCommoditySuccess(result.data));
    }
}

export function* watchFetchUniteCommodity() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}

export function* watchInitUniteCommodities() {
    yield takeEvery(ActionTypes.Init, fetch);
}