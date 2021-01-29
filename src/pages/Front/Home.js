import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import Endpoint from '../../utils/endpoint';
import Hero from "../../assets/images/home/hero-slider/03.jpg"
import hairm from "../../assets/images/home/hairm.png"
import saloon from "../../assets/images/salon.jpg"
import salon from "../../assets/images/home/salon.png"
import user1 from "../../assets/images/home/user 1.svg"
import LinesEllipsis from 'react-lines-ellipsis'
import {formatNaira, handleFormSubmissionError, nairaFormat, time_convert} from "../../utils/helpers";
import Moment from "moment";
import moment from "moment";
import starful from "../../assets/images/starful.svg";
import star from "../../assets/images/star.svg";
import {Link} from "react-router-dom";
import {Modal} from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

class Home extends Component {
	state = {
		featured: [],
		attendants: [],
		shopSchedule: [],

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
			localStorage.setItem('guestCartTotal', lSCart.length);
			console.log(lSCart);

			this.setState({error: false, success: true, cartLoader: false});
			this.toggleToastAdded();

		} else {
			var guestCart = [];
			guestCart.push(JSON.stringify(CartProps));
			localStorage.setItem('guestCart', JSON.stringify(guestCart));
			localStorage.setItem('guestCart', guestCart.length);
				this.setState({error: false, success: true, cartLoader: false});
				this.toggleToastAdded();
		}

	};

	loadDataFromServer = () => {
		Endpoint.getFeatureServices()
			.then(res => {
				this.setState({featured: res.data.data.slice(0, 4), services: res.data.data.slice(0, 4)});
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
				{/*Hero section*/}
				<section className="mb-4 mb-lg-5">
					<div style={{backgroundColor: '#EAA170'}}>
						<div className="container">
							<div className="row" >
								<div className="col-lg-6 order-lg-2 min-vh-40" style={{backgroundImage: `url(${Hero})`, backgroundSize: 'cover', }}>
								</div>
								<div className="col-lg-6 order-lg-1">
									<div className="hero-text">
										<h1 className="font-weight-bold">Instantly book salons and spas</h1>
										<p className="">Get unforgettable beauty and wellness experience with VianHubs</p>
										<p>
											<img className='d-inline-block' src={starful} style={{height: '30px'}}/>
											<img className='d-inline-block' src={starful} style={{height: '30px'}}/>
											<img className='d-inline-block' src={starful} style={{height: '30px'}}/>
											<img className='d-inline-block' src={starful} style={{height: '30px'}}/>
											<img className='d-inline-block' src={starful} style={{height: '30px'}}/>
										</p>
										<p className="text-muted">With over 200 reviews from customers</p>
										<a href="/services" className="btn btn-block btn-custom">Book Appointment</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="mb-5 pb-5">
					<div className="container">
						<h2 className="font-weight-bold mb-4">
							Featured
							<Link to={'/services'}><span className="small text-underline ml-2 text-dark">view all</span></Link>
						</h2>

						<div className="row">
							{
								this.state.featured.map((service, index) => {
									return(
										<div className="col-lg-3 mt-3">
											<div className="card">
												<div className="card-top-img">
													<img src={service.image ? service.image : saloon} className='' alt=""/>
												</div>

												<div className="card-body">

													<h5 className="card-title font-weight-bold">
														<LinesEllipsis
															text={service.name}
															maxLine='2'
															ellipsis='...'
															trimRight
															basedOn='letters'
														/>
													</h5>

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
															{time_convert(service.duration)}
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
				</section>

				<section className="bg-soft">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 py-5 my-auto">
								<h6 className="font-weight-600">
									VIAN Hub salon is a true reflection of style and provides luxurious, celebrity
									treatment to all visitors – high-end beauty experience with a very comfortable
									approach. Our boundless commitment is underlined by our continued search for the
									very best stylists...
									<br/><br/>
									Incorporating all the services offered that include hair styling, haircuts, manicure
									and nails, pedicure, facials, cleansing and more, the salon is led by respected
									beauty-world experts.
									<br/><br/>

									Services offered ;

									<br />
									Hair styling,
									Haircuts,
									Manicure and nails,
									Pedicure,
									Facials,
									Cleansing

									<br /> <br/>
									Location: <br/>
									Shop 20, Plot 134 Adetokunbo Ademola Cres, Wuse 900271, II
								</h6>
							</div>

							<div className="col-lg-6">
								<img src={salon} className="my--4" alt=""/>
							</div>
						</div>
					</div>
				</section>

				<section className="mb-5 pt-5 pb-5">
					<div className="container">
						<h2 className="font-weight-bold mb-4">Book with the best </h2>

						<div className="row mt-4">
							<div className="col-md-6 border-right">
								<p className='mb-5'>Choose from our highly rated staff</p>

								{this.state.attendants ?
									this.state.attendants.map((attendant) => {
										return (
											<div className="d-flex border-bottom pt-2">
												<img src={user1} style={{height: '75px'}} alt=""/>
												<div className="ml-2">
													<h6 className="text-purple font-weight-bold mt-1">{attendant.user.first_name} {attendant.user.last_name}</h6>
													<p className='mb-1'>
														<img className='d-inline-block' src={starful} style={{height: '15px'}}/>
														<img className='d-inline-block' src={starful} style={{height: '15px'}}/>
														<img className='d-inline-block' src={starful} style={{height: '15px'}}/>
														<img className='d-inline-block' src={starful} style={{height: '15px'}}/>
														<img className='d-inline-block' src={starful} style={{height: '15px'}}/>
													</p>
													<p className="small font-weight-light">{attendant.type.name}</p>
												</div>
											</div>
										)
									})
									:
									null
								}
							</div>

							<div className="col-md-6">
								<p className='mb-5 ml-3'>At a convenient schedule</p>

								<div className="mx-lg-5">
									{
										this.state.shopSchedule.length ?
											this.state.shopSchedule.map(day => {
												var d = new Date();
												var n = d.getDay();
												var boldClass = "d-flex justify-content-between pt-2 font-weight-bold";
												var regClass = "d-flex justify-content-between pt-2";
												
												switch (day.weekday) {
													case 0:
														{
															var start = new Date();
															var end = new Date();
															
															const sTimes = day.start_time.split(':');
															start.setHours(sTimes[0]);
															start.setMinutes(sTimes[1]);
															start.setSeconds(sTimes[2]);
															
															const eTimes = day.end_time.split(':');
															end.setHours(eTimes[0]);
															end.setMinutes(eTimes[1]);
															end.setSeconds(eTimes[2]);
														}
														
														return (
															day.weekday === n ?
																<div className = {boldClass}>
																	<p>Sunday</p>
																	<p>
																		{moment(start).format("LT")} - {moment(end).format("LT")}
																	</p>
																</div>
																:
																<div className = {regClass}>
																	<p>Sunday</p>
																	<p>
																		{moment(start).format("LT")} - {moment(end).format("LT")}
																	</p>
																</div>
														);

													case 1:
														{
															var start2 = new Date();
															var end2 = new Date();
															
															const sTimes = day.start_time.split(':');
															start2.setHours(sTimes[0]);
															start2.setMinutes(sTimes[1]);
															start2.setSeconds(sTimes[2]);
															
															const eTimes = day.end_time.split(':');
															end2.setHours(eTimes[0]);
															end2.setMinutes(eTimes[1]);
															end2.setSeconds(eTimes[2]);
														}
														return (
															day.weekday === n ?
																<div className = {boldClass}>
																	<p>Monday</p>
																	<p>
																		{moment(start2).format("LT")} - {moment(end2).format("LT")}
																	</p>
																</div>
																:
																<div className = {regClass}>
																	<p>Monday</p>
																	<p>
																		{moment(start2).format("LT")} - {moment(end2).format("LT")}
																	</p>
																</div>
														);

													case 2:
													{
														var start3 = new Date();
														var end3 = new Date();
														
														const sTimes = day.start_time.split(':');
														start3.setHours(sTimes[0]);
														start3.setMinutes(sTimes[1]);
														start3.setSeconds(sTimes[2]);
														
														const eTimes = day.end_time.split(':');
														end3.setHours(eTimes[0]);
														end3.setMinutes(eTimes[1]);
														end3.setSeconds(eTimes[2]);
													}
														return (
															day.weekday === n ?
																<div className = {boldClass}>
																	<p>Tuesday</p>
																	<p>
																		{moment(start3).format("LT")} - {moment(end3).format("LT")}
																	</p>
																</div>
																:
																<div className = {regClass}>
																	<p>Tuesday</p>
																	<p>
																		{moment(start3).format("LT")} - {moment(end3).format("LT")}
																	</p>
																</div>
														);

													case 3:
													{
														var start4 = new Date();
														var end4 = new Date();
														
														const sTimes = day.start_time.split(':');
														start4.setHours(sTimes[0]);
														start4.setMinutes(sTimes[1]);
														start4.setSeconds(sTimes[2]);
														
														const eTimes = day.end_time.split(':');
														end4.setHours(eTimes[0]);
														end4.setMinutes(eTimes[1]);
														end4.setSeconds(eTimes[2]);
													}
														return (
															day.weekday === n ?
																<div className = {boldClass}>
																	<p>Wednesday</p>
																	<p>
																		{moment(start4).format("LT")} - {moment(end4).format("LT")}
																	</p>
																</div>
																:
																<div className = {regClass}>
																	<p>Wednesday</p>
																	<p>
																		{moment(start4).format("LT")} - {moment(end4).format("LT")}
																	</p>
																</div>
														);

													case 4:
													{
														var start5 = new Date();
														var end5 = new Date();
														
														const sTimes = day.start_time.split(':');
														start5.setHours(sTimes[0]);
														start5.setMinutes(sTimes[1]);
														start5.setSeconds(sTimes[2]);
														
														const eTimes = day.end_time.split(':');
														end5.setHours(eTimes[0]);
														end5.setMinutes(eTimes[1]);
														end5.setSeconds(eTimes[2]);
													}
														return (
															day.weekday === n ?
																<div className = {boldClass}>
																	<p>Thursday</p>
																	<p>
																		{moment(start5).format("LT")} - {moment(end5).format("LT")}
																	</p>
																</div>
																:
																<div className = {regClass}>
																	<p>Thursday</p>
																	<p>
																		{moment(start5).format("LT")} - {moment(end5).format("LT")}
																	</p>
																</div>
														);

													case 5:
													{
														var start6 = new Date();
														var end6 = new Date();
														
														const sTimes = day.start_time.split(':');
														start6.setHours(sTimes[0]);
														start6.setMinutes(sTimes[1]);
														start6.setSeconds(sTimes[2]);
														
														const eTimes = day.end_time.split(':');
														end6.setHours(eTimes[0]);
														end6.setMinutes(eTimes[1]);
														end6.setSeconds(eTimes[2]);
													}
														return (
															day.weekday === n ?
																<div className = {boldClass}>
																	<p>Friday</p>
																	<p>
																		{moment(start6).format("LT")} - {moment(end6).format("LT")}
																	</p>
																</div>
																:
																<div className = {regClass}>
																	<p>Friday</p>
																	<p>
																		{moment(start6).format("LT")} - {moment(end6).format("LT")}
																	</p>
																</div>
														);

													case 6:
													{
														var start7 = new Date();
														var end7 = new Date();
														
														const sTimes = day.start_time.split(':');
														start7.setHours(sTimes[0]);
														start7.setMinutes(sTimes[1]);
														start7.setSeconds(sTimes[2]);
														
														const eTimes = day.end_time.split(':');
														end7.setHours(eTimes[0]);
														end7.setMinutes(eTimes[1]);
														end7.setSeconds(eTimes[2]);
													}
														return (
															day.weekday === n ?
																<div className = {boldClass}>
																	<p>Saturday</p>
																	<p>
																		{moment(start7).format("LT")} - {moment(end7).format("LT")}
																	</p>
																</div>
																:
																<div className = {regClass}>
																	<p>Saturday</p>
																	<p>
																		{moment(start7).format("LT")} - {moment(end7).format("LT")}
																	</p>
																</div>
														);
													}
												})
												:
												null
										}

								</div>

							</div>
						</div>
					</div>
				</section>


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


export default connect(mapStateToProps, mapDispatchToProps)(Home);