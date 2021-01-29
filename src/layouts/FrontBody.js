import React, {Component} from 'react';
import Footer from "./Footer";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import {Route, Switch} from "react-router-dom";

import "../assets/css/Front.css";

import ForgotPassword from "../pages/Front/ForgotPassword";
import Home from "../pages/Front/Home";
import Register from "../pages/Front/Auth/Register";
import Login from "../pages/Front/Auth/Login";
import About from "../pages/Front/About";
import Direction from "../pages/Front/Direction";
import Services from "../pages/Front/AllServices";
import PageNotFound from "../pages/PageNotFound";

import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";
import Dialog from "../components/Dialog/Dialog";
import FrontHeader from "./FrontHeader";
import Contact from "../pages/Front/Contact";

export class FrontBody extends Component {
    render() {
        return (
            <>
                <FrontHeader/>
                <main className={this.props[stateKeys.PAGE_CLASS]}>
                    <ErrorBoundary>
                        <Switch>
                            <Route path={'/'} component={Home} exact={true}/>
                            <Route path={'/home'} component={Home}/>
                            <Route path={'/about'} component={About}/>
                            <Route path={'/contact'} component={Contact}/>
                            <Route path={'/direction'} component={Direction}/>
                            <Route path={'/services'} component={Services}/>
                            <Route path={'/forgot'} component={ForgotPassword}/>
                            <Route path={'/register'} component={Register}/>
                            <Route path={'/login'} component={Login}/>
                            <Route component={PageNotFound}/>
                        </Switch>
                    </ErrorBoundary>
                    <Dialog/>
                </main>
                <Footer/>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontBody);
