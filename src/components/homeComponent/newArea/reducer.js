import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    commodityList: [],
    showLoadMore: true,
    isLoading: true,
    scrollId:undefined,
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state, isLoading: true}
        }
        case ActionTypes.Success: {
            let data = action.result.data;
            if(action.result.status==="200"){
                let opt = data.commodityList;
                for (let i = 0; i < opt.length; i++) {
                    if (opt[i].describe.length > 100) {
                        opt[i].describe = opt[i].describe.slice(0, 100) + "...";
                    }
                }
                let isDone = false;
                if (opt.length === 0)
                    isDone = true;
                return {...state, commodityList: state.commodityList.concat(opt), isLoading: false, showLoadMore: !isDone,scrollId:data.scrollId}
            }else{
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state, isLoading: false}
        }
        default:
            return state;
    }
}