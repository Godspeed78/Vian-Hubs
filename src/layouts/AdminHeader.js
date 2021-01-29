import React from 'react'
import { Component } from 'react';
import {Link, NavLink} from "react-router-dom";
import Logo from "../assets/images/logo/vhub.png";
import {logOutUser} from "../utils/helpers";
import {user_storage} from "../utils/helpers"
import Endpoint from "../utils/endpoint";
import {Nav, Navbar} from "react-bootstrap";


class AdminHeader extends Component {

	loadDataFromServer = () => {
		this.setState({loading: true});
		Endpoint.getCart()
			.then(res => {
				this.setState({cart: res.data?.data?.length});
				var cartCount = document.getElementById('cartCount');
				cartCount.innerHTML = this.state.cart;			
			})
	};
	componentDidMount(){
		this.loadDataFromServer();
	}
	
	
	render(){
	
	return (
		<>
			
			<header className="box-shadow-sm d-lg-none d-md-inline-block fixed-top">
				
				<Navbar bg="light" expand="lg" className=''>
					<div className="container">
						<Navbar.Brand href="/" className='mr-6rem'>
							<img src={Logo} className="mr-auto" alt="" style={{height: '60px'}}/>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav"/>
						<Navbar.Collapse id="basic-navbar-nav" className="z-index-10">
							<Nav className="mx-auto">
								<NavLink to="/admin/ManageShopServices" className='pt-3 pb-2 mx-3'>
									<i className="czi-home mr-2"/> Dashboard
								</NavLink>
								
								<NavLink to="/admin/ManageShopServices" className='pt-3 pb-2 mx-3'>
									<i className="czi-document mr-2"/> Services
								</NavLink>
								
								<NavLink to="/admin/ManageShopWorkers" className='pt-3 pb-2 mx-3'>
									<i className="czi-user mr-2"/> Workers
								</NavLink>
								
								<NavLink to="/admin/ManageShopCustomers" className='pt-3 pb-2 mx-3'>
									<i className="czi-user-circle mr-2"/> Customers
								</NavLink>
								
								<NavLink to="/admin/ShopCategories" className='pt-3 pb-2 mx-3'>
									<i className="czi-view-grid mr-2"/> Categories
								</NavLink>
								
								<NavLink to="/admin/createOrder" className='pt-3 pb-2 mx-3'>
									<i className="czi-edit-alt mr-2"/> Order
								</NavLink>
								
								<NavLink to="/admin/ShopEarnings" className='pt-3 pb-2 mx-3'>
									<i className="czi-wallet mr-2"/> Earnings
								</NavLink>
								
								<NavLink to="/admin/ShopEarnings" className='pt-3 pb-2 mx-3'>
									<i className="czi-star mr-2"/> Reviews
								</NavLink>
								
								<NavLink to="/admin/ShopEarnings" className='pt-3 pb-2 mx-3'>
									<i className="czi-settings mr-2"/> Settings
								</NavLink>
								
								<NavLink to="/admin/adminCart" className='pt-3 pb-2 mx-3'>
									<i className="czi-cart mr-2"/> Cart
								</NavLink>
								
								<NavLink to="/" className='pt-3 pb-2 mx-3' onClick={logOutUser}>
									<i className="czi-sign-out mr-2"/> Logout
								</NavLink>
								
								<br/>
								<br/>
							
							</Nav>
						
						</Navbar.Collapse>
					</div>
				</Navbar>
			
			</header>
			
			<header className="navbar navbar-expand navbar-light fixed-top bg-light box-shadow-sm px-3 px-lg-4 d-none d-lg-flex"
					data-scroll-header>
				<a className="navbar-brand d-lg-none mr-auto" href="typography.html" style={{minWidth: '7rem'}}>
					<img src={Logo} alt="Vian Hub" style={{height: '53px'}}/>
				</a>

				<ul className="navbar-nav ml-auto d-none d-lg-flex">

				</ul>

				<button className="navbar-toggler d-block d-lg-none" type="button" data-toggle="collapse"
						data-target="#components-nav">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="navbar-tool ml-1 ml-lg-0 mr-n1 mr-lg-2 my-auto">
					<div className="navbar-tool-icon-box"><i className="navbar-tool-icon czi-user"/></div>
					<div className="navbar-tool-text ml-n3">
						Hello, {user_storage.first_name + " " + user_storage.last_name}
					</div>
				</div>
				<Link to={'/admin/adminCart'}>
				<div className="navbar-tool mx-4">
					<a className="navbar-tool-icon-box bg-secondary dropdown-toggle" href="marketplace-cart.html">
						<span className="navbar-tool-label" id="cartCount"></span>
						<i className="navbar-tool-icon czi-cart"/>
					</a>
				</div>
				</Link>
			</header>

			<aside className="sidenav collapse bg-dark" id="components-nav">
				<header className="sidenav-header bg-light d-none d-lg-block text-center">
					<a className="navbar-brand py-0 my-0" href="/" style={{minWidth: '7rem'}}>
						<img src={Logo} alt="Vian Hub" style={{height: '45px'}}/>
					</a>
				</header>
				<div className="sidenav-body" data-simplebar data-simplebar-auto-hide="true">
					<div className="pt-4 pb-3 mt-3">
						<div className="d-flex d-lg-none pb-4 mb-4 border-bottom border-light">
							<div className="w-50 pr-2">
								<a className="btn btn-outline-light btn-block" href="../index.html">
									<i className="czi-eye align-middle mt-n1 mr-2"/>Live demo
								</a>
							</div>

							<div className="w-50 pl-2">
								<a className="btn btn-light btn-block" href="../docs/dev-setup.html">
									<i className="czi-book align-middle mt-n1 mr-2"/>Docs
								</a>
							</div>
						</div>

						<div className="widget widget-links widget-light mb-4 pb-2">
							<h3 className="widget-title text-white">Dashboard</h3>
							<ul className="widget-list">
								<Link to={'/admin'}>
									<li className="widget-list-item active">
										<p className="widget-list-link"><i className="czi-home mr-2"/> Dashboard</p>
									</li>
								</Link>

								<Link to={'/admin/ManageShopServices'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-time mr-2"/>Shop Services</p>
									</li>
								</Link>

								<Link to={'/admin/ManageShopWorkers'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-user-circle mr-2"/>Shop Workers</p>
									</li>
								</Link>

								<Link to={'/admin/ManageShopCustomers'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-user-circle mr-2"/>Shop Customers</p>
									</li>
								</Link>

								<Link to={'/admin/ShopCategories'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-view-grid mr-2"/>Shop Categories</p>
									</li>
								</Link>

								<Link to={'/admin/createOrder'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-edit-alt mr-2"/> Create Order</p>
									</li>
								</Link>
								
								<Link to={'/admin/ShopEarnings'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-dollar mr-2"/> Shop Earnings</p>
									</li>
								</Link>
								
								<Link to={'/admin/CustomerReviews'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-mail mr-2"/> Customer Reviews</p>
									</li>
								</Link>
								<Link to={'/admin/ShopSettings'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-settings mr-2"/> Shop Settings</p>
									</li>
								</Link>
								<Link to={'/admin/adminCart'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-cart mr-2"/> Cart</p>
									</li>
								</Link>
								<br/>
								<br/>

								<Link onClick={() => logOutUser()}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-sign-out mr-2"/> Logout</p>
									</li>
								</Link>
							</ul>
						</div>
					</div>
				</div>
			</aside>
		</>
	)
}
}

export default AdminHeader
