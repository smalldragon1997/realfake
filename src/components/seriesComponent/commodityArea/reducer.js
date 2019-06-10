import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    scrollId:undefined,
    showLoadMore: true,
    commList:[],
    isLoading:true
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.Init: {
            return {...state,
                scrollId:undefined,
                showLoadMore: true,
                commList:[]
            }
        }
        case ActionTypes.Success: {
            return {...state, list:action.result.commList,isLoading:false}
        }
        case ActionTypes.FetchCommoditySuccess: {
            let data = action.result.data;
            if(action.result.status==="200"){
                let opt = data.commodityList;
                let isDone = false;
                if (opt.length === 0)
                    isDone = true;
                return {...state, commList: state.commList.concat(opt), isLoading: false, showLoadMore: !isDone,scrollId:data.scrollId}
            }else{
                message.error(action.result.msg);
                return {...state, isLoading: false}
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