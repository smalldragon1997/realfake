import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    isLoading:false, // 在用户未登录情况下不显示加载状态
    deliverInfo:undefined, // 代发货订单信息
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.FetchDeliverInfoSuccess: {
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