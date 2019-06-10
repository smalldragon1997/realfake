import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});
export const Init = (seriesId) => ({
    type : ActionType.Init,seriesId
});

export const Success = (result) => ({
    type : ActionType.Success,
    result
});

export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

export const Fetching = (seriesId,scrollId) => ({
    type : ActionType.Fetching,
    seriesId,scrollId
});

export const FetchCommoditySuccess = (result) => ({
    type : ActionType.FetchCommoditySuccess,
    result
});