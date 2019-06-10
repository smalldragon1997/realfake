import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.HeaderStart
});

export const BrandListSuccess = (result) => ({
    type : ActionType.BrandListSuccess,
    result
});
export const SeriesListSuccess = (result) => ({
    type : ActionType.SeriesListSuccess,
    result
});
export const UniteListSuccess = (result) => ({
    type : ActionType.UniteListSuccess,
    result
});
export const TypeListSuccess = (result) => ({
    type : ActionType.TypeListSuccess,
    result
});

export const Failure = (error) => ({
    type : ActionType.HeaderFailure,
    error
});

export const Fetching = () => ({
    type : ActionType.HeaderFetching
});

export const SaveInfo = (result) => ({
    type : ActionType.SaveInfo,result
});

export const JwtLogin = (jwt) => ({
    type : ActionType.JwtLogin,jwt
});

export const Exit = (userId,jwt) => ({
    type : ActionType.Exit,userId,jwt
});
export const ExitSuccess = (result) => ({
    type : ActionType.ExitSuccess,result
});

export const Success = (result) => ({
    type : ActionType.Success,
    result
});

export const FetchExpressList = () => ({
    type : ActionType.FetchExpressList,
});
export const FetchExpressListSuccess = (result) => ({
    type : ActionType.FetchExpressListSuccess,
    result
});