import {watchFetchSeriesCarousel} from '../../components/seriesComponent/seriesCarousel/saga'
import {watchFetchSeriesCommodities} from '../../components/seriesComponent/commodityArea/saga'
import {watchInitSeriesCommodities} from '../../components/seriesComponent/commodityArea/saga'

export const watchFetchSeriesCommoditiesSaga = watchFetchSeriesCommodities;
export const watchInitSeriesCommoditiesSaga = watchInitSeriesCommodities;
export const seriesCarouselSaga = watchFetchSeriesCarousel;