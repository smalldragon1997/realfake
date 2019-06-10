import {watchFetchBrandCarousel} from '../../components/brandComponent/brandPageCarousel/saga'
import {watchFetchBrandCommodities} from '../../components/brandComponent/brandPageCarousel/saga'
import {watchFetchBrandsSeries} from '../../components/brandComponent/seriesAllArea/saga'

export const brandCarouselSaga = watchFetchBrandCarousel;
export const watchFetchBrandCommoditiesSaga = watchFetchBrandCommodities;
export const brandSeriesSaga = watchFetchBrandsSeries;