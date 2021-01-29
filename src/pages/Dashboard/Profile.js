import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import {Tabs, Tab, Modal,} from "react-bootstrap";
import visa from "../../assets/images/card-visa.png";
import mastercard from "../../assets/images/card-master.png";
import paypal from "../../assets/images/card-paypal.png";
import avatar from "../../assets/images/user.svg";
import Endpoint from "../../utils/endpoint";
import ClipLoader from "react-spinners/ClipLoader";
import {handleFormSubmissionError} from "../../utils/helpers";

class Profile extends Component {

	state = {
		pageLoading: false,
		loading: false,
		profile: [],
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		address: "",
		formIncomplete: false,
		updateLoading: false,
		toastAdded: false,
	};

	toggleToastAdded = () => {
		this.setState({toastAdded: !this.state.toastAdded})
	};

	updateSuccess = () => {
		this.setState({toastAdded: true});
		let currentState = this;
		setTimeout(function() {
			currentState.setState({toastAdded: false});
		}, 5000);
	};

	updateUser = () => {
		this.setState({loading: true});

		if (!this.state.first_name || !this.state.last_name || !this.state.email || !this.state.phone || !this.state.address) {
			this.setState({formIncomplete: true, loading: false});
			return false
		} else if (this.state.first_name && this.state.last_name && this.state.email && this.state.phone && this.state.address) {
			this.setState({formIncomplete: false});

			const updateDetails = {
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				other_names: this.state.other_names,
				email: this.state.email,
				phone: this.state.phone,
				address: this.state.address,
			};
			console.log(updateDetails);

			Endpoint.updateUserProfile(updateDetails)
				.then(res => {
					this.setState({loading: false});
					this.loadDataFromServer();
					this.updateSuccess();
					console.log(res);
				})
				.catch((error) => handleFormSubmissionError(error, this));
		}
	};

	loadDataFromServer = () => {
		this.setState({pageLoading: true});
		const user = JSON.parse(localStorage.getItem('userStorage'));
		console.log(user.id);

		Endpoint.getUserProfile()
			.then(res => {
				this.setState({pageLoading:false, profile: res.data.data});
				this.setState({
					first_name: res.data.data.first_name,
					last_name: res.data.data.last_name,
					email: res.data.data.email,
					phone: res.data.data.phone,
					address: res.data.data.address,
				});
				console.log(res.data.data);
			})
			.catch((error) => handleFormSubmissionError(error, this));
	};

	componentDidMount() {
		this.props.setState('home', stateKeys.PAGE_CLASS);
		this.props.setState('Sample content for dialog', stateKeys.DIALOG_CONTENT);

		this.loadDataFromServer()
	}

	render() {
		const override = {
			display: 'block',
			margin: '0 auto',
		};

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

								<div className="bg-light box-shadow-lg rounded-lg overflow-hidden min-vh-50">
									{
										this.state.pageLoading ?
											<div className="sweet-loading mt-20vh mr-3">
												<ClipLoader
													css={override}
													size={100}
													color={"#FF9595"}
													loading={this.state.pageLoading}
												/>
											</div>
											:
											<div className="row">

												<section className="col pt-lg-4 pb-4 mb-3">
													<div className="pt-2 px-4 pl-lg-0 px-xl-5">
														<div className="bg-secondary rounded-lg p-4 mb-4">
															<div className="media align-items-center">
																<img src={avatar} width="90" alt="Createx Studio"/>
																{/*<div className="media-body pl-3">*/}
																{/*	<button className="btn btn-light btn-shadow btn-sm mb-2" type="button">*/}
																{/*		<i className="czi-loading mr-2"/>Change*/}
																{/*		<span className='d-none d-sm-inline'> avatar</span>*/}
																{/*	</button>*/}
																{/*	<div className="p mb-0 font-size-ms text-muted">*/}
																{/*		Upload JPG, GIF or PNG image. 300 x 300 required.*/}
																{/*	</div>*/}
																{/*</div>*/}
															</div>
														</div>

														<div className="row">
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="dashboard-fn">
																		First Name
																	</label>
																	<input className="form-control" type="text"
																		   id="first_name" value={this.state.first_name}
																		   onChange={(e) => this.setState({first_name: e.target.value }) }
																	/>
																</div>
															</div>
															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="dashboard-ln">
																		Last Name
																	</label>
																	<input className="form-control" type="text"
																		   id="last_name" value={this.state.last_name}
																		   onChange={(e) => this.setState({last_name: e.target.value }) }
																	/>
																</div>
															</div>

															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="dashboard-email">
																		Email address
																	</label>
																	<input className="form-control" type="email"
																		   id="email" value={this.state.email}
																		   onChange={(e) => this.setState({email: e.target.value }) }
																	/>
																</div>
															</div>

															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="dashboard-email">
																		Phone
																	</label>
																	<input className="form-control" type="text"
																		   id="phone" value={this.state.phone}
																		   onChange={(e) => this.setState({phone: e.target.value }) }
																	/>
																</div>
															</div>

															<div className="col-sm-6">
																<div className="form-group">
																	<label htmlFor="dashboard-address">
																		Address
																	</label>
																	<input className="form-control" type="text"
																		   id="address" value={this.state.address}
																		   onChange={(e) => this.setState({address: e.target.value }) }
																	/>
																</div>
															</div>

															{this.state.formIncomplete ?
																<div className="col-sm-6 mt-auto">
																	<div className="bg-primary border-rad-2 text-center p-2 mb-3">
																		<p className="small text-light mb-0">
																			<i className="czi-bell mr-2"/> Please fill in all fields.
																		</p>
																	</div>
																</div>
																: null
															}

															{this.state.error ?
																<div className="col-sm-6 mt-auto">
																	<div className="bg-danger border-rad-2 text-center p-2 mb-3">
																		<p className="small text-light mb-0">
																			<i className="czi-bell mr-2"/> {this.state.errorMessage}
																		</p>
																	</div>
																</div>
																: null
															}

															<div className="col-12">
																<hr className="mt-2 mb-3"/>

																{this.state.loading ?
																	<div className="d-flex flex-wrap justify-content-end align-items-center">
																		<div className="sweet-loading mr-3">
																			<ClipLoader
																				css={override}
																				size={30}
																				color={"#FF9595"}
																				loading={this.state.loading}
																			/>
																		</div>
																	</div>
																	:
																	<div className="d-flex flex-wrap justify-content-end align-items-center">
																		<button className="btn btn-primary mt-3 mt-sm-0"
																				type="button" onClick={this.updateUser}>
																			Save changes
																		</button>
																	</div>
																}

															</div>
														</div>
													</div>
												</section>
											</div>
									}

								</div>
							</div>

						</div>
					</div>
				</div>

				<div className="toast-container toast-bottom-center" style={{zIndex: '1070',}}>
					<div className={this.state.toastAdded ? "toast mb-3 fade show" : "toast mb-3 fade hide"} id="cart-toast" data-delay="5000" role="alert"
						 aria-live="assertive" aria-atomic="true">
						<div className="toast-header bg-success text-white">
							<i className="czi-check-circle mr-2"/>
							<h6 className="font-size-sm text-white mb-0 mr-auto">Profile Updated Successfuly!</h6>
							<button className="close text-white ml-2 mb-1" type="button" onClick={()=> this.toggleToastAdded()}
									aria-label="Close"><span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="toast-body">You have successfully updated your profile.</div>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);