import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    isLoading:false, // 在用户未登录情况下不显示加载状态
    orderId:undefined, // 订单号
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.ClearOrderId: {
            return {...state, orderId: undefined}
        }
        case ActionTypes.SubmitSuccess: {
            message.success("提交订单成功，正在跳转");
            return {...state,isLoading:false,orderId:action.orderId}
        }
        case ActionTypes.FetchExpressSuccess: {
            return {...state,isLoading:false,...action.result}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        default:
            return state;
    }
}