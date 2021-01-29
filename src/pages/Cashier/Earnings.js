import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import {Modal} from 'react-bootstrap';
import hairm from "../../assets/images/home/hairm.png"
import ClipLoader from "react-spinners/ClipLoader";
import Endpoint from "../../utils/endpoint";
import {formatNaira, handleFormSubmissionError} from "../../utils/helpers";
import Moment from "react-moment";

class CashierEarnings extends Component {

	state = {
		addToCart: false,
		toastAdded: false,
		confirmAppointment: false,
		toastConfirmed: false,
		appointments: [],
		earnTotal: "",
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

	loadDataFromServer = () => {
		this.setState({loading: true});

		Endpoint.getShopAppointments()
			.then(res => {
				this.setState({appointments: res.data.data.data});
				console.log(res.data.data.data);

				let arr = this.state.appointments;
				const total = arr.reduce((total, obj) => obj.cost + total,0);
				this.setState({earnTotal: total, loading: false});
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

							<li className="breadcrumb-item text-nowrap active" aria-current="page">My Earnings</li>
						</ol>
					</nav>

					<h2 className="mt-lg-1 pt-lg-1">Earnings</h2>
				</div>

				<div className="pt-1 pb-5">

					<section>
						<div className="box-shadow rounded-lg overflow-hidden p-3 bg-white">
							<div className="pt-1 pb-5">
								<h1 className="h4 text-dark mb-0 mt-4 mr-3 d-inline">Today's Earnings</h1>
								<h5 className="text-accent d-inline">{formatNaira(this.state.earnTotal)}</h5>

								<section className="mb-3">
									<div className="mt-3">

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
											<div className="table-responsive">
												<table className="table table-hover">
													<thead className="thead-light">
													<tr className='font-weight-bold'>
														<td>S/No</td>
														<td>Customer</td>
														<td>Attendant</td>
														<td>Service</td>
														<td>Amount</td>
														<td>Time</td>
													</tr>
													</thead>
													<tbody>

													{this.state.appointments ?
														this.state.appointments.map((appointment, index) => {
															return (
																<tr>
																	<td>{index+1}</td>
																	<td>{appointment.order.buyer_name}</td>
																	<td>{appointment.worker_name}</td>
																	<td>{appointment.service.name}</td>
																	<td>${appointment.service.cost}</td>
																	<td>
																		<Moment format="D MMM YYYY" withTitle>
																			{appointment.order.created_at}
																		</Moment>
																	</td>
																</tr>
															)
														})
														:
														<h5>No earnings yet</h5>
													}

													</tbody>
												</table>
											</div>

										}
									</div>
								</section>
							</div>
						</div>

					</section>
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

export default connect(mapStateToProps, mapDispatchToProps)(CashierEarnings);