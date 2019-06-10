import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    uniteList:[],
    isLoading:true
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Success: {
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                return {...state, uniteList:data.uniteList,isLoading:false}
            }
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        default:
            return state;
    }
}