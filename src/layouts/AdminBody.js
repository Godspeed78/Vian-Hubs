import React, {lazy, Suspense} from 'react';
import Header from "./AdminHeader";
import Footer from "./DashboardFooter";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import "../assets/css/Dashboard.css";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";
import {userLoggedIn, logOutUser} from "../utils/helpers";
import Dialog from "../components/Dialog/Dialog";
import AdminDash from "../pages/Admin/Dashboard";
import ManageShopWorkers from "../pages/Admin/ManageShopWorkers"
import ManageServices from "../pages/Admin/ManageServices"
import AdminCart from "../pages/Admin/Cart"
import CreateOrder from "../pages/Admin/CreateOrder"
import ViewWorkerProfile from "../pages/Admin/ViewWorkerProfile"
import ManageCustomers from "../pages/Admin/ManageCustomers"
import ShopEarnings from "../pages/Admin/ShopEarnings"
import CustomerReviews from "../pages/Admin/CustomerReviews"
import Settings from "../pages/Admin/Settings"
import ShopCategories from "../pages/Admin/ShopCategories"
import {user_storage} from "../utils/helpers"
import {worker} from "../utils/Identifiers"




const Home = lazy(() => import('../pages/Dashboard/Dashboard'));
const PageNotFound = lazy(() => import('../pages/Front/ForgotPassword'));

const DashboardBody = (props) => {

	if (!userLoggedIn() || user_storage.worker_profile.worker_type_id != worker.admin) {
		logOutUser();
	}
	// else if(user_storage.worker_profile != null)

	const user_obj = JSON.parse(localStorage.getItem("userStorage"));

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
									<Route path={'/admin'} component={AdminDash} exact={true}/>
									<Route path={'/admin/ManageShopWorkers'} component={ManageShopWorkers}/>
									<Route path={'/admin/ManageShopServices'} component={ManageServices}/>
									<Route path={'/admin/adminCart'} component={AdminCart}/>
									<Route path={'/admin/CreateOrder'} component={CreateOrder}/>
									<Route path={'/admin/WorkerProfile'} component={ViewWorkerProfile}/>
									<Route path={'/admin/ManageShopCustomers'} component={ManageCustomers}/>
									<Route path={'/admin/ShopEarnings'} component={ShopEarnings}/>
									<Route path={'/admin/ShopSettings'} component={Settings}/>
									<Route path={'/admin/CustomerReviews'} component={CustomerReviews}/>
									<Route path={'/admin/ShopCategories'} component={ShopCategories}/>
									

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
