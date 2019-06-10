import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    isLoading:false,
    registerDone:false,
    payDone:false,
    likeList:[],
    discountList:[],
    addressList:[],
    carList:[],
    processOrderList:[],
    doneOrderList:[],
    afterSaleList:[],
    orderInfo:undefined,
    payInfo:undefined,
    afterSaleInfo:undefined,
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.Init: {
            return {
                isLoading:false,
                registerDone:false,
                payDone:false,
                likeList:[],
                discountList:[],
                addressList:[],
                carList:[],
                processOrderList:[],
                doneOrderList:[],
                afterSaleList:[],
                orderInfo:undefined,
                payInfo:undefined,
                afterSaleInfo:undefined,
            }
        }

        case ActionTypes.PayStateInit: {
            return {...state , payDone:false,payInfo:undefined,isLoading:false}
        }

        case ActionTypes.TradeInit: {
            return {...state , orderInfo:undefined,isLoading:false}
        }
        case ActionTypes.FetchPayResultSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                if(data.orderInfo.state!==1){
                    return {...state ,payDone:true,payInfo:undefined,isLoading:false}
                }else{
                    message.error("支付状态正在更新中，请等待几秒再试");
                    return {...state ,isLoading:false}
                }
            }
        }

        case ActionTypes.TestPayDoneSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("支付成功，谢谢支持");

            }
            return {...state,payDone:true,payInfo:undefined,orderInfo:undefined,isLoading:false}
        }
        case ActionTypes.DeleteOrderSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("删除订单成功");
            }
            return {...state,isLoading:false}
        }

        case ActionTypes.UpdateAfterSaleSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("修改售后申请成功");
            }
            return {...state,isLoading:false}
        }

        case ActionTypes.EvaluateSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("评价订单成功");
            }
            return {...state,isLoading:false}
        }

        case ActionTypes.ConfirmOrderSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("确认收货成功");
            }
            return {...state,isLoading:false}
        }

        case ActionTypes.CommitOrderSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,orderInfo:data.orderInfo,isLoading:false}
            }
        }

        case ActionTypes.CancelAfterSaleSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("撤回售后申请成功");
            }
            return {...state,isLoading:false}
        }

        case ActionTypes.PayOrderSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,payInfo:data.payInfo,isLoading:false}
            }
        }
        case ActionTypes.ApplyAfterSaleSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("售后申请成功");
            }
            return {...state,isLoading:false}
        }
        case ActionTypes.FetchAfterSaleInfoSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,afterSaleInfo:data.afterSaleInfo,isLoading:false}
            }
        }
        case ActionTypes.FetchOrderInfoSuccess: {
            console.log(action.result)
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,orderInfo:data.orderInfo,isLoading:false}
            }
        }
        case ActionTypes.FetchAfterSaleListSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,afterSaleList:data.afterSaleList,isLoading:false}
            }
        }
        case ActionTypes.FetchDoneOrderListSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,doneOrderList:data.doneOrderList,isLoading:false}
            }
        }
        case ActionTypes.FetchProcessOrderListSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,processOrderList:data.processOrderList,isLoading:false}
            }
        }


        case ActionTypes.FetchCarSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,carList:data.carList,isLoading:false}
            }
        }

        case ActionTypes.FetchLikeSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,likeList:data.likeList,isLoading:false}
            }
        }

        case ActionTypes.FetchAddressSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,addressList:data.addressList,isLoading:false}
            }
        }

        case ActionTypes.FetchDiscountSuccess: {
            const data  = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state ,discountList:data.discountList,isLoading:false}
            }
        }

        case ActionTypes.DelCarSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("删除购物车成功");
            }
            return {...state ,isLoading:false}
        }

        case ActionTypes.DelLikeSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("取消收藏成功");
            }
            return {...state ,isLoading:false}
        }

        case ActionTypes.AddLikeSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("收藏成功");
            }
            return {...state ,isLoading:false}
        }

        case ActionTypes.AddCarSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("已添加到购物车");
            }
            return {...state ,isLoading:false}
        }

        case ActionTypes.AlterCarSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
            }
            return {...state ,isLoading:false}
        }
        case ActionTypes.FetchInfoSuccess: {
            if(action.result.status!=="200"){
                return {...state,isLoading:false}
            }else{
                message.success("登录成功，正在跳转");
                return {...state ,isLoading:false}
            }
        }
        case ActionTypes.RegisterSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                message.success("注册成功，请登录~");
                return {...state ,registerDone:true,isLoading:false}
            }
        }
        case ActionTypes.AlterPwdSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("更新密码成功,请重新登录");
            }
            return {...state,isLoading: false}
        }
        case ActionTypes.AlterUserInfoSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("更新个人信息成功");
            }
            return {...state,isLoading: false}
        }
        case ActionTypes.AddAddressSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("添加收货成功");
            }
            return {...state,isLoading: false}
        }
        case ActionTypes.DelAddressSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("删除地址成功");
            }
            return {...state,isLoading: false}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        default:
            return state;
    }
}
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) { return false; }
    for (let i = 0, n = 0; i < this.length; i++) {
        if (this[i] !== this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
};