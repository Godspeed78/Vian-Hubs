import React, {Component, Suspense} from 'react';
import "./assets/css/App.css";
import "./assets/css/Helpers.css";
import "./assets/css/Colors.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FrontBody from "./layouts/FrontBody";
import DashboardBody from "./layouts/DashboardBody";
import AttendantBody from "./layouts/AttendantBody";
import CashierBody from "./layouts/CashierBody";
import AdminBody from "./layouts/AdminBody"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import PageLoader from "./components/Loader/PageLoader/PageLoader";
import GuestCart from "./components/GuestCart/GuestCart";

export class App extends Component {
    render() {
        return (
            <Router>
                <ScrollToTop>
                    <Switch>
                        <Route path="/dashboard" component={DashboardBody}/>
                        <Route path="/attendant" component={AttendantBody}/>
                        <Route path="/cashier" component={CashierBody}/>
                        <Route path="/admin" component={AdminBody}/>
                        <Route component={FrontBody}/>
                    </Switch>
                    <PageLoader/>
                    <GuestCart/>
                </ScrollToTop>
            </Router>
        )
    }
}

export default App
