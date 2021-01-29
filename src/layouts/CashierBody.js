import React, {lazy, Suspense} from 'react';
import Header from "./CashierHeader";
import Footer from "./DashboardFooter";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import "../assets/css/Dashboard.css";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";
import {userLoggedIn} from "../utils/helpers";
import Dialog from "../components/Dialog/Dialog";

import CashierDash from "../pages/Cashier/Dashboard";
import CashierShop from "../pages/Cashier/Shop";
import CashierCart from "../pages/Cashier/Cart";
import CashierCheckout from "../pages/Cashier/Checkout";
import CashierAppointments from "../pages/Cashier/Appointments";
import CashierAttendantSchedule from "../pages/Cashier/AttendantSchedule";
import CashierProfile from "../pages/Cashier/Profile";
import CashierEarnings from "../pages/Cashier/Earnings";

const Home = lazy(() => import('../pages/Dashboard/Dashboard'));
const PageNotFound = lazy(() => import('../pages/Front/ForgotPassword'));

const CashierBody = (props) => {

	if (!userLoggedIn()) {
		// window.location = '/login';
	}

	let {path, url} = useRouteMatch();
	return (
		<>
			<div className={props[stateKeys.PAGE_CLASS] + ' container-fluid'}>
				<section className="sidenav-enabled row pb-3 pb-md-4">
					<div className="col-xl-12">
						<Header/>
						<ErrorBoundary>
							<Suspense fallback={<p>Loading...</p>}>
								<Switch>
									<Route path={'/cashier'} component={CashierDash} exact={true}/>
									<Route path={'/cashier/shop'} component={CashierShop} exact={true}/>
									<Route path={'/cashier/cart'} component={CashierCart} exact={true}/>
									<Route path={'/cashier/checkout'} component={CashierCheckout} exact={true}/>
									<Route path={'/cashier/appointments'} component={CashierAppointments} exact={true}/>
									<Route path={'/cashier/attendantSchedule'} component={CashierAttendantSchedule} exact={true}/>
									<Route path={'/cashier/profile'} component={CashierProfile} exact={true}/>
									<Route path={'/cashier/earnings'} component={CashierEarnings} exact={true}/>

									<Route component={PageNotFound}/>
								</Switch>
							</Suspense>
						</ErrorBoundary>
						{/*<Dialog/>*/}
					</div>
				</section>
				<Footer/>
			</div>
		</>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(CashierBody);
