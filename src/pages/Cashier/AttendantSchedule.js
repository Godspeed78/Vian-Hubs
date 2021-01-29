import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import {Modal} from 'react-bootstrap';
import Moment from "react-moment";
import hairm from "../../assets/images/home/hairm.png"
import Endpoint from "../../utils/endpoint";
import {formatNaira, handleFormSubmissionError} from "../../utils/helpers";
import ClipLoader from "react-spinners/ClipLoader";

class CashierAttendantSchedule extends Component {

	state = {
		addToCart: false,
		toastAdded: false,
		confirmAppointment: false,
		toastConfirmed: false,
		receivedAttendant: this.props.location.state.data,
		attendant: [],
		schedule: [],
		filter: "all",
		apptTotal: "",
	};

	toggleAddToCart = () => {
		this.setState({addToCart: !this.state.addToCart});
	};
	toggleToastAdded = () => {
		this.setState({toastAdded: !this.state.toastAdded});
		let currentState = this;
		setTimeout(function() {
			currentState.setState({toastAdded: false});
		}, 5000);
	};
	toggleConfirmAppointment = () => {
		this.setState({confirmAppointment: !this.state.confirmAppointment});
	};
	toggleToastConfirmed = () => {
		this.setState({toastConfirmed: !this.state.toastConfirmed});
		let currentState = this;
		setTimeout(function() {
			currentState.setState({toastConfirmed: false});
		}, 5000);
	};

	filterSchedule = (filter) => {
		let currentState = this;
		this.setState({loading: true});
		const attendantId = this.state.receivedAttendant.user.id;

		Endpoint.getAttendantAppointments(attendantId, filter)
			.then(res => {
				this.setState({schedule: res.data.data.data, filter: filter, loading: false});
				// setTimeout(function() {
				// 	currentState.setState({loading: false});
				// }, 5000);
				// console.log(res.data);
			})
			.catch((error) => handleFormSubmissionError(error, this));
	};

	loadDataFromServer = () => {
		this.setState({loading: true});
		const attendantId = this.state.receivedAttendant.user.id;

		Endpoint.getAttendantAppointments(attendantId)
			.then(res => {
				this.setState({schedule: res.data.data.data});
				console.log(res.data.data);

				let arr = this.state.schedule;
				const total = arr.reduce((total, obj) => obj.service.cost + total,0);
				this.setState({apptTotal: total, loading: false});
			})
			.catch((error) => handleFormSubmissionError(error, this));
	};

	componentDidMount() {
		this.props.setState('home', stateKeys.PAGE_CLASS);
		this.props.setState('Sample content for dialog', stateKeys.DIALOG_CONTENT);

		this.loadDataFromServer()
	}

