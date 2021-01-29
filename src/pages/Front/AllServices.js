import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import saloon from "../../assets/images/salon.jpg"
import Endpoint from "../../utils/endpoint";
import {formatNaira, time_convert} from "../../utils/helpers";
import {Modal} from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import Moment from "moment";
import LinesEllipsis from "react-lines-ellipsis";

class Services extends Component {

	state = {
		services: [],
		attendants: [],
		shopSchedule: [],

		addToCart: false,
		toastAdded: false,
		appointments: [],
		selectedService: [],
		serviceDateTime: '',
		attendantId: '',
		incompleteCart: false,
		timePast: false,
		cartLoader: false,
		loading: false,
		selectedAttendantSchedule: [],
		schedule: false,
		scheduleLoading: false,
	};

	openAddToCart = (index) => {
		var services = this.state.services;

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

	removeToastAdded = () => {
		this.setState({toastAdded: false})
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

		if (localStorage.getItem('guestCart')) {
			var lSCart = JSON.parse(localStorage.getItem('guestCart'));
			console.log(lSCart);
			lSCart.push(JSON.stringify(CartProps));
			// const newCart = Object.assign(guestCart, CartProps);

			localStorage.setItem('guestCart', JSON.stringify(lSCart));
			console.log(lSCart);
			localStorage.setItem('guestCartTotal', lSCart.length);

			// this.handleGuestCart = this.handleGuestCart.bind(this);
			this.props.setState(lSCart.length, stateKeys.GUEST_CART_TOTAL);

			this.setState({error: false, success: true, cartLoader: false});
			this.toggleToastAdded();

		} else {
			var guestCart = [];
			guestCart.push(JSON.stringify(CartProps));
			localStorage.setItem('guestCart', JSON.stringify(guestCart));
			localStorage.setItem('guestCartTotal', guestCart.length);
			this.setState({error: false, success: true, cartLoader: false});
			this.toggleToastAdded();
		}

	};

	loadDataFromServer = () => {
		//Featured Services
		Endpoint.getAllShopServices()
			.then(res => {
				this.setState({services: res.data.data});
				console.log(res.data.data)
			});

		Endpoint.getShopAttendants()
			.then(res => {
				this.setState({attendants: res.data.data.slice(0, 3)});
				console.log(res.data.data)
			});

		Endpoint.getShopDetails()
			.then(res => {
				this.setState({shop: res.data.data, shopSchedule: res.data.data.opening_hours});
				console.log(res.data.data.opening_hours)
			});
	};

	componentDidMount() {
		this.props.setState('services', stateKeys.PAGE_CLASS);
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
				<div className="page-title-overlap bg-dark pt-4">
					<div className="container d-lg-flex justify-content-between py-2 py-lg-3">
						<div className="order-lg-1 pr-lg-4 text-center text-lg-left">
							<h1 className="h3 text-light mb-0">All Services</h1>
						</div>
					</div>
				</div>

				<div className="container">

					<div className="row mb-5">
						{
							this.state.services.map( (service, index) => {
								return (
									<div className="col-lg-3 col-md-6 mt-3">
										<div className="card">
											<div className="card-top-img">
												<img src={service.image ? service.image : saloon} className='' alt=""/>
											</div>

											<div className="card-body">

												<h2 className="product-title font-size-sm">
													<LinesEllipsis text={service.name} maxLine='2' ellipsis='...'
														trimRight basedOn='letters' />
												</h2>

												<div className="d-flex justify-content-between">
													<div>
														{
															service.old_cost ?
																<p className="product-meta d-block font-size-sm pb-0 mb-0 strikethrough-red">
																	{formatNaira(service.old_cost)}
																</p>
																:
																null
														}

														<h6 className="text-accent">
															{formatNaira(service.cost)}
														</h6>
													</div>

													<p className="card-text font-size-sm text-dark">
														<span className="text-sm">Duration:</span> {time_convert(service.duration)}
													</p>
												</div>

												<button onClick={()=>this.openAddToCart({index})}
														className="btn btn-sm btn-block btn-custom">
													<i className="czi-cart mr-2"/> Add to cart
												</button>
											</div>
										</div>
									</div>
								)
							})

						}
					</div>

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
																				{Moment(time.start_at).format("l")} - {Moment(time.start_at).format("LT")}
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
							<button className="close text-white ml-2 mb-1" type="button" onClick={()=> this.removeToastAdded()}
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


export default connect(mapStateToProps, mapDispatchToProps)(Services);
