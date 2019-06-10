import {createStore, applyMiddleware,combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {reducer as headerReducer} from './components/shareComponent/header/';
import {reducer as homeReducer} from './containers/home/';
import {reducer as privacyReducer} from './containers/privacy/';
import {reducer as drawReducer} from './components/shareComponent/drawList/';
import {reducer as searchReducer} from './containers/search';
import {reducer as brandReducer} from './containers/brands';
import {reducer as seriesReducer} from './containers/series';
import {reducer as uniteReducer} from './containers/unite';
import {reducer as commodityReducer} from './containers/commodities';
import {reducer as orderReducer} from './containers/order';
import rootSaga from './rootSaga';
const reducer = combineReducers({
    header:headerReducer,
    privacy:privacyReducer,
    home:homeReducer,
    search:searchReducer,
    brands:brandReducer,
    series:seriesReducer,
    unite:uniteReducer,
    commodity:commodityReducer,
    order:orderReducer,
    drawList:drawReducer
});
const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];
const store = createStore(reducer,applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);

export default store;