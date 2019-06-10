import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    isLoading:false, // 在用户未登录情况下不显示加载状态
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.FetchingOrdersSuccess: {
            return {...state, ...action.result,isLoading:false}
        }

        case ActionTypes.CancelAfterSaleSuccess: {
            let newList = state.list;

            for(let i=0;i<newList.length;i++){
                if(newList[i].orderId===action.orderId){
                    newList[i].isDone=true;
                    // newList[i].afterSale.doneDate=new Date().getTime();
                    break;
                }
            }

            return {...state,isLoading:false,list:newList}
        }
        case ActionTypes.CancelOrderSuccess: {

            let newList = state.list;

            for(let i=0;i<newList.length;i++){
                if(newList[i].orderId===action.orderId){
                    newList.remove(i);
                    break;
                }
            }

            return {...state,list:newList,isLoading:false}
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