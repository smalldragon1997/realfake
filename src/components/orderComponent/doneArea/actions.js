import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});


export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});



export const FetchEvaluateInfo = (userId,orderId) => ({
    type : ActionType.FetchEvaluateInfo,
    userId,orderId
});

export const FetchEvaluateInfoSuccess = (result) => ({
    type : ActionType.FetchEvaluateInfoSuccess,
    result
});


