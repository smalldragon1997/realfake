import * as ActionTypes from './actionTypes';
import { message } from 'antd';
const initState = {
    isLoading:true,
    list: [],
    visible:false,
    total:0 ,// 总价格，
    checkList:[],
    checked:true
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.DelCarSuccess: {
            const comm = action.comm;
            let oldList = [];
            oldList = state.list;
            for(let i=0;i<oldList.length;i++){
                if(oldList[i].id===comm.id){
                    oldList.remove(i);
                }
            }
            message.success("操作成功");
            return {...state,total:0,list:oldList,checkList:[],checked:!state.checked}
        }
        case ActionTypes.AddCarSuccess: {
            message.success("添加到购物车成功");
            return {...state,list:state.list.concat(action.comm)}
        }
        case ActionTypes.Start: {
            return {...state,visible:true}
        }
        case ActionTypes.Success: {
            return {...state,...action.result,isLoading:false}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state}
        }
        case ActionTypes.Close: {
            return {...state,visible:false}
        }
        case ActionTypes.CheckChange: {
            let checks=[];
            if(action.price<0){
                checks = state.checkList;
                for (let i = 0;i<checks.length;i++){
                    if(action.comm.id===checks[i].id)
                        checks.remove(i);
                }
            }else{
                checks = state.checkList.concat(action.comm);
            }
            console.log(checks);
            return {...state,total:(state.total+action.price)<0?0:state.total+action.price,checkList:checks}
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