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
import {handleFormSubmissionError} from "../../utils/helpers";
import ClipLoader from "react-spinners/ClipLoader";
import {currencyFormat} from "../../utils/helpers";

class CreateOrder extends Component {

	state = {
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

	setServiceDate = (event) => {
		const target = event.target;
		const value = target.value;

		this.setState({serviceDateTime: value});
	};

	setAttendant = (event) => {
		const target = event.target;
		const value = target.value;

		this.setState({attendantId: value});
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
			service_id: parseInt(this.state.selectedService.id),
			worker_id: parseInt(this.state.attendantId),
			start_at: this.state.serviceDateTime,
		};

		console.log(CartProps);

		Endpoint.addToCart(CartProps)
			.then((res) => {
				console.log(res);
				this.setState({error: false, success: true, cartLoader: false});
				this.toggleToastAdded();
			})
			.catch((error) => handleFormSubmissionError(error, this));
	};

	loadDataFromServer = () => {
		//My Appointments
		Endpoint.getCustomerAppointments()
			.then(res => {
				this.setState({appointments: res.data.data.data});
				console.log(this.state.appointments)
			});

		//Shop Services
		Endpoint.getFeatureServices()
			.then(res => {
				this.setState({services: res.data.data.slice(0, 4)});
				console.log(res.data.data)
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

					<h2 className="mt-lg-1 pt-lg-1">Create Customer Order</h2>
				</div>

				<div className="pt-1 pb-5">
					

					<section>
						<div className="pt-1 pb-5">
							<h1 className="h4 text-dark mb-0 mt-4">Available Services</h1>

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
																<h6 className="card-title font-weight-bold">
																	<LinesEllipsis
																		text={service.name}
																		maxLine='2'
																		ellipsis='...'
																		trimRight
																		basedOn='letters'
																	/>
																</h6>

																<div className="product-price ml-3">
																	<span className="text-accent">{currencyFormat(service.cost/100)}</span>
																</div>
															</div>

															<div className="d-flex justify-content-between mt-2">
																<p className="card-text my-auto font-size-sm text-dark">
																	{service.duration} mins
																</p>

																<button className="btn btn-sm btn-custom" onClick={()=>this.openAddToCart({index})}>
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
					size=""
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

							<h6 className='text-accent ml-2'><i className="czi-tag"/> {currencyFormat(this.state.selectedService.cost/100)}</h6>
						</div>

						<div className="row mt-3">
							<div className="col-lg-4">
								<img src={this.state.selectedService.image ? this.state.selectedService.image : saloon} className='' alt=""/>
							</div>

							<div className="col-lg-8">
								<p className='small'> {this.state.selectedService.description}</p>
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
									loading={this.state.loading}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);