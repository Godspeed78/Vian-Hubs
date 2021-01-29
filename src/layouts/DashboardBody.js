import React, {lazy, Suspense} from 'react';
import Header from "./DashboardHeader";
import Footer from "./DashboardFooter";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Authentic from "../components/Authentic/Authentic";

import "../assets/css/Dashboard.css";

import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";
import {userLoggedIn} from "../utils/helpers";
import Dialog from "../components/Dialog/Dialog";
import ForgotPassword from "../pages/Front/ForgotPassword";
import Shop from "../pages/Dashboard/Shop";
import Cart from "../pages/Dashboard/Cart";
import Checkout from "../pages/Dashboard/Checkout";
import History from "../pages/Dashboard/History";
import Profile from "../pages/Dashboard/Profile";

import AttendantDash from "../pages/Attendant/Dashboard";

const Home = lazy(() => import('../pages/Dashboard/Dashboard'));
const PageNotFound = lazy(() => import('../pages/Front/ForgotPassword'));

const DashboardBody = (props) => {

    if (!userLoggedIn()) {
        window.location = '/login';
    }

    let {path, url} = useRouteMatch();
    return (
        <>
            <div className={props[stateKeys.PAGE_CLASS] + ' container-fluid'}>
                <section className="sidenav-enabled row pb-3 pb-md-4">
                    <div className="col-xl-12">
                        <Header/>
                        <ErrorBoundary>
                            <Authentic>
                                <Suspense fallback={<p>Loading...</p>}>
                                    <Switch>
                                        {/*<Route path={`${url}/services`} exact component={Articles}/>*/}
                                        {/*<Route path={`${url}/services/new`} component={NewArticle}/>*/}
                                        {/*<Route path={`${url}/services/:slug`} component={EditArticle}/>*/}
                                        {/*<Route path={url} component={Home} exact/>*/}
                                        <Route path={'/forgot'} component={ForgotPassword}/>
                                        <Route path={'/dashboard'} component={Home} exact={true}/>
                                        <Route path={'/dashboard/shop'} component={Shop}/>
                                        <Route path={'/dashboard/cart'} component={Cart}/>
                                        <Route path={'/dashboard/checkout'} component={Checkout}/>
                                        <Route path={'/dashboard/history'} component={History}/>
                                        <Route path={'/dashboard/profile'} component={Profile}/>
                                        <Route component={PageNotFound}/>
                                    </Switch>
                                </Suspense>
                            </Authentic>
                        </ErrorBoundary>
                    {/*<Dialog/>*/}
                    </div>
                </section>
                <Footer/>
            </div>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBody);
