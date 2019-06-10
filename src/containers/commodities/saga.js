import {watchFetchCommodityInfo} from '../../components/commodityComponent/infoArea/saga'
import {watchDislikeCommodity} from '../../components/commodityComponent/infoArea/saga'
import {watchLikeCommodity} from '../../components/commodityComponent/infoArea/saga'
import {watchFetchComment} from '../../components/commodityComponent/infoArea/saga'

export const commodityInfoSage = watchFetchCommodityInfo;
export const disLikeSage = watchDislikeCommodity;
export const likeSage = watchLikeCommodity;
export const commentSage = watchFetchComment;