import {watchAddAddress} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchUser} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchAddress} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchCar} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchDiscount} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchLike} from '../../components/privacyComponent/privacyArea/saga'
import {watchAddCar} from '../../components/privacyComponent/privacyArea/saga'
import {watchAddLike} from '../../components/privacyComponent/privacyArea/saga'
import {watchAlterCar} from '../../components/privacyComponent/privacyArea/saga'
import {watchDelCar} from '../../components/privacyComponent/privacyArea/saga'
import {watchDelLike} from '../../components/privacyComponent/privacyArea/saga'

import {watchAlterPwd} from '../../components/privacyComponent/privacyArea/saga'
import {watchAlterUserInfo} from '../../components/privacyComponent/privacyArea/saga'
import {watchDelAddress} from '../../components/privacyComponent/privacyArea/saga'
import {watchRegister} from '../../components/privacyComponent/privacyArea/saga'


import {watchFetchAfterSaleInfo} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchAfterSaleList} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchDoneOrderList} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchOrderInfo} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchProcessOrderList} from '../../components/privacyComponent/privacyArea/saga'
import {watchDeleteOrder} from '../../components/privacyComponent/privacyArea/saga'
import {watchUpdateAfterSale} from '../../components/privacyComponent/privacyArea/saga'
import {watchApplyAfterSale} from '../../components/privacyComponent/privacyArea/saga'
import {watchCancelAfterSale} from '../../components/privacyComponent/privacyArea/saga'
import {watchCommitOrder} from '../../components/privacyComponent/privacyArea/saga'
import {watchConfirmOrder} from '../../components/privacyComponent/privacyArea/saga'
import {watchPayOrder} from '../../components/privacyComponent/privacyArea/saga'
import {watchFetchPayResult} from '../../components/privacyComponent/privacyArea/saga'
import {watchEvaluate} from '../../components/privacyComponent/privacyArea/saga'


import {watchTestPayDone} from '../../components/privacyComponent/privacyArea/saga'

export const watchTestPayDoneSaga = watchTestPayDone;

export const watchFetchAfterSaleInfoSaga = watchFetchAfterSaleInfo;
export const watchFetchAfterSaleListSaga = watchFetchAfterSaleList;
export const watchFetchDoneOrderListSaga = watchFetchDoneOrderList;
export const watchFetchOrderInfoSaga = watchFetchOrderInfo;
export const watchFetchProcessOrderListSaga = watchFetchProcessOrderList;
export const watchDeleteOrderSaga = watchDeleteOrder;
export const watchUpdateAfterSaleSaga = watchUpdateAfterSale;
export const watchApplyAfterSaleSaga = watchApplyAfterSale;
export const watchCancelAfterSaleSaga = watchCancelAfterSale;
export const watchCommitOrderSaga = watchCommitOrder;
export const watchConfirmOrderSaga = watchConfirmOrder;
export const watchPayOrderSaga = watchPayOrder;
export const watchFetchPayResultSaga = watchFetchPayResult;
export const watchEvaluateSaga = watchEvaluate;



export const watchAddAddressSaga = watchAddAddress;
export const watchAddCarSaga = watchAddCar;
export const watchAddLikeSaga = watchAddLike;

export const watchDelAddressSaga = watchDelAddress;
export const watchDelCarSaga = watchDelCar;
export const watchDelLikeSaga = watchDelLike;

export const watchAlterCarSaga = watchAlterCar;

export const watchFetchAddressSaga = watchFetchAddress;
export const watchFetchCarSaga = watchFetchCar;
export const watchFetchDiscountSaga = watchFetchDiscount;
export const watchFetchLikeSaga = watchFetchLike;




export const watchFetchUserSaga = watchFetchUser;
export const watchAlterPwdSaga = watchAlterPwd;
export const watchAlterUserInfoSaga = watchAlterUserInfo;
export const watchRegisterSaga = watchRegister;