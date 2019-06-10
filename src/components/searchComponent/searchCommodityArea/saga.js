import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    try {
        const result = yield call(Api.fetchSearchCommodity,{
            scrollId:action.scrollId,
            pageSize:action.searchInfo.pageSize,
            keyWord:action.searchInfo.keyWord,
            brandId:action.searchInfo.brandId,
            seriesId:action.searchInfo.seriesId,
            typeId:action.searchInfo.typeId,
            uniteId:action.searchInfo.uniteId,
            desc:action.searchInfo.desc,
            sort:action.searchInfo.sort,
            dateStart:action.searchInfo.dateStart,
            dateEnd:action.searchInfo.dateEnd,
            price:action.searchInfo.price,
        });

        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        const result = yield call(Api.fetchSearchCommodity,{
            scrollId:undefined,
            pageSize:action.searchInfo.pageSize,
            keyWord:action.searchInfo.keyWord,
            brandId:action.searchInfo.brandId,
            seriesId:action.searchInfo.seriesId,
            typeId:action.searchInfo.typeId,
            uniteId:action.searchInfo.uniteId,
            desc:action.searchInfo.desc,
            sort:action.searchInfo.sort,
            dateStart:action.searchInfo.dateStart,
            dateEnd:action.searchInfo.dateEnd,
            price:action.searchInfo.price,
        });
        yield put(Actions.Success(result.data));
    }
}

export function* watchFetchSearchCommodity() {
    yield takeEvery(ActionTypes.Search, fetch);
}
export function* watchInitSearchCommodities() {
    yield takeEvery(ActionTypes.Init, fetch);
}

function* like(action) {
    try {
        // const result = yield call(Api.fetchNewCommodity);
        yield put(Actions.LikeSuccess(action.id,action.list));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("收藏错误："+e.toString()));
    }
}

export function* watchLikeNewCommodity() {
    yield takeEvery(ActionTypes.Like, like);
}

function* dislike(action) {
    try {
        // const result = yield call(Api.fetchNewCommodity);
        yield put(Actions.DislikeSuccess(action.id,action.list));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("收藏错误："+e.toString()));
    }
}

export function* watchDislikeNewCommodity() {
    yield takeEvery(ActionTypes.Dislike, dislike);
}
