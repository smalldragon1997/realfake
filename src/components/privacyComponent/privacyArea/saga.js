import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as HeaderActions from '../../shareComponent/header/actions';
import * as ActionTypes from './actionTypes';
import md5 from 'md5';
import {getData} from '../../../utils';


// 获取代金卷列表
function* fetchDiscount(action) {
    try {
        const result = yield call(Api.fetchDiscountList, {
            jwt: action.jwt,
            userId: action.userId
        });
        yield put(Actions.FetchDiscountSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取代金卷列表错误：" + e.toString()));
    }
}

export function* watchFetchDiscount() {
    yield takeEvery(ActionTypes.FetchDiscount, fetchDiscount);
}

// 获取代金卷列表
function* fetchCarList(action) {
    try {
        const result = yield call(Api.fetchCarList, {
            jwt: action.jwt,
            userId: action.userId
        });
        yield put(Actions.FetchCarSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取购物车列表错误：" + e.toString()));
    }
}

export function* watchFetchCar() {
    yield takeEvery(ActionTypes.FetchCar, fetchCarList);
}

// 获取代金卷列表
function* fetchLikeList(action) {
    try {
        const result = yield call(Api.fetchLikeList, {
            jwt: action.jwt,
            userId: action.userId
        });
        yield put(Actions.FetchLikeSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取购物车列表错误：" + e.toString()));
    }
}

export function* watchFetchLike() {
    yield takeEvery(ActionTypes.FetchLike, fetchLikeList);
}

// 获取代金卷列表
function* fetchAddressList(action) {
    try {
        const result = yield call(Api.fetchAddressList, {
            jwt: action.jwt,
            userId: action.userId
        });
        yield put(Actions.FetchAddressSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取地址列表错误：" + e.toString()));
    }
}

export function* watchFetchAddress() {
    yield takeEvery(ActionTypes.FetchAddress, fetchAddressList);
}

function* deleteAddress(action) {
    try {
        const result = yield call(Api.deleteAddress, {
            jwt: action.jwt,
            userId: action.userId,
            addressId: action.addressId,
        });
        yield put(Actions.DelAddressSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除地址错误：" + e.toString()));
    }
}

export function* watchDelAddress() {
    yield takeEvery(ActionTypes.DelAddress, deleteAddress);
}

//添加地址信息
function* addAddress(action) {
    try {
        const result = yield call(Api.addAddress, {
            jwt: action.jwt,
            area: action.addressInfo.area.reduce((area, next) => (area + next), ""),
            detail: action.addressInfo.detail,
            tel: action.addressInfo.tel,
            name: action.addressInfo.name,
            userId: action.userId
        });
        yield put(Actions.AddAddressSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加地址信息错误：" + e.toString()));
    }
}

export function* watchAddAddress() {
    yield takeEvery(ActionTypes.AddAddress, addAddress);
}

// 修改

function* updateCar(action) {
    try {
        const result = yield call(Api.updateCar, {
            jwt: action.jwt,
            userId: action.carInfo.userId,
            commId: action.carInfo.commId,
            qualId: action.carInfo.qualId,
            sizeId: action.carInfo.sizeId,
        });
        yield put(Actions.AlterCarSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("修改购物车信息错误：" + e.toString()));
    }
}

export function* watchAlterCar() {
    yield takeEvery(ActionTypes.AlterCar, updateCar);
}

//添加
function* addCar(action) {
    try {
        const result = yield call(Api.addCar, {
            jwt: action.jwt,
            userId: action.carInfo.userId,
            commId: action.carInfo.commId,
            qualId: action.carInfo.qualId,
            sizeId: action.carInfo.sizeId,
        });
        yield put(Actions.AddCarSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加购物车信息错误：" + e.toString()));
    }
}

export function* watchAddCar() {
    yield takeEvery(ActionTypes.AddCar, addCar);
}

//添加
function* addLike(action) {
    try {
        const result = yield call(Api.addLike, {
            jwt: action.jwt,
            userId: action.userId,
            commId: action.commId,
        });
        yield put(Actions.AddLikeSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加收藏信息错误：" + e.toString()));
    }
}

export function* watchAddLike() {
    yield takeEvery(ActionTypes.AddLike, addLike);
}

// 删除
function* deleteLike(action) {
    try {
        const result = yield call(Api.deleteLike, {
            jwt: action.jwt,
            userId: action.userId,
            commId: action.commId,
        });
        yield put(Actions.DelLikeSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("取消收藏信息错误：" + e.toString()));
    }
}

export function* watchDelLike() {
    yield takeEvery(ActionTypes.DelLike, deleteLike);
}

// 删除
function* deleteCar(action) {
    try {
        const result = yield call(Api.deleteCar, {
            jwt: action.jwt,
            userId: action.carInfo.userId,
            commId: action.carInfo.commId,
            qualId: action.carInfo.qualId,
            sizeId: action.carInfo.sizeId
        });
        yield put(Actions.DelCarSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除购物车信息错误：" + e.toString()));
    }
}

export function* watchDelCar() {
    yield takeEvery(ActionTypes.DelCar, deleteCar);
}

// 获取用户信息
function* fetch(action) {
    try {
        const result = yield call(Api.login, {
            username: action.username,
            pwdWithMD5: md5(action.password),
            rememberMe: action.rememberMe
        });
        yield put(Actions.FetchInfoSuccess(result.data));
        yield put(HeaderActions.SaveInfo(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("登录错误：" + e.toString()));
    }
}

export function* watchFetchUser() {
    yield takeEvery(ActionTypes.FetchInfo, fetch);
}

function* register(action) {
    try {
        const result = yield call(Api.register, {
            username: action.registerInfo.username,
            pwdWithMD5: md5(action.registerInfo.password),
            nickname: action.registerInfo.nickname,
            icon: action.registerInfo.icon
        });
        yield put(Actions.RegisterSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("注册错误：" + e.toString()));
    }
}

export function* watchRegister() {
    yield takeEvery(ActionTypes.Register, register);
}

// 修改昵称
function* alterInfo(action) {
    try {
        const result = yield call(Api.updateUserInfo, {
            userId: action.userInfo.userId,
            icon: action.userInfo.icon,
            nickname: action.userInfo.nickname,
            jwt: action.jwt
        });
        yield put(Actions.AlterUserInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("修改信息错误：" + e.toString()));
    }
}

export function* watchAlterUserInfo() {
    yield takeEvery(ActionTypes.AlterUserInfo, alterInfo);
}


//修改修改密码
function* alterPwd(action) {
    try {
        const result = yield call(Api.updatePwd, {
            userId: action.pwdInfo.userId,
            pwdWithMD5: md5(action.pwdInfo.oldPwd),
            newPwd: md5(action.pwdInfo.newPwd),
            jwt: action.jwt
        });
        yield put(Actions.AlterPwdSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("修改密码错误：" + e.toString()));
    }
}

export function* watchAlterPwd() {
    yield takeEvery(ActionTypes.AlterPwd, alterPwd);
}


//获取未完成订单
function* fetchProcessOrderList(action) {
    try {
        const result = yield call(Api.getProcessOrderList, {
            userId: action.userId,
            jwt: action.jwt
        });
        yield put(Actions.FetchProcessOrderListSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取未完成订单错误：" + e.toString()));
    }
}

export function* watchFetchProcessOrderList() {
    yield takeEvery(ActionTypes.FetchProcessOrderList, fetchProcessOrderList);
}


//获取已完成订单
function* fetchDoneOrderList(action) {
    try {
        const result = yield call(Api.getDoneOrderList, {
            userId: action.userId,
            jwt: action.jwt
        });
        yield put(Actions.FetchDoneOrderListSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取已完成订单错误：" + e.toString()));
    }
}

export function* watchFetchDoneOrderList() {
    yield takeEvery(ActionTypes.FetchDoneOrderList, fetchDoneOrderList);
}

//获取订单信息
function* fetchOrderInfo(action) {
    try {
        const result = yield call(Api.getOrderInfo, {
            userId: action.userId,
            orderId: action.orderId,
            jwt: action.jwt
        });
        yield put(Actions.FetchOrderInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单信息错误：" + e.toString()));
    }
}

export function* watchFetchOrderInfo() {
    yield takeEvery(ActionTypes.FetchOrderInfo, fetchOrderInfo);
}


//获取售后列表
function* fetchAfterSaleList(action) {
    try {
        const result = yield call(Api.getAfterSaleList, {
            userId: action.userId,
            jwt: action.jwt
        });
        yield put(Actions.FetchAfterSaleListSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取售后列表错误：" + e.toString()));
    }
}

export function* watchFetchAfterSaleList() {
    yield takeEvery(ActionTypes.FetchAfterSaleList, fetchAfterSaleList);
}


//获取售后信息
function* fetchAfterSaleInfo(action) {
    try {
        const result = yield call(Api.getAfterSaleInfo, {
            userId: action.userId,
            aftId: action.aftId,
            jwt: action.jwt
        });
        yield put(Actions.FetchAfterSaleInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取售后信息错误：" + e.toString()));
    }
}

export function* watchFetchAfterSaleInfo() {
    yield takeEvery(ActionTypes.FetchAfterSaleInfo, fetchAfterSaleInfo);
}


//提交订单
function* commitOrder(action) {
    try {
        const result = yield call(Api.commitOrder, {
            userId: action.orderInfo.userId,
            commId: action.orderInfo.commId,
            qualId: action.orderInfo.qualId,
            sizeId: action.orderInfo.sizeId,
            disId: action.orderInfo.disId,
            addId: action.orderInfo.addId,
            expId: action.orderInfo.expId,
            message: action.orderInfo.message,
            jwt: action.jwt
        });
        yield put(Actions.CommitOrderSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("提交订单错误：" + e.toString()));
    }
}

export function* watchCommitOrder() {
    yield takeEvery(ActionTypes.CommitOrder, commitOrder);
}


// 支付订单
function* payOrder(action) {
    try {
        const result = yield call(Api.payOrder, {
            userId: action.payInfo.userId,
            orderId: action.payInfo.orderId,
            isType: action.payInfo.isType,
            jwt: action.jwt
        });
        yield put(Actions.PayOrderSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("支付订单错误：" + e.toString()));
    }
}

export function* watchPayOrder() {
    yield takeEvery(ActionTypes.PayOrder, payOrder);
}


// 测试支付结果
function* testPayDone(action) {
    try {

        const result = yield call(Api.notify, {
            payId: action.payId
        });
        yield put(Actions.TestPayDoneSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取支付结果错误：" + e.toString()));
    }
}

export function* watchTestPayDone() {
    yield takeEvery(ActionTypes.TestPayDone, testPayDone);
}

// 获取支付结果
function* fetchPayResult(action) {
    try {

        const result = yield call(Api.getOrderInfo, {
            userId: action.userId,
            orderId: action.orderId,
            jwt: action.jwt
        });
        yield put(Actions.FetchPayResultSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取支付结果错误：" + e.toString()));
    }
}

export function* watchFetchPayResult() {
    yield takeEvery(ActionTypes.FetchPayResult, fetchPayResult);
}


// 申请售后
function* applyAfterSale(action) {
    try {

        const result = yield call(Api.addAfterSale, {
            userId: action.afterSaleInfo.userId,
            orderId: action.afterSaleInfo.orderId,
            commId: action.afterSaleInfo.commId,
            reason: action.afterSaleInfo.reason,
            afterPics: action.afterSaleInfo.afterPics,
            jwt: action.jwt
        });
        yield put(Actions.ApplyAfterSaleSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("申请售后错误：" + e.toString()));
    }
}

export function* watchApplyAfterSale() {
    yield takeEvery(ActionTypes.ApplyAfterSale, applyAfterSale);
}


// 取消售后
function* cancelAfterSale(action) {
    try {

        const result = yield call(Api.deleteAfterSale, {
            userId: action.cancelInfo.userId,
            orderId: action.cancelInfo.orderId,
            commId: action.cancelInfo.commId,
            aftId: action.cancelInfo.aftId,
            jwt: action.jwt
        });
        yield put(Actions.CancelAfterSaleSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("取消售后错误：" + e.toString()));
    }
}

export function* watchCancelAfterSale() {
    yield takeEvery(ActionTypes.CancelAfterSale, cancelAfterSale);
}


// 确认收货
function* confirmOrder(action) {
    try {

        const result = yield call(Api.updateOrderInfo, {
            userId: action.confirmInfo.userId,
            orderId: action.confirmInfo.orderId,
            state: 4,
            jwt: action.jwt
        });
        yield put(Actions.ConfirmOrderSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("确认收货错误：" + e.toString()));
    }
}

export function* watchConfirmOrder() {
    yield takeEvery(ActionTypes.ConfirmOrder, confirmOrder);
}


// 评价订单
function* evaluate(action) {
    try {

        const result = yield call(Api.evaluate, {
            userId: action.evaluateInfo.userId,
            orderId: action.evaluateInfo.orderId,
            showPics: action.evaluateInfo.showPics,
            content: action.evaluateInfo.content,
            jwt: action.jwt
        });
        yield put(Actions.EvaluateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("评价订单错误：" + e.toString()));
    }
}

export function* watchEvaluate() {
    yield takeEvery(ActionTypes.Evaluate, evaluate);
}

// 修改售后
function* updateAfterSale(action) {
    try {

        const result = yield call(Api.updateAfterSaleInfo, {
            userId: action.info.userId,
            aftId: action.info.aftId,
            orderId: action.info.orderId,
            commId: action.info.commId,
            afterPics: action.info.afterPics,
            reason: action.info.reason,
            jwt: action.jwt
        });
        yield put(Actions.UpdateAfterSaleSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("修改售后申请错误：" + e.toString()));
    }
}

export function* watchUpdateAfterSale() {
    yield takeEvery(ActionTypes.UpdateAfterSale, updateAfterSale);
}

// 删除订单
function* deleteOrder(action) {
    try {

        const result = yield call(Api.deleteOrder, {
            userId: action.userId,
            orderId: action.orderId,
            jwt: action.jwt
        });
        yield put(Actions.DeleteOrderSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除订单错误：" + e.toString()));
    }
}

export function* watchDeleteOrder() {
    yield takeEvery(ActionTypes.DeleteOrder, deleteOrder);
}