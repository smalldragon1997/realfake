import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取购物车信息
function* fetch(action) {
    try {
        yield put(Actions.Start());
        // 判断是否登录 未登录则直接返回空数据
        if(action.userId>0){
            const result = yield call(Api.fetchOrder);
            yield put(Actions.Success({...result.data.data}));
        }
        yield put(Actions.Success());
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取购物车错误：" + e.toString()));
    }
}

export function* watchFetchDrawList() {
    yield takeEvery(ActionTypes.Fetching, fetch);
}

// 添加到购物车
function* addCar(action) {
    try {

        yield put(Actions.AddCarSuccess(action.comm));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加到购物车错误：" + e.toString()));
    }
}

export function* watchAddCar() {
    yield takeEvery(ActionTypes.AddCar, addCar);
}

// 从购物车中删除
function* delCar(action) {
    try {
        yield put(Actions.DelCarSuccess(action.comm));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("从购物车删除错误：" + e.toString()));
    }
}

export function* watchDelCar() {
    yield takeEvery(ActionTypes.DelCar, delCar);
}
