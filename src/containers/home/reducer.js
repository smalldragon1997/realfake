import {combineReducers} from 'redux';

import {reducer as hotSeriesReducer} from '../../components/homeComponent/hotSeries/';
import {reducer as carouselReducer} from '../../components/homeComponent/homeCarousel/';
import {reducer as hotCommodityReducer} from '../../components/shareComponent/hotCommodityArea/';
import {reducer as lowPriceCommodityReducer} from '../../components/shareComponent/lowPriceCommodityArea/';
import {reducer as newReducer} from '../../components/homeComponent/newArea/';


import {reducer as brandReducer} from '../../components/shareComponent/brandArea/';

export const reducer = combineReducers({
    hotSeries:hotSeriesReducer,
    carousel:carouselReducer,
    hotCommodity:hotCommodityReducer,
    lowPriceCommodity:lowPriceCommodityReducer,
    newArea:newReducer,
    brand:brandReducer
});