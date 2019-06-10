import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    isLoading:false, // 在用户未登录情况下不显示加载状态
    payInfo:undefined, // 未支付订单信息
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.SubmitSuccess: {
            message.success("提交支付成功，正在跳转");
            return {...state,isLoading:false}
        }
        case ActionTypes.FetchPayInfoSuccess: {

            console.log(action.result);
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