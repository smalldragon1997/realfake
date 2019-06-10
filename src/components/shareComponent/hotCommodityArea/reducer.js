import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    list:[],
    isLoading:true
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Success: {
            return {...state, ...action.result,isLoading:false}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        default:
            return state;
    }
}