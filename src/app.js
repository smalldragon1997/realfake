import React from 'react';
import {view as Home} from './containers/home/';
import {view as Search} from './containers/search/';
import {view as Brands} from './containers/brands/';
import {view as Series} from './containers/series/';
import {view as Unite} from './containers/unite/';
import {view as Commodity} from './containers/commodities/';
import {view as Orders} from './containers/order/';
import {view as Privacy} from './containers/privacy/';
import {view as Header} from './components/shareComponent/header/';
import {view as Footer} from './components/shareComponent/footer/';
import {view as DrawList} from './components/shareComponent/drawList/';
import {HashRouter,BrowserRouter, Route, NavLink, Switch,Redirect} from 'react-router-dom';

function App() {
    return (
        <HashRouter>
            <div>
                <Header/>
                <DrawList/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/search/:keyWord" component={Search}/>
                    <Route path="/brands/:brandId" component={Brands}/>
                    <Route path="/series/:seriesId" component={Series}/>
                    <Route path="/unites/:uniteId" component={Unite}/>
                    <Route path="/commodities/:commId" component={Commodity}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/privacy" component={Privacy}/>
                    <Redirect to="/" />
                </Switch>
                <Footer/>
            </div>
        </HashRouter>
    );
}

export default App;
