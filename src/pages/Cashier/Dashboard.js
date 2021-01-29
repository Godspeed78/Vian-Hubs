import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import {Modal} from 'react-bootstrap';
import {Link} from "react-router-dom";
import hairm from "../../assets/images/home/hairm.png"
import Endpoint from "../../utils/endpoint";
import {formatNaira, handleFormSubmissionError} from "../../utils/helpers";
import ClipLoader from "react-spinners/ClipLoader";
import LinesEllipsis from "react-lines-ellipsis";

class CashierDash extends Component {

	state = {
		addToCart: false,
		toastAdded: false,
		confirmAppointment: false,
		toastConfirmed: false,
		apptLoad: false,
		loading: false,
		orders: [],
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
		this.setState({apptLoad: true});
		this.setState({earnLoad: true});

		Endpoint.getShopAppointments()
			.then(res => {
				this.setState({appointments: res.data.data.data});
				console.log(res.data.data.data);

				let arr = this.state.appointments;
				const total = arr.reduce((total, obj) => obj.cost + total,0);
				this.setState({earnTotal: total, loading: false});
			})
			.catch((error) => handleFormSubmissionError(error, this));

		Endpoint.getShopOrders()
			.then(res => {
				this.setState({apptLoad: false, orders: res.data.data.data});
				console.log(res.data.data)
			})
			.catch((error) => handleFormSubmissionError(error, this));

		// Cart Total
		Endpoint.getCartTotal()
			.then((res) => {
				localStorage.setItem('cartTotal', res.data.data.count);
			})
	};

	componentDidMount() {
		this.props.setState('home', stateKeys.PAGE_CLASS);
		this.props.setState('Sample content for dialog', stateKeys.DIALOG_CONTENT);

		this.loadDataFromServer();
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

							<li className="breadcrumb-item text-nowrap active" aria-current="page">My Dashboard</li>
						</ol>
					</nav>

					<div className="d-flex justify-content-between">
						<h2 className="mt-lg-1 pt-lg-1">Dashboard</h2>
						<a href="/cashier/cart" className="btn btn-sm btn-accent my-auto">
							<i className="czi-cart mr-2"/> Go To Cart
						</a>
					</div>

				</div>

				<div className="pt-1 pb-5">
					<div className="d-flex flex-wrap justify-content-between">
						<h1 className="h4 text-dark mb-2">Upcoming Appointments</h1>
						<Link to="/cashier/shop" >
							<button className="btn btn-outline-accent btn-sm mb-2"><i className="czi-add mr-2"/>Add Appointment</button>
						</Link>
					</div>

					{
						this.state.apptLoad ?
							<div className="sweet-loading my-5vh mr-3">
								<div className="row justify-content-center">
									<div className="col-md-3">
										<div className=" product-card box-shadow">
											<div className="card-body">
												<ClipLoader
													css={override}
													size={70}
													color={"#3C96B3"}
													loading={this.state.apptLoad}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							:
							<section className='border-bottom pb-4'>
								<div className="row">

									{
										this.state.orders.length ?
											this.state.orders.map( (order) => {
												return (
													<div className="col-md-6 col-lg-3">
														<div className="card product-card mt-3 box-shadow">
															{/*<img src={hairm} className="card-img-top" alt="Card image"/>*/}

															<div className="card-body">
																<div className="d-flex justify-content-between">
																	<h6 className="card-title">
																		<LinesEllipsis
																			text={order.service.name}
																			maxLine='2'
																			ellipsis='...'
																			trimRight
																			basedOn='letters'
																		/>
																	</h6>

																	<div className="product-price">
																		<span className="text-accent">${order.service.cost}</span>
																	</div>
																</div>
																<p className="card-text font-size-sm text-muted mb-1">
																	<span className="text-primary mr-2">
																		<i className="czi-user"/>
																	</span>
																	{order.worker_name}
																</p>

																<p className="card-text font-size-sm text-muted mb-1">
																	<span className="text-primary mr-2"> <i
																		className="czi-bell"/>
																	</span>
																	{new Date(order.start_at).toLocaleDateString("en-NG")} &nbsp;
																	{new Date(order.start_at).toLocaleTimeString("en-NG")}
																	{/*{order.start_at}*/}
																</p>

																<p className="card-text font-size-sm text-muted mb-1">
																	<span className="text-primary mr-2">
																		<i className="czi-time"/>
																	</span>
																	{order.service.duration} mins
																</p>

																<button className="btn btn-custom btn-sm mt-2">
																	<i className="czi-check mr-2"/> Confirm Appointment
																</button>
															</div>

														</div>
													</div>
												)
											})
											:
											<div className='col-12 mt-4'>
												<div className='bg-white shadow p-5 text-center border-rad-2'>
													<h5 className="text-center mb-0">No appointments made yet.</h5>
												</div>
											</div>
									}
								</div>
							</section>
					}

					<section>
						<div className="box-shadow rounded-lg overflow-hidden p-3 bg-white">
							<div className="pt-1 pb-5">
								<h1 className="h4 text-dark mb-0 mt-4 mr-3 d-inline">Today's Earnings</h1>
								<h5 className="text-accent d-inline">
									{formatNaira(this.state.earnTotal)}
								</h5>

								<section className="mb-3">
									<div className="mt-3">
										<div className="table-responsive">
											<table className="table table-hover">
												<thead className="thead-light">
												<tr className='font-weight-bold'>
													<td>S/No</td>
													<td>Customer</td>
													<td>Service</td>
													<td>Amount</td>
													<td>Time</td>
												</tr>
												</thead>
												<tbody>
												{
													this.state.orders ?
														this.state.orders.map( (order, index) => {
															return (
																<tr>
																	<td>{index+1}</td>
																	<td>{order.order.buyer_name}</td>
																	<td>{order.service.name}</td>
																	<td>{order.service.cost}</td>
																	<td>
																		{/*{new Date(order.start_at).toLocaleDateString("en-NG")} &nbsp;*/}
																		{new Date(order.start_at).toLocaleTimeString("en-NG")}
																	</td>
																</tr>
															)
														})
														:
														<tr>
															<td colSpan='5'>
																<h5 className="text-center">No earnings yet.</h5>
															</td>
														</tr>
												}
												</tbody>
											</table>
										</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CashierDash);