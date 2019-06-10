import {watchFetchOrders} from '../../components/orderComponent/orderArea/saga'
import {watchCancelOrder} from '../../components/orderComponent/orderArea/saga'
import {watchFetchSubmitOrder} from '../../components/orderComponent/tradeArea/saga'
import {watchFetchFetchExpress} from '../../components/orderComponent/tradeArea/saga'
import {watchFetchPayInfo} from '../../components/orderComponent/payArea/saga'
import {watchSubmitPay} from '../../components/orderComponent/payArea/saga'
import {watchFetchDeliverInfo} from '../../components/orderComponent/deliverArea/saga'
import {watchReturnOrder} from '../../components/orderComponent/deliverArea/saga'
import {watchFetchTakeInfo} from '../../components/orderComponent/takeArea/saga'
import {watchFetchEvaluateInfo} from '../../components/orderComponent/evaluateArea/saga'

import {watchUploadAfterSaleInfo} from '../../components/orderComponent/appleAfterSaleArea/saga'
import {watchFetchOrderInfo} from '../../components/orderComponent/appleAfterSaleArea/saga'

import {watchCancelAfterSale} from '../../components/orderComponent/orderArea/saga'
import {watchFetchAfterSaleInfo} from '../../components/orderComponent/afterSaleArea/saga'

export const fetchOrdersSage = watchFetchOrders;
export const cancelOrderSage = watchCancelOrder;

export const submitOrderSage = watchFetchSubmitOrder;
export const fetchExpressSage = watchFetchFetchExpress;

export const fetchPayInfoSage = watchFetchPayInfo;
export const submitPaySage = watchSubmitPay;

export const fetchDeliverInfoSage = watchFetchDeliverInfo;
export const returnOrderSage = watchReturnOrder;

export const fetchTakeOrderSage = watchFetchTakeInfo;

export const fetchEvaluateOrderSage = watchFetchEvaluateInfo;

export const uploadAfterSaleInfoSage = watchUploadAfterSaleInfo;
export const fetchOrderInfoSage = watchFetchOrderInfo;

export const cancelAfterSaleSage = watchCancelAfterSale;
export const fetchAfterSaleInfoSage = watchFetchAfterSaleInfo;