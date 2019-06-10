import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    homeInfo:[],
    isLoading:true
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Success: {

            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state,isLoading:false}
            }else{
                console.log(action.result.data)
                return {...state, ...action.result.data,isLoading:false}
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