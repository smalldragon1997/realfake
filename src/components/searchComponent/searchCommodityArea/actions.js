import * as ActionType from './actionTypes';
//
export const Start = () => ({
    type : ActionType.Start
});
// 获取搜索结果
export const Success = (result) => ({
    type : ActionType.Success,
    result
});
// 获取结果失败
export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});
// 获取动作
export const Search = (searchInfo,scrollId) => ({
    type : ActionType.Search,searchInfo,scrollId
});
export const Init = (searchInfo) => ({
    type : ActionType.Init,searchInfo
});
// 收藏
export const Like = (id,list) => ({
    type : ActionType.Like,
    id,
    list
});
// 取消收藏
export const Dislike = (id,list) => ({
    type : ActionType.Dislike,
    id,
    list
});

// 收藏成功
export const LikeSuccess = (id,list) => ({
    type : ActionType.LikeSuccess,
    id,
    list
});
// 取消收藏成功
export const DislikeSuccess = (id,list) => ({
    type : ActionType.DislikeSuccess,
    id,
    list
});