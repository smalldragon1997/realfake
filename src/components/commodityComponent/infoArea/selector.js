import { createSelector } from 'reselect'


// 获取商品列表和系列id
const getCommentList = (state,props) => state;
const getFilter = (state,props) => props;

export const getCommentsWithShow = createSelector(
    [ getCommentList ,getFilter],
    (commentList,filter) => {
        if(filter){
            return commentList.filter(
                item => !(item.show===undefined)
            )
        }else{
            return commentList;
        }

    }
);
