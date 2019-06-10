import React from 'react';
import {connect} from 'react-redux';
import Info from './info';
import Address from './address';
import Account from './account';
import Login from './login';
import Register from './register';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';

function privacyArea() {
    return (
        <Switch>
            <Route path="/privacy" exact component={Info}/>
            <Route path="/privacy/address" component={Address}/>
            <Route path="/privacy/account" component={Account}/>
            <Route path="/privacy/login" component={Login}/>
            <Route path="/privacy/register" component={Register}/>
            <Redirect to="/" />
        </Switch>
    );
}

export default privacyArea;