import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});


export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});


export const Submit = () => ({
    type : ActionType.Submit,
});
export const SubmitSuccess = () => ({
    type : ActionType.SubmitSuccess
});


export const FetchPayInfo = (userId,orderId) => ({
    type : ActionType.FetchPayInfo,
    userId,orderId
});

export const FetchPayInfoSuccess = (result) => ({
    type : ActionType.FetchPayInfoSuccess,
    result
});


