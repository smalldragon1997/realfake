import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {

    commodityInfo:undefined,
    commentList:[],
    isLoading:true,
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {

        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.Success: {
            const data = action.result.data;
            if (action.result.status === "200") {
                return {...state, commodityInfo: data.commodityInfo, isLoading: false}
            } else {
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.FetchCommentSuccess: {
            const data = action.result.data;
            if (action.result.status === "200") {
                return {...state, commentList: data.commentList, isLoading: false}
            } else {
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        case ActionTypes.DisLikeSuccess: {
            message.success("取消收藏成功");
            return state
        }
        case ActionTypes.LikeSuccess: {
            message.success("收藏成功");
            return state
        }
        default:
            return state;
    }
}