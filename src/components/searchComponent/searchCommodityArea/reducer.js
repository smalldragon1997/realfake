import * as ActionTypes from './actionTypes';
import { message } from 'antd';
const initState = {
    scrollId:undefined,
    showLoadMore: true,
    isLoading:true,
    commList:[]
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
        case ActionTypes.LikeSuccess: {
            let opt = action.list;
            const length = opt.length;
            for (let i = 0; i < length; i++) {
                if (opt[i].describe.length > 100) {
                    if (opt[i].id === action.id){
                        opt[i].isLike = !opt[i].isLike;
                        opt[i].like++;
                        break;
                    }
                }
            }
            message.success("收藏成功");
            return {...state}
        }
        case ActionTypes.DislikeSuccess: {
            let opt = action.list;
            const length = opt.length;
            for (let i = 0; i < length; i++) {
                if (opt[i].describe.length > 100) {
                    if (opt[i].id === action.id){
                        opt[i].isLike = !opt[i].isLike;
                        opt[i].like--;
                        break;
                    }
                }
            }
            message.success("取消收藏成功");
            return {...state}
        }
        default:
            return state;
    }
}

const init = {

    brandId:undefined,
    typeId:undefined,
    seriesId:undefined,
    price:undefined,
    sort:undefined,
    desc:true
};