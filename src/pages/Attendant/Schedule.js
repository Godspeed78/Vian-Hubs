import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import {Modal} from 'react-bootstrap';
import Moment from "react-moment";
import hairm from "../../assets/images/home/hairm.png"
import Endpoint from "../../utils/endpoint";
import {user_storage, currencyFormat} from "../../utils/helpers"
import ClipLoader from "react-spinners/ClipLoader";
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class AttendantSchedule extends Component {

	state = {
		addToCart: false,
		toastAdded: false,
		confirmAppointment: false,
		toastConfirmed: false,
		filter:"active"
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
	getSessions = () => {
		this.setState({loading:true})
		Endpoint.getAttendantSessions(user_storage.worker_profile.id, this.state.filter)
		.then(res => {
			this.setState({attendantSessions: res.data.data.data, loading:false});
			console.log("Sessions", res.data.data.data)
		})

		setTimeout(() => {
			this.setState({
				countSession:  this.state.attendantSessions?.length
			})
		}, 2000)
	}

	filterSchedule = (e) => {
		this.setState({filter:e.target.value, loading:true, attendantSessions:false});
		setTimeout(() => {
			this.componentDidMount();
		},2000)
	};

	filterSchedules = (value) => {
		this.setState({filter: value, loading:true, attendantSessions:false});
		setTimeout(() => {
			this.componentDidMount();
		},2000)
	};

	componentDidMount() {
		this.getSessions();

		this.props.setState('home', stateKeys.PAGE_CLASS);

		this.props.setState('Sample content for dialog', stateKeys.DIALOG_CONTENT);
	}

	render() {
		const override = {
			display: 'block',
			margin: '0 auto',
			// borderColor: 'red',
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

							<li className="breadcrumb-item text-nowrap active" aria-current="page">My Schedule</li>
						</ol>
					</nav>

					<div className="d-flex justify-content-between flex-wrap">
						<h2 className="mt-lg-1 pt-lg-1">
							Schedule
							<span className="h4 text-muted">/{this.state.filter}</span>
						</h2>
						
						<div>
							<button className="btn btn-sm btn-outline-accent" onClick={() => this.filterSchedules("active")}>Active</button>
							<button className="btn btn-sm btn-outline-accent" onClick={() => this.filterSchedules("paid")}>Paid</button>
							<button className="btn btn-sm btn-outline-accent" onClick={() => this.filterSchedules("unpaid")}>UnPaid</button>
							<button className="btn btn-sm btn-outline-accent" onClick={() => this.filterSchedules("all")}>All</button>
						</div>
					</div>
					
				</div>

				<div className="pt-1 pb-5">
					<h1 className="h4 text-dark font-weight-normal">Appointments</h1>
					
					<h5 className="my-auto mb-5 text-custom font-weight-light"> <Moment format="DD MMM YYYY" withTitle>{new Date()}</Moment> </h5>
					
					{/*<div className="form-group">*/}
					{/*	<select id="" className="form-control form-control-sm col-4" required onChange={this.filterSchedule}>*/}
					{/*		<option value='null'>--Filter Appointments by--</option>*/}
					{/*			<option value={"paid"}>Paid</option>*/}
					{/*			<option value={"unpaid"}>Unpaid</option>*/}
					{/*			<option value={"active"}>Active</option>*/}
					{/*	</select>*/}
					{/*</div>*/}

					<div className="row mt-5">
						<div className="col-lg-8 border-right">
							{this.state.attendantSessions && this.state.attendantSessions.map(a => {
								return(
									<div className="row my-2">
										<div className="col-md-9">
											<div className={"card box-shadow bg-custom"}>
												<div className="card-body">
													<div className="d-flex justify-content-between">
		
														<div className='d-flex'>
															<p className="h4 ml-lg-4 mr-3 my-auto"><i className="czi-check-circle text-light"/></p>
		
															<div className='border-left pl-4'>
																<h6 className='text-white mb-2'>{a.service_name}</h6>
																	<p className="font-weight-light text-white mb-0">{a.order?.buyer_name}</p>
															</div>
		
														</div>
		
														<p className='text-white my-auto font-weight-bold'>11:30 a.m</p>
													</div>
												</div>
											</div>
		
										</div>
									</div>
								)
							})}

							{this.state.loading ?
								<div className="sweet-loading">
									<ClipLoader css={override} size={60} color={"#3C96B3"} loading={this.state.spinner}/>
								</div> : null}

							<div className="row my-2">
								<div className="col-md-9">
									<hr className='my-3'/>
								</div>
							</div>
							
						{/*
							<div className="row my-2">
								<div className="col-md-9">
									<div className="card box-shadow bg-light">
										<div className="card-body">
											<div className="d-flex justify-content-between">

												<div className='d-flex'>
													<p className="h4 ml-lg-4 mr-3 my-auto"><i className="czi-time text-custom"/></p>

													<div className='border-left pl-4'>
														<h6 className='text-custom mb-2'>Dreadlock fixing</h6>
														<p className="font-weight-light text-custom mb-0">Oko Okoko</p>
													</div>

												</div>

												<p className='text-custom my-auto font-weight-bold'>4:00 p.m</p>
											</div>
										</div>
									</div>

								</div>
							</div> */}
						</div>

						<div className="col-lg-4">

							<div className="card bg-secondary shadow-none border-0">
								<div className="card-body">
									<p className="card-title mb-0">Total Appointments</p>
										<p className="h2 card-text">{this.state.attendantSessions?.length}</p>
								</div>
							</div>
							<hr />

							<div className="card bg-secondary shadow-none border-0">
								<div className="card-body">
									<p className="card-title mb-0">Confirmed Appointments</p>
									<p className="h2 card-text">{this.state.attendantSessions?.length}</p>
								</div>
							</div>
							<hr />

							<div className="card bg-secondary shadow-none border-0">
								<div className="card-body">
									<p className="card-title mb-0">Amount Earned</p>
									<p className="h2 card-text text-custom">{currencyFormat(0)}</p>
								</div>
							</div>
							<hr />

							{/* <div className="card bg-secondary shadow-none border-0">
								<div className="card-body">
									<p className="card-title mb-0">Potential Earnings</p>
									<p className="h2 card-text text-accent">{currencyFormat(0)}</p>
								</div>
							</div>
							<hr /> */}
						</div>
					</div>
				</div>


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

export default connect(mapStateToProps, mapDispatchToProps)(AttendantSchedule);