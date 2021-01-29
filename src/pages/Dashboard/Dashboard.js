import React, {Component, useState} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import {Modal} from 'react-bootstrap';
import hairm from "../../assets/images/home/hairm.png"
import Endpoint from "../../utils/endpoint";
import LinesEllipsis from "react-lines-ellipsis";
import saloon from "../../assets/images/salon.jpg";
import DatePicker from "react-datepicker";
// import {setHours, setMinutes, getDay} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatNaira, time_convert, handleFormSubmissionError} from "../../utils/helpers";
import ClipLoader from "react-spinners/ClipLoader";
import Moment from "react-moment";

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			addToCart: false,
			toastAdded: false,
			appointments: [],
			services: [],
			selectedService: [],
			serviceDateTime: '',
			attendantId: '',
			incompleteCart: false,
			timePast: false,
			cartLoader: false,
			selectedAttendantSchedule: [],
			schedule: false,
			scheduleLoading: false,
		};
	}

	openAddToCart = (index) => {
		var services = this.state.services;
		this.setState({schedule: false});

		if (index) {
			this.setState({selectedService: services[index.index]});
			setTimeout(() => {
				console.log(this.state.selectedService);
				this.setState({addToCart: !this.state.addToCart});
				}, 500
			);

		}
	};

	toggleAddToCart = () => {
		this.setState({addToCart: !this.state.addToCart});
	};

	toggleToastAdded = () => {
		this.setState({toastAdded: !this.state.toastAdded});
		this.setState({addToCart: !this.state.addToCart});
		let currentState = this;
		setTimeout(function() {
			currentState.setState({toastAdded: false});
		}, 5000);
	};

	setServiceDate = (event) => {
		const target = event.target;
		const value = target.value;

		this.setState({serviceDateTime: value});
	};

	setAttendant = (event) => {
		const value = event.target.value;

		this.setState({attendantId: value});
		if (value) {
			this.getAttendantSchedule(value);
		}
	};

	getAttendantSchedule = (id) => {
		this.setState({scheduleLoading: true});

		Endpoint.getAttendantSchedule(id)
			.then(res => {
				this.setState({selectedAttendantSchedule: res.data.data, schedule: true, scheduleLoading: false});
				console.log(res.data.data);
			})
	};

	addToCart = () => {
		let currentstate = this;
		this.setState({cartLoader: true});
		console.log(this.state.cartLoader);
		setTimeout(function() {
			console.log(currentstate.state.cartLoader);
		}, 1000);

		if (!this.state.serviceDateTime || !this.state.attendantId) {
			this.setState({incompleteCart: true, timePast: false, cartLoader: false});
			return false;
		} else if (this.state.serviceDateTime && this.state.attendantId) {
			this.setState({incompleteCart: false, timePast: false, cartLoader: true});
		}

		const startTime = this.state.serviceDateTime;
		if (new Date() > new Date(startTime)) {
			this.setState({timePast: true, incompleteCart: false, timeDisorder: false, cartLoader: false});
			return false
		}

		const CartProps = {
			service_id: this.state.selectedService.id,
			worker_id: this.state.attendantId,
			start_at: this.state.serviceDateTime,
		};

		console.log(CartProps);

		Endpoint.addToCart(CartProps)
			.then((res) => {
				console.log(res);
				this.setState({error: false, success: true, cartLoader: false});
				this.toggleToastAdded();

				Endpoint.getCartTotal()
					.then((res) => {
						localStorage.setItem('cartTotal', res.data.data.count);
					})
			})
			.catch((error) => handleFormSubmissionError(error, this));
	};

	loadDataFromServer = () => {
		//My Appointments
		Endpoint.getCustomerSessions('paid')
			.then(res => {
				this.setState({appointments: res.data.data.data.slice(0, 4)});
				console.log(this.state.appointments)
			});

		//Shop Services
		Endpoint.getFeatureServices()
			.then(res => {
				this.setState({services: res.data.data.slice(0, 4)});
				console.log(res.data.data)
			});

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

		// const [startDate, setStartDate] = useState(
		// 	setHours(setMinutes(new Date(), 0), 9)
		// );
		// const isWeekday = date => {
		// 	const day = getDay(date);
		// 	return day !== 0 && day !== 6;
		// };
		// const filterPassedTime = time => {
		// 	const currentDate = new Date();
		// 	const selectedDate = new Date(time);
		//
		// 	return currentDate.getTime() < selectedDate.getTime();
		// };

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
						<a href="/dashboard/cart" className="btn btn-accent my-auto">
							<i className="czi-cart mr-2"/> Go To Cart
						</a>
					</div>
				</div>

				<div className="pt-1 pb-5">

					{
						this.state.appointments.length ?
							<div>
								<h1 className="h4 text-dark mb-0">My Upcoming Appointments</h1>
								<section className='border-bottom pb-4'>
									<div className="row">

										{ this.state.appointments.map(appointment => {
											return (
												<div className="col-md-6 col-lg-3">
													<div className="card product-card mt-3 box-shadow">
														{/*<img src={hairm} className="card-img-top" alt="Card image"/>*/}

														<div className="card-body">
															<div className="d-flex justify-content-between">
																<h6 className="card-title">
																	<LinesEllipsis
																		text={appointment.service_name}
																		maxLine='2'
																		ellipsis='...'
																		trimRight
																		basedOn='letters'
																	/>
																</h6>

																<div className="product-price">

																	{
																		appointment.old_cost ?
																			<span className="text-muted product-meta font-size-sm strikethrough-red">
																				{formatNaira(appointment.old_cost)} <br/>
																			</span>
																				:
																			null
																	}

																	<span className="text-accent">
																		{formatNaira(appointment.cost)}
																	</span>
																</div>
															</div>
															<p className="card-text font-size-sm text-muted mb-1">
																<span className="text-primary mr-2"> <i
																	className="czi-user"/> </span>
																{appointment.worker_name}
															</p>

															<p className="card-text font-size-sm text-muted mb-1">
																<span className="text-primary mr-2"> <i
																	className="czi-bell"/> </span>
																<Moment format="D MMM YYYY" withTitle>
																	{appointment.start_at}
																</Moment>
															</p>

															<p className="card-text font-size-sm text-muted mb-1">
																<span className="text-primary mr-2"> <i
																	className="czi-time"/> </span>
																<Moment format="hh:mm:ss" withTitle>
																	{appointment.start_at}
																</Moment>
																&nbsp;to&nbsp;
																<Moment format="hh:mm:ss" withTitle>
																	{appointment.end_at}
																</Moment>
															</p>
														</div>

													</div>
												</div>
											)
										})
									}
									</div>
								</section>
							</div>
							:
							null
					}

					<section>
						<div className="pt-1 pb-5">
							<h1 className="h4 text-dark mb-0 mt-4">Popular Services</h1>

							<section className="mb-5 pb-5">
								<div className="mt-3">

									<div className="row">

										{this.state.services.map((service, index) => {
											return (
												<div className="col-lg-3">
													<div className="card box-shadow">
														<img src={hairm} className="card-img-top" alt="Card image"/>
														<div className="card-body">
															<div className="d-flex justify-content-between">
																<p className=" font-weight-bold">
																	<LinesEllipsis
																		text={service.name}
																		maxLine='2'
																		ellipsis='...'
																		trimRight
																		basedOn='letters'
																	/>
																</p>

																<div className="product-price ml-3">
																	{
																		service.old_cost ?
																			<p className="product-meta d-block font-size-sm pb-0 mb-0 strikethrough-red">
																				{formatNaira(service.old_cost)}
																			</p>
																			:
																			null
																	}

																	<span className="text-accent">{formatNaira(service.cost)}</span>
																</div>
															</div>

															<div className="d-flex justify-content-between mt-2">
																<p className="card-text my-auto font-size-sm text-dark">
																	{time_convert(service.duration)}
																</p>

																<button className="btn btn-sm btn-accent" onClick={()=>this.openAddToCart({index})}>
																	<i className="czi-cart mr-2"/> Add to cart
																</button>
															</div>
														</div>
													</div>
												</div>
											)
										})}

									</div>

								</div>
							</section>

						</div>

					</section>
				</div>

				<Modal
					show={this.state.addToCart}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">
							Add Service To Cart
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex justify-content-between">
							<h5 className='mr-2'>{this.state.selectedService.name}</h5>

							<h6 className='text-accent ml-2'><i className="czi-tag"/> {formatNaira(this.state.selectedService.cost)}</h6>
						</div>

						<div className="row mt-3">
							<div className="col-lg-4">
								<img src={this.state.selectedService.image ? this.state.selectedService.image : saloon} className='' alt=""/>
							</div>

							<div className="col-lg-8">
								<p className='small'><span className='font-weight-bold'>Description: </span> {this.state.selectedService.description}</p>
								<div className="form-group">
									<select id="" className="form-control form-control-sm col-10" required onChange={this.setAttendant}>
										<option value='null'>--Select attendant--</option>
										{this.state.selectedService.available_workers ? this.state.selectedService.available_workers.map(worker => {
											return(
												<option value={worker.user.id}>{worker.user.last_name} {worker.user.first_name}</option>
											)
										})
										:
											<option value="">No available attendant</option>
										}
									</select>

									{
										this.state.schedule ?
											<div className='border border-rad-2 p-3 mt-2 mb-3 col-10'>
												<p className='title-small mb-1'>
													Booked Times
												</p>
												{
													this.state.scheduleLoading ?
														<div className="sweet-loading mr-3">
															<ClipLoader
																css={override}
																size={30}
																color={"#3C96B3"}
																loading={this.state.scheduleLoading}
															/>
														</div>
														:
														<div className='bg-gray scrollschedule p-2'>
															{
																this.state.selectedAttendantSchedule.length ?
																	this.state.selectedAttendantSchedule.map(time => {
																	return (
																		<div className='bg-white d-inline-block p-2'>
																			{Moment(time.start_at).format("LT")}
																			&nbsp; to {Moment(time.end_at).format("LT")}
																		</div>
																	)
																})
																	:
																	<p className='text-center mb-0'>No appointment booked.</p>
															}
														</div>
												}
											</div>
										:
										null
									}

								</div>

								{/*<div className="form-group">*/}
								{/*	<DatePicker*/}
								{/*		selected={startDate}*/}
								{/*		onChange={date => setStartDate(date)}*/}
								{/*		filterDate={isWeekday}*/}
								{/*		placeholderText="Select a weekday"*/}
								{/*		showTimeSelect*/}
								{/*		filterTime={filterPassedTime}*/}
								{/*		dateFormat="MMMM d, yyyy h:mm aa"*/}
								{/*	/>*/}
								{/*</div>*/}

								<div className="form-group">
									<input type="datetime-local" className="form-control form-control-sm col-10" onChange={this.setServiceDate}/>
								</div>

								{this.state.incompleteCart ?
									<div className="col-10 bg-danger fade show border-rad-1 text-center p-2 mb-3">
										<p className="small text-light mb-0">
											<i className="czi-bell mr-2"/> Please fill in all fields.
										</p>
									</div>
									: null
								}

								{this.state.timePast ?
									<div className="col-10 bg-danger fade show border-rad-1 text-center p-2 mb-3">
										<p className="small text-light mb-0">
											<i className="czi-bell mr-2"/> Time for appointment must be in the future.
										</p>
									</div>
									: null
								}

								{this.state.error ?
									<div className="col-10 bg-danger fade show border-rad-1 text-center p-2 mb-3">
										<p className="small text-light mb-0">
											<i className="czi-bell mr-2"/> {this.state.errorMessage}
										</p>
									</div>
									: null
								}
							</div>

						</div>

					</Modal.Body>
					<Modal.Footer>
						{this.state.cartLoader ?
							<div className="sweet-loading mr-3">
								<ClipLoader
									css={override}
									size={30}
									color={"#3C96B3"}
									loading={this.state.cartLoader}
								/>
							</div>
							:
							<button className="btn btn-custom" onClick={()=> this.addToCart()}>
								<i className="czi-cart mr-2"/>
								Add to Cart
							</button>
						}

						<button className="btn btn-outline-danger" onClick={()=> this.toggleAddToCart()}>Close</button>
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
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);