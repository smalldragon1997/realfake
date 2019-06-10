import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

function* fetchHeader(action) {
    try {
        let result = yield call(Api.fetchBrandList);
        yield put(Actions.BrandListSuccess(result.data));
        result = yield call(Api.fetchSeriesList);
        yield put(Actions.SeriesListSuccess(result.data));
        result = yield call(Api.fetchUniteList);
        yield put(Actions.UniteListSuccess(result.data));
        result = yield call(Api.fetchTypeList);
        yield put(Actions.TypeListSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取header错误："+e.toString()));
    }
}

export function* watchFetchHeader() {
    yield takeEvery(ActionTypes.HeaderFetching, fetchHeader);
}


function* saveInfo(action) {
    try {
        yield put(Actions.Success(action.info));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("跳转时发生错误："+e.toString()));
    }
}

export function* watchSaveInfo() {
    yield takeEvery(ActionTypes.SaveInfo, saveInfo);
}


function* fetchExpressList(action) {
    try {
        const result = yield call(Api.getExpressList);
        yield put(Actions.FetchExpressListSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取快递列表时发生错误："+e.toString()));
    }
}

export function* watchFetchExpressList() {
    yield takeEvery(ActionTypes.FetchExpressList, fetchExpressList);
}

// 使用令牌登录
function* authJwt(action) {
    try {
        const result = yield call(Api.loginWithJwt,{
            jwt:action.jwt
        });
        yield put(Actions.SaveInfo(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("验证jwt时发生错误："+e.toString()));
    }
}

export function* watchAuthJwt() {
    yield takeEvery(ActionTypes.JwtLogin, authJwt);
}

// 退出登录
function* logOut(action) {

    try {
        const result = yield call(Api.logout,{
            jwt:action.jwt,
            userId:action.userId
        });

        yield put(Actions.ExitSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("退出登录时发生错误："+e.toString()));
    }
}

export function* watchLogOut() {
    yield takeEvery(ActionTypes.Exit, logOut);
}