import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetch(action) {
    try {
        const result = yield call(Api.fetchCommodity,{
            commId:action.commId
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取商品信息错误："+e.toString()));
    }
}

export function* watchFetchCommodityInfo() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}

function* like(action) {
    try {
        // const result = yield call(Api.fetchNewCommodity);
        yield put(Actions.LikeSuccess());
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("收藏错误："+e.toString()));
    }
}

export function* watchLikeCommodity() {
    yield takeEvery(ActionTypes.Like, like);
}

function* dislike(action) {
    try {
        // const result = yield call(Api.fetchNewCommodity);
        yield put(Actions.DisLikeSuccess());
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("收藏错误："+e.toString()));
    }
}

export function* watchDislikeCommodity() {
    yield takeEvery(ActionTypes.DisLike, dislike);
}

function* fetchComment(action) {
    try {
        const result = yield call(Api.getCommentList,{
            commId:action.commId
        });
        yield put(Actions.FetchCommentSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取评论错误："+e.toString()));
    }
}

export function* watchFetchComment() {
    yield takeEvery(ActionTypes.FetchComment, fetchComment);
}
