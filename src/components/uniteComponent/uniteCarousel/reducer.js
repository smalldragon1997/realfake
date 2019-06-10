import * as ActionTypes from './actionTypes';
import { message } from 'antd';
const initState = {
    uniteInfo:undefined,
    isLoading:true,
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Success: {
            const data = action.result.data;
            if(action.result.status==="200"){
                return {...state, uniteInfo:data.uniteInfo,isLoading:false}
            }else{
                return {...state,isLoading:false}
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
