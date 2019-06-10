import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    try {
        const result = yield call(Api.fetchLotCommodities,{
            seriesId:action.seriesId,
            scrollId:action.scrollId,
            pageSize:20,
            sort:"date",
            desc:true
        });
        yield put(Actions.FetchCommoditySuccess(result.data));
    } catch (e) {
        console.log(e);
        const result = yield call(Api.fetchLotCommodities,{
            seriesId:action.seriesId,
            scrollId:undefined,
            pageSize:20,
            sort:"date",
            desc:true
        });
        yield put(Actions.FetchCommoditySuccess(result.data));
    }
}

export function* watchFetchSeriesCommodities() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}

export function* watchInitSeriesCommodities() {
    yield takeEvery(ActionTypes.Init, fetch);
}