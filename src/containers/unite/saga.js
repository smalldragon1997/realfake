import {watchFetchUniteCarousel} from '../../components/uniteComponent/uniteCarousel/saga'
import {watchFetchUniteCommodity} from '../../components/uniteComponent/commodityArea/saga'
import {watchInitUniteCommodities} from '../../components/uniteComponent/commodityArea/saga'

export const uniteCarouselSaga = watchFetchUniteCarousel;
export const uniteCommoditySaga = watchFetchUniteCommodity;
export const watchInitUniteCommoditiesSaga = watchInitUniteCommodities;