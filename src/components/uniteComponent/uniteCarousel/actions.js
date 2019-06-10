import * as ActionType from './actionTypes';
//
export const Start = () => ({
    type : ActionType.Start
});
// 获取
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
export const Fetching = (uniteId) => ({
    type : ActionType.Fetching,
    uniteId
});