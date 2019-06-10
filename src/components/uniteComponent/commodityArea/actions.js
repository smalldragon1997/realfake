import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Success = (result) => ({
    type : ActionType.Success,
    result
});

export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

export const Fetching = (uniteId,scrollId) => ({
    type : ActionType.Fetching,
    uniteId,scrollId
});

export const Init = (uniteId) => ({
    type : ActionType.Init,uniteId
});
export const FetchCommoditySuccess = (result) => ({
    type : ActionType.FetchCommoditySuccess,
    result
});