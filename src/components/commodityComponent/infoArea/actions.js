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

export const Fetching = (commId) => ({
    type : ActionType.Fetching,
    commId
});
export const LikeSuccess = (commId) => ({
    type : ActionType.LikeSuccess,
    commId
});
export const DisLikeSuccess = (commId) => ({
    type : ActionType.DisLikeSuccess,
    commId
});

export const Like = (commId) => ({
    type : ActionType.Like,
    commId
});
export const DisLike = (commId) => ({
    type : ActionType.DisLike,
    commId
});
export const FetchComment = (commId) => ({
    type : ActionType.FetchComment,
    commId
});
export const FetchCommentSuccess = (result) => ({
    type : ActionType.FetchCommentSuccess,
    result
});
export const OnlyShow = () => ({
    type : ActionType.OnlyShow,

});
export const AllComments = () => ({
    type : ActionType.AllComments,

});