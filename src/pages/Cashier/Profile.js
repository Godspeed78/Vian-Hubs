import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import {Tabs, Tab,} from "react-bootstrap";
import hairm from "../../assets/images/home/hairm.png";
import cards from "../../assets/images/cards.png";
import visa from "../../assets/images/card-visa.png";
import mastercard from "../../assets/images/card-master.png";
import paypal from "../../assets/images/card-paypal.png";
import avatar from "../../assets/images/user.svg";

class CashierProfile extends Component {

	componentDidMount() {
		this.props.setState('home', stateKeys.PAGE_CLASS);

		this.props.setState('Sample content for dialog', stateKeys.DIALOG_CONTENT);
	}

	render() {
		return (
			<>
				<div className="border-bottom mt-lg-2 mt-5 pt-5 pb-2 mb-2">
					<nav className="mb-4 mt-5" aria-label="breadcrumb">
						<ol className="breadcrumb flex-lg-nowrap">
							<li className="breadcrumb-item">
								<a className="text-nowrap" href="">
									<i className="czi-home"/>Home
								</a>
							</li>

							<li className="breadcrumb-item">
								<a className="text-nowrap" href="">
									<i className="czi-"/>Dashboard
								</a>
							</li>

							<li className="breadcrumb-item text-nowrap active" aria-current="page">Profile</li>
						</ol>
					</nav>

					<h2 className="mt-lg-1 pt-lg-1">Profile</h2>
				</div>

				<div className="">
					<div className="">
						<div className="">
							<div className="container my-5 pb-3">

								<div className="bg-light box-shadow-lg rounded-lg overflow-hidden">
									<div className="row">

										<section className="col pt-lg-4 pb-4 mb-3">
											<div className="pt-2 px-4 pl-lg-0 px-xl-5">

												<div>
													<div className="bg-secondary rounded-lg p-4 mb-4">
														<div className="media align-items-center">
															<img src={avatar} width="90" alt="Createx Studio"/>
															<div className="media-body pl-3">
																<button className="btn btn-light btn-shadow btn-sm mb-2"
																		type="button">
																	<i className="czi-loading mr-2"/>Change
																	<span className='d-none d-sm-inline'>avatar</span>
																</button>
																<div className="p mb-0 font-size-ms text-muted">
																	Upload JPG, GIF or PNG image. 300 x 300 required.
																</div>
															</div>
														</div>
													</div>

													<div className="row">
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="dashboard-fn">
																	First Name
																</label>
																<input className="form-control" type="text"
																	   id="dashboard-fn" value="John"/>
															</div>
														</div>
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="dashboard-ln">
																	Last Name
																</label>
																<input className="form-control" type="text"
																	   id="dashboard-ln" value="Doe"/>
															</div>
														</div>

														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="dashboard-email">
																	Email address
																</label>
																<input className="form-control" type="text"
																	   id="dashboard-email" value="contact@example.com"
																	   disabled/>
															</div>
														</div>

														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="dashboard-profile-name">
																	Profile Name
																</label>
																<input className="form-control" type="text"
																	   id="dashboard-profile-name"
																	   value="Createx Studio"/>
															</div>
														</div>
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="dashboard-country">Country</label>
																<select className="custom-select"
																		id="dashboard-country">
																	<option value>Select country</option>
																	<option value="Argentina">Argentina
																	</option>
																	<option value="Belgium">Belgium</option>
																	<option value="France">France</option>
																	<option value="Germany">Germany</option>
																	<option value="Madagascar" selected>Madagascar
																	</option>
																	<option value="Spain">Spain</option>
																	<option value="UK">United Kingdom</option>
																	<option value="USA">USA</option>
																</select>
															</div>
														</div>
														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="dashboard-city">City</label>
																<input className="form-control" type="text"
																	   id="dashboard-city" value="Antananarivo"/>
															</div>
														</div>

														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="dashboard-address">
																	Address Line
																</label>
																<input className="form-control" type="text"
																	   id="dashboard-address"
																	   value="Some Cool Street, 22/1"/>
															</div>
														</div>

														<div className="col-sm-6">
															<div className="form-group">
																<label htmlFor="dashboard-zip">
																	ZIP Code
																</label>
																<input className="form-control" type="text"
																	   id="dashboard-zip"/>
															</div>
														</div>

														<div className="col-12">
															<hr className="mt-2 mb-3"/>
															<div
																className="d-flex flex-wrap justify-content-end align-items-center">
																<button className="btn btn-primary mt-3 mt-sm-0"
																		type="button">
																	Save changes
																</button>
															</div>
														</div>
													</div>
												</div>

											</div>
										</section>

									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CashierProfile);