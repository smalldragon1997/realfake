import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    list:[]
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Success: {
            return {...state, ...action.result}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state}
        }
        default:
            return state;
    }
}