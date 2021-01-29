import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import about1 from "../../assets/images/about/01.jpg";
import about2 from "../../assets/images/about/02.jpg";
import about3 from "../../assets/images/about/03.jpg";
import about4 from "../../assets/images/about/04.jpg";
import about5 from "../../assets/images/about/05.jpg";
import about6 from "../../assets/images/about/06.jpg";
import about7 from "../../assets/images/about/07.jpg";
import about8 from "../../assets/images/about/08.jpg";
import {Link} from "react-router-dom";

class Contact extends Component {

	componentDidMount() {
		this.props.setState('about', stateKeys.PAGE_CLASS);
	}

	render() {
		return (
			<>
				<section>
					<section className="row no-gutters">
						<div className="col-md-6 bg-position-center bg-size-cover bg-secondary"
							 style={{minHeight: '15rem', backgroundImage: `url(${about8})`,}}/>
						<div className="col-md-6 px-3 px-md-5 py-5 order-md-1">
							<div className="mx-auto py-lg-5" style={{maxWidth: '35rem'}}>
								<h2 className="h3 mb-2">Want to get in touch?</h2>
								<p className="font-size-sm text-muted pb-2">
									If you want to suggest services or find out more, please fill in the form below.
								</p>
								<form className="needs-validation row" method="post" noValidate>
									<div className="col-sm-12 form-group">
										<input className="form-control" type="text" placeholder="Your name"
											   required/>
									</div>
									<div className="col-sm-6 form-group">
										<input className="form-control" type="email" placeholder="Your email"
											   required/>
									</div>
									<div className="col-sm-6 form-group">
										<input className="form-control" type="tel" placeholder="Your phone number"
											   required/>
									</div>
									<div className="col-12 form-group">
										<textarea className="form-control" rows="4" placeholder="Message"/>
									</div>
									<div className="col-12">
										<button className="btn btn-info btn-shadow" type="submit">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</section>

					<hr/>

					<section className="container-fluid pt-grid-gutter bg-white">
						<div className="row">
							<div className="col-xl-3 col-md-6 mb-grid-gutter"><a className="card" href="#map"
																				 data-scroll>
								<div className="card-body text-center">
									<i className="czi-location h3 mt-2 mb-4 text-primary"/>
									<h3 className="h6 mb-2">Main store address</h3>
									<p className="font-size-sm text-muted">Shop 20, Plot 134 Adetokunbo Ademola Cres, Wuse 900271, II</p>
									<Link className="font-size-sm text-primary" to={'/direction'}>Click to see map
										<i className="czi-arrow-right align-middle ml-1"/>
									</Link>
								</div>
							</a></div>
							<div className="col-xl-3 col-md-6 mb-grid-gutter">
								<div className="card">
									<div className="card-body text-center">
										<i className="czi-time h3 mt-2 mb-4 text-primary"/>
										<h3 className="h6 mb-3">Working hours</h3>
										<ul className="list-unstyled font-size-sm text-muted mb-0">
											<li>Mon - Fri: 10AM - 7PM</li>
											<li className="mb-0">Sta: 11AM - 5PM</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-md-6 mb-grid-gutter">
								<div className="card">
									<div className="card-body text-center">
										<i className="czi-phone h3 mt-2 mb-4 text-primary"/>
										<h3 className="h6 mb-3">Phone numbers</h3>
										<ul className="list-unstyled font-size-sm mb-0">
											<li><span className="text-muted mr-1">For customers:</span><a
												className="nav-link-style" href="tel:+108044357260">+1 (080) 44 357
												260</a></li>
											<li className="mb-0"><span
												className="text-muted mr-1">Tech support:</span><a
												className="nav-link-style" href="tel:+100331697720">+1 00 33 169
												7720</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-md-6 mb-grid-gutter">
								<div className="card">
									<div className="card-body text-center">
										<i className="czi-mail h3 mt-2 mb-4 text-primary"/>
										<h3 className="h6 mb-3">Email addresses</h3>
										<ul className="list-unstyled font-size-sm mb-0">
											<li><span className="text-muted mr-1">For customers:</span><a
												className="nav-link-style"
												href="mailto:+108044357260">customer@example.com</a></li>
											<li className="mb-0"><span
												className="text-muted mr-1">Tech support:</span><a
												className="nav-link-style"
												href="mailto:support@example.com">support@example.com</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>

				</section>
			</>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Contact);
