import React from 'react'
import {Link, NavLink} from "react-router-dom";
import Logo from "../assets/images/logo/vhub.png";
import {user_storage} from "../utils/helpers"
import {logOutUser} from "../utils/helpers";
import {Nav, Navbar} from "react-bootstrap";



const AttendantHeader = (props) => {

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
								<NavLink to="/attendant" className='pt-3 pb-2 mx-3'>
									<i className="czi-home mr-2"/> Dashboard
								</NavLink>
								
								<NavLink to="/attendant/schedule" className='pt-3 pb-2 mx-3'>
									<i className="czi-time mr-2"/> Schedule
								</NavLink>
								
								<NavLink to="/attendant/profile" className='pt-3 pb-2 mx-3'>
									<i className="czi-user-circle mr-2"/> Profile
								</NavLink>
								
								<NavLink to="/attendant/earnings" className='pt-3 pb-2 mx-3'>
									<i className="czi-wallet mr-2"/> Earnings
								</NavLink>
								
								<NavLink to="/" className='pt-3 pb-2 mx-3' onClick={logOutUser}>
									<i className="czi-sign-out mr-2"/> Logout
								</NavLink>
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

				{/* <div className="navbar-tool mx-4">
					<a className="navbar-tool-icon-box bg-secondary dropdown-toggle" href="marketplace-cart.html">
						<span className="navbar-tool-label">3</span>
						<i className="navbar-tool-icon czi-cart"/>
					</a>
				</div> */}
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
								<Link to={'/attendant'}>
									<li className="widget-list-item active">
										<p className="widget-list-link"><i className="czi-home mr-2"/> Dashboard</p>
									</li>
								</Link>

								<Link to={'/attendant/schedule'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-time mr-2"/> Schedule</p>
									</li>
								</Link>

								<Link to={'/attendant/profile'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-user-circle mr-2"/> Profile</p>
									</li>
								</Link>

								<Link to={'/attendant/earnings'}>
									<li className="widget-list-item">
										<p className="widget-list-link"><i className="czi-wallet mr-2"/> Earnings</p>
									</li>
								</Link>

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
};

export default AttendantHeader
