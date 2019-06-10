import { fork} from "redux-saga/effects";
import * as headerSaga from "./components/shareComponent/header/saga";
import * as drawListSaga from "./components/shareComponent/drawList/saga";
import * as privacySaga from "./containers/privacy/saga";
import * as homeSaga from "./containers/home/saga";
import * as searchSaga from "./containers/search/saga";
import * as brandsSaga from "./containers/brands/saga";
import * as seriesSaga from "./containers/series/saga";
import * as uniteSaga from "./containers/unite/saga";
import * as commoditiesSaga from "./containers/commodities/saga";
import * as orderSaga from "./containers/order/saga";

function* rootSaga() {
    /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
    yield [
        fork(headerSaga.watchFetchHeader),
        fork(headerSaga.watchFetchExpressList),
        fork(privacySaga.watchFetchAfterSaleInfoSaga),
        fork(privacySaga.watchTestPayDoneSaga),
        fork(privacySaga.watchFetchAfterSaleListSaga),
        fork(privacySaga.watchFetchDoneOrderListSaga),
        fork(privacySaga.watchFetchProcessOrderListSaga),
        fork(privacySaga.watchFetchPayResultSaga),
        fork(privacySaga.watchCancelAfterSaleSaga),
        fork(privacySaga.watchCommitOrderSaga),
        fork(privacySaga.watchConfirmOrderSaga),
        fork(privacySaga.watchPayOrderSaga),
        fork(privacySaga.watchDeleteOrderSaga),
        fork(privacySaga.watchApplyAfterSaleSaga),
        fork(privacySaga.watchFetchOrderInfoSaga),
        fork(privacySaga.watchUpdateAfterSaleSaga),
        fork(privacySaga.watchEvaluateSaga),
        fork(privacySaga.watchFetchUserSaga),
        fork(privacySaga.watchAlterUserInfoSaga),
        fork(privacySaga.watchRegisterSaga),
        fork(privacySaga.watchAlterPwdSaga),
        fork(privacySaga.watchAddAddressSaga),
        fork(privacySaga.watchAddCarSaga),
        fork(privacySaga.watchAddLikeSaga),
        fork(privacySaga.watchDelCarSaga),
        fork(privacySaga.watchDelLikeSaga),
        fork(privacySaga.watchFetchAddressSaga),
        fork(privacySaga.watchFetchCarSaga),
        fork(privacySaga.watchFetchDiscountSaga),
        fork(privacySaga.watchFetchLikeSaga),
        fork(privacySaga.watchAlterCarSaga),
        fork(privacySaga.watchDelAddressSaga),
        fork(homeSaga.hotSeriesSaga),
        fork(homeSaga.homeCarouselSaga),
        fork(homeSaga.hotCommoditySaga),
        fork(homeSaga.lowPriceCommoditySaga),
        fork(homeSaga.newCommoditySaga),
        fork(homeSaga.watchFetchBrandListSaga),
        fork(homeSaga.watchAuthJwtSaga),
        fork(homeSaga.watchLogOutSaga),
        // fork(homeSaga.watchSaveInfoSaga),
        fork(searchSaga.likeCommoditySaga),
        fork(searchSaga.dislikeCommoditySaga),
        fork(searchSaga.searchCommoditySaga),
        fork(searchSaga.watchInitSearchCommoditiesSaga),
        fork(searchSaga.recommendSearchSaga),
        fork(brandsSaga.brandCarouselSaga),
        fork(brandsSaga.watchFetchBrandCommoditiesSaga),
        fork(brandsSaga.brandSeriesSaga),
        fork(seriesSaga.watchFetchSeriesCommoditiesSaga),
        fork(seriesSaga.watchInitSeriesCommoditiesSaga),
        fork(seriesSaga.seriesCarouselSaga),
        fork(uniteSaga.uniteCarouselSaga),
        fork(uniteSaga.uniteCommoditySaga),
        fork(uniteSaga.watchInitUniteCommoditiesSaga),
        fork(commoditiesSaga.commodityInfoSage),
        fork(commoditiesSaga.disLikeSage),
        fork(commoditiesSaga.likeSage),
        fork(commoditiesSaga.commentSage),
        fork(orderSaga.fetchOrdersSage),
        fork(orderSaga.cancelOrderSage),
        fork(orderSaga.submitOrderSage),
        fork(orderSaga.fetchExpressSage),
        fork(orderSaga.fetchPayInfoSage),
        fork(orderSaga.submitPaySage),
        fork(orderSaga.fetchDeliverInfoSage),
        fork(orderSaga.returnOrderSage),
        fork(orderSaga.fetchTakeOrderSage),
        fork(orderSaga.fetchEvaluateOrderSage),
        fork(orderSaga.fetchOrderInfoSage),
        fork(orderSaga.uploadAfterSaleInfoSage),
        fork(orderSaga.cancelAfterSaleSage),
        fork(orderSaga.fetchAfterSaleInfoSage),
        fork(drawListSaga.watchFetchDrawList),
        fork(drawListSaga.watchAddCar),
        fork(drawListSaga.watchDelCar),
    ];
}
export default rootSaga;