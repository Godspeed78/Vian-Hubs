import React, {useEffect, useState} from 'react'
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";
import Logo from "../assets/images/logo/vhub.png";
import {Dropdown, Navbar, Nav} from "react-bootstrap";

const FrontHeader = (props) => {

	useEffect(() => {
		const localCart = localStorage.getItem('guestCartTotal');
		if (localCart && props[stateKeys.GUEST_CART_TOTAL]) {
			props.setState(localCart, stateKeys.GUEST_CART_TOTAL);
		}
	}, []); // do not give the dependency as repositories as it will go to infinite loop

	return (
		<header className="box-shadow-sm">
			{/*Topbar*/}
			<div className="topbar topbar-dark bg-dark2">
				<div className="container justify-content-center">
					<div className="row">
						<div className="topbar-text text-nowrap d-md-none d-sm-inline-block bg-auth-btn py-1 px-3">
							<Link to={'/login'}>
								<p className='text-white mb-0'>Login/Register</p>
							</Link>
						</div>
					</div>
				</div>

				<div className="container justify-content-between">
					<div className="topbar-text text-nowrap d-none d-md-inline-block">
						<i className="czi-support"/>
						<span className="text-muted mr-1">Support:</span>
						<a className="topbar-link text-white" href="tel:00331697720"> +234 70 5676 5678</a>
					</div>

					<div className="topbar-text text-nowrap d-none d-md-inline-block">
						<i className="czi-mail"/>
						<a className='text-white'>Email: info@vianhubs.com</a>
					</div>

					<div className="topbar-text text-nowrap d-none d-md-inline-block bg-auth-btn py-1 px-3">
						<Link to={'/login'}>
							<p className='text-white mb-0'>Login/Register</p>
						</Link>
					</div>
				</div>
			</div>

			<Navbar bg="light" expand="lg">
				<div className="container">
					<Navbar.Brand href="/" className='mr-6rem'>
						<img src={Logo} className="mr-auto" alt="" style={{height: '60px'}}/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav" className="z-index-10">
						<Nav className="mx-auto">
							<NavLink to="/home" activeStyle={{fontWeight: 'bold', color: '#fe696a'}}
									 className='pt-3 pb-2 mx-3'>Home</NavLink>
							<NavLink to="/direction" activeStyle={{fontWeight: 'bold', color: '#fe696a'}}
									 className='pt-3 pb-2 mx-3'>Direction</NavLink>
							<NavLink to="/services" activeStyle={{fontWeight: 'bold', color: '#fe696a'}}
									 className='pt-3 pb-2 mx-3'>Services</NavLink>
							<NavLink to="/about" activeStyle={{fontWeight: 'bold', color: '#fe696a'}}
									 className='pt-3 pb-2 mx-3'>About Us</NavLink>
							<NavLink to="/contact" activeStyle={{fontWeight: 'bold', color: '#fe696a'}}
									 className='pt-3 pb-2 mx-3'>Contact</NavLink>
						</Nav>

						<Nav className='ml-auto'>
							<div className="input-group-overlay d-lg-none my-3">
								<div className="input-group-prepend-overlay">
									<span className="input-group-text">
										<i className="czi-search"/>
									</span>
								</div>
								<input className="form-control prepended-form-control" type="text"
									   placeholder="Search for products"/>
							</div>

							<div className="input-group-overlay d-none d-lg-block">
								<input className="form-control appended-form-control w-70 ml-auto" type="text"
									   placeholder="Search..."/>
							</div>

							<div className="navbar-tool mx-4">
								<button className="navbar-tool-icon-box bg-secondary border-0"
										onClick={props[stateKeys.OPEN_GUEST_CART]}>
									<span className="navbar-tool-label">{props[stateKeys.GUEST_CART_TOTAL]}</span>
									<i className="navbar-tool-icon czi-cart"/>
								</button>
							</div>
						</Nav>
					</Navbar.Collapse>
				</div>
			</Navbar>

		</header>
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontHeader);
