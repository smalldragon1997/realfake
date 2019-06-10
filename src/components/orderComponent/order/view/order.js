import {view as OrderArea} from '../../orderArea';
import {view as TradeArea} from '../../tradeArea';
import {view as PayArea} from '../../payArea';
import PayPage from '../../payArea/view/payPage';
import {view as DeliverArea} from '../../deliverArea';
import {view as TakeArea} from '../../takeArea';
import {view as EvaluateArea} from '../../evaluateArea';
import {view as DoneArea} from '../../doneArea';
import {view as AfterSale} from '../../afterSaleArea';
import {view as ApplyAfterSale} from '../../appleAfterSaleArea';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';

import React from 'react';

export default () => (
    <Switch>
        <Route path="/orders" exact component={OrderArea}/>
        <Route path="/orders/trade" exact component={TradeArea}/>
        <Route path="/orders/pay" exact component={PayArea}/>
        <Route path="/orders/pay/qr" exact component={PayPage}/>
        <Route path="/orders/deliver" exact component={DeliverArea}/>
        <Route path="/orders/deliver/:orderId" exact component={DeliverArea}/>
        <Route path="/orders/take" exact component={TakeArea}/>
        <Route path="/orders/evaluate" exact component={EvaluateArea}/>
        <Route path="/orders/applyAfterSale" exact component={ApplyAfterSale}/>
        <Route path="/orders/afterSale" exact component={AfterSale}/>
        <Route path="/orders/done" exact component={DoneArea}/>
        <Redirect to="/"/>
    </Switch>
)