	render()  {
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

							<li className="breadcrumb-item text-nowrap active" aria-current="page">Attendant Schedule</li>
						</ol>
					</nav>

					<div className="d-flex flex-wrap justify-content-between">
						<h2 className="mt-lg-1 pt-lg-1">
							{this.state.receivedAttendant.user.first_name} {this.state.receivedAttendant.user.last_name} Schedule
							<span className="h4 text-muted">/{this.state.filter}</span>
						</h2>

						<div>
							<button className="btn btn-sm btn-outline-accent" onClick={() => this.filterSchedule("all")}>All</button>
							<button className="btn btn-sm btn-outline-accent" onClick={() => this.filterSchedule("active")}>Active</button>
							<button className="btn btn-sm btn-outline-accent" onClick={() => this.filterSchedule("paid")}>Paid</button>
							<button className="btn btn-sm btn-outline-accent" onClick={() => this.filterSchedule("unpaid")}>UnPaid</button>
						</div>
					</div>

				</div>

				<div className="pt-1 pb-5">
					<h1 className="h4 text-dark font-weight-normal">Today's Appointments</h1>
					<h5 className="my-auto mb-5 text-custom font-weight-light"> <Moment format="D MMM YYYY" withTitle>{new Date()}</Moment> </h5>

					<div className="row mt-5">
						<div className="col-lg-8 border-right">

							{this.state.loading ?
								<div className="sweet-loading mt-5 mr-3">
									<ClipLoader
										css={override}
										size={100}
										color={"#3C96B3"}
										loading={this.state.loading}
									/>
								</div>
								:

								this.state.schedule ?
									this.state.schedule.map((appt) => {
										return (
											<div className="row my-2">
												<div className="col-md-9">
													<div className="card box-shadow bg-light">
														<div className="card-body">
															<div className="d-flex justify-content-between">

																<div className='d-flex'>
																	<p className="h4 ml-lg-4 mr-3 my-auto"><i className="czi-time text-custom"/></p>

																	<div className='border-left pl-4'>
																		<h6 className='text-custom mb-2'>{appt.service.name}</h6>
																		<p className="font-weight-light text-custom mb-0">{appt.order.buyer_name}</p>
																	</div>

																</div>

																<p className='text-custom my-auto font-weight-bold'>
																	{/*<Moment format="D MMM YYYY" withTitle>{appt.start_at}</Moment>*/}
																	{formatNaira(appt.service.cost)}
																</p>
															</div>
														</div>
													</div>

												</div>
											</div>
											)

									})
									:
									<h3 className='text-center mt-4'>No appointments made yet </h3>
							}

						</div>

						<div className="col-lg-4">

							<div className="card bg-secondary shadow-none border-0">
								<div className="card-body">
									<p className="card-title mb-0">Total Appointments</p>
									<p className="h2 card-text">{this.state.schedule.length}</p>
								</div>
							</div>
							<hr />

							<div className="card bg-secondary shadow-none border-0">
								<div className="card-body">
									<p className="card-title mb-0">Confirmed Appointments</p>
									<p className="h2 card-text">0</p>
								</div>
							</div>
							<hr />

							<div className="card bg-secondary shadow-none border-0">
								<div className="card-body">
									<p className="card-title mb-0">Amount Earned</p>
									<p className="h2 card-text text-custom">$0.00</p>
								</div>
							</div>
							<hr />

							<div className="card bg-secondary shadow-none border-0">
								<div className="card-body">
									<p className="card-title mb-0">Potential Earnings</p>
									<p className="h2 card-text text-accent">{formatNaira(this.state.apptTotal)}</p>
								</div>
							</div>
							<hr />
						</div>
					</div>
				</div>

				<Modal show={this.state.addToCart} size="" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">
							Add Service To Cart
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex justify-content-between">
							<h5 className='mr-2'>Dreadlock fixing</h5>

							<h6 className='text-accent ml-2'><i className="czi-tag"/> $44.<small>99</small></h6>
						</div>


						<div className="row mt-3">
							<div className="col-lg-4">
								<img src={hairm} alt=""/>
							</div>

							<div className="col-lg-8">
								<div className="form-group">
									<select id="" className="form-control form-control-sm col-8">
										<option>--Select server--</option>
										<option>Chibueze Akanchi</option>
										<option disabled>Vicki Akuna</option>
										<option>Ajiboobs Chi</option>
									</select>
								</div>

								<div className="form-group">
									<select id="" className="form-control form-control-sm col-8">
										<option>--Select time--</option>
										<option>9:00 - 9:30</option>
										<option disabled>9:30 - 10:00</option>
										<option>10:00 - 10:30</option>
										<option>10:30 - 11:00</option>
										<option>11:00 - 11:30</option>
										<option>11:30 - 12:00</option>
									</select>
								</div>
							</div>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-custom" onClick={()=> this.toggleToastAdded()}>
							<i className="czi-cart mr-2"/>
							Add to Cart
						</button>

						<button className="btn btn-outline-danger" onClick={()=> this.toggleAddToCart()}>Close</button>
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.confirmAppointment} size="" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">
							Confirm Appointment
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex justify-content-between">
							<h5 className='mr-2'>Dreadlock fixing</h5>

							<h6 className='text-accent ml-2'><i className="czi-tag"/> $44.<small>99</small></h6>
						</div>
						<hr/>

						<div className="row mt-3">
							<div className="col-lg-4">
								<img src={hairm} alt=""/>
							</div>

							<div className="col-lg-8">
								<p>Oke Okeke</p>

								<p>11:30</p>
							</div>
						</div>

					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-custom" onClick={()=> this.toggleToastConfirmed()}>
							<i className="czi-time mr-2"/>
							Confirm
						</button>

						<button className="btn btn-outline-danger" onClick={()=> this.toggleConfirmAppointment()}>Close</button>
					</Modal.Footer>
				</Modal>

				<div className="toast-container toast-bottom-center" style={{zIndex: '1070',}}>
					<div className={this.state.toastAdded ? "toast mb-3 fade show" : "toast mb-3 fade hide"} id="cart-toast" data-delay="5000" role="alert"
						 aria-live="assertive" aria-atomic="true">
						<div className="toast-header bg-success text-white">
							<i className="czi-check-circle mr-2"/>
							<h6 className="font-size-sm text-white mb-0 mr-auto">Added to cart!</h6>
							<button className="close text-white ml-2 mb-1" type="button" onClick={()=> this.toggleToastAdded()}
									aria-label="Close"><span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="toast-body">This item has been added to your cart.</div>
					</div>
				</div>

				<div className="toast-container toast-bottom-center" style={{zIndex: '1070',}}>
					<div className={this.state.toastConfirmed ? "toast mb-3 fade show" : "toast mb-3 fade hide"} id="cart-toast" data-delay="5000" role="alert"
						 aria-live="assertive" aria-atomic="true">
						<div className="toast-header bg-success text-white">
							<i className="czi-check-circle mr-2"/>
							<h6 className="font-size-sm text-white mb-0 mr-auto">Confirmed!</h6>
							<button className="close text-white ml-2 mb-1" type="button" onClick={()=> this.toggleToastAdded()}
									aria-label="Close"><span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="toast-body">This appointment has been confirmed.</div>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CashierAttendantSchedule);