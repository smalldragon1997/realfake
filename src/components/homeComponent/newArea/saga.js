import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    yield put(Actions.Start());
    try {
        const result = yield call(Api.fetchNewCommodity,{
            scrollId:action.scrollId,
            pageSize:20,
            sort:"date",
            desc:true
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        const result = yield call(Api.fetchNewCommodity,{
            scrollId:undefined,
            pageSize:20,
            sort:"date",
            desc:true
        });
        yield put(Actions.Success(result.data));
    }
}

export function* watchFetchNewCommodity() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}