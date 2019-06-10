import {watchFetchSearchCommodity} from '../../components/searchComponent/searchCommodityArea/saga'
import {watchLikeNewCommodity} from '../../components/searchComponent/searchCommodityArea/saga'
import {watchInitSearchCommodities} from '../../components/searchComponent/searchCommodityArea/saga'
import {watchDislikeNewCommodity} from '../../components/searchComponent/searchCommodityArea/saga'
import {watchFetchRecommendSearch} from '../../components/shareComponent/recommendSearchArea/saga'

export const searchCommoditySaga = watchFetchSearchCommodity;
export const watchInitSearchCommoditiesSaga = watchInitSearchCommodities;
export const likeCommoditySaga = watchLikeNewCommodity;
export const dislikeCommoditySaga = watchDislikeNewCommodity;
export const recommendSearchSaga = watchFetchRecommendSearch;