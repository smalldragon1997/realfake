import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});


export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});



export const FetchTakeInfo = (userId,orderId) => ({
    type : ActionType.FetchTakeInfo,
    userId,orderId
});

export const FetchTakeInfoSuccess = (result) => ({
    type : ActionType.FetchTakeInfoSuccess,
    result
});


