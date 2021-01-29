import React, {lazy, Suspense} from 'react';
import Header from "./AttendantHeader";
import Footer from "./DashboardFooter";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import "../assets/css/Dashboard.css";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";
import {userLoggedIn} from "../utils/helpers";
import Dialog from "../components/Dialog/Dialog";

import AttendantDash from "../pages/Attendant/Dashboard";
import AttendantSchedule from "../pages/Attendant/Schedule";
import AttendantProfile from "../pages/Attendant/Profile";
import AttendantEarnings from "../pages/Attendant/Earnings";

const Home = lazy(() => import('../pages/Dashboard/Dashboard'));
const PageNotFound = lazy(() => import('../pages/Front/ForgotPassword'));

const DashboardBody = (props) => {

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
									<Route path={'/attendant'} component={AttendantDash} exact={true}/>
									<Route path={'/attendant/schedule'} component={AttendantSchedule}/>
									<Route path={'/attendant/profile'} component={AttendantProfile}/>
									<Route path={'/attendant/earnings'} component={AttendantEarnings}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBody);
