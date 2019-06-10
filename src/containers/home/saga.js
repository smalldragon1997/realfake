import {watchFetchHotSeries} from '../../components/homeComponent/hotSeries/saga'
import {watchFetchHomeCarousel} from '../../components/homeComponent/homeCarousel/saga'
import {watchFetchHotCommodity} from '../../components/shareComponent/hotCommodityArea/saga'
import {watchFetchLowPriceCommodity} from '../../components/shareComponent/lowPriceCommodityArea/saga'
import {watchFetchNewCommodity} from '../../components/homeComponent/newArea/saga'
import {watchFetchBrandList} from '../../components/shareComponent/brandArea/saga'
import {watchSaveInfo} from '../../components/shareComponent/header/saga'
import {watchAuthJwt} from '../../components/shareComponent/header/saga'
import {watchLogOut} from '../../components/shareComponent/header/saga'

export const hotSeriesSaga = watchFetchHotSeries;
export const homeCarouselSaga = watchFetchHomeCarousel;
export const hotCommoditySaga = watchFetchHotCommodity;
export const lowPriceCommoditySaga = watchFetchLowPriceCommodity;
export const newCommoditySaga = watchFetchNewCommodity;

export const watchFetchBrandListSaga = watchFetchBrandList;


export const watchSaveInfoSaga = watchSaveInfo;
export const watchAuthJwtSaga = watchAuthJwt;
export const watchLogOutSaga = watchLogOut;

