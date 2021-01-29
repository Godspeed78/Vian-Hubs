import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import {Modal} from 'react-bootstrap';
import {Link} from "react-router-dom";
import hairm from "../../assets/images/home/hairm.png"
import avatar from "../../assets/images/user 2.svg"
import Endpoint from "../../utils/endpoint";
import ClipLoader from "react-spinners/ClipLoader";

class CashierAppointments extends Component {

	state = {
		addToCart: false,
		toastAdded: false,
		attendants: [],
		loading: false,
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

	loadDataFromServer = () => {
		this.setState({loading: true});

		Endpoint.getShopAttendants()
			.then(res => {
				console.log(res.data);
				this.setState({loading: false, attendants: res.data.data})
			})
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

							<li className="breadcrumb-item text-nowrap active" aria-current="page">Appointments</li>
						</ol>
					</nav>

					<h2 className="mt-lg-1 pt-lg-1">Appointments by Attendant</h2>
				</div>

				<div className="pt-1 pb-5">
					<section>
						<div className="pt-1 pb-5">

							<section className="mb-5 pb-5">
								<div className="mt-3">

									<div className="">
										{
											this.state.loading ?
												<div className="sweet-loading my-5vh mr-3">
													<div className="row justify-content-center">
														<div className="col-md-3">
															<div className=" product-card box-shadow">
																<div className="card-body">
																	<ClipLoader
																		css={override}
																		size={70}
																		color={"#3C96B3"}
																		loading={this.state.loading}
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
														this.state.attendants ?
															this.state.attendants.map( attendant => {
																return (
																	<div className="col-lg-2 col-md-4 my-2">
																		<div className="text-center border p-3">
																			<img src={avatar} className="card-img-top" alt="Card image" style={{width: '80px'}}/>
																			<div className="card-body">
																				<div className="d-flex justify-content-center">
																					<Link to={{pathname: "/cashier/attendantSchedule", state: {data: attendant}}}>
																						<h6 className="card-title text-center text-accent">
																							{attendant.user.last_name} {attendant.user.first_name}
																						</h6>
																					</Link>
																				</div>
																			</div>
																		</div>
																	</div>
																)
															})
														:
														<h5 className="text-center mt-3">No attendants created</h5>
													}
												</div>
											</section>
										}
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
							<h5 className='mr-2'>Dreadlock fixing</h5>

							<h6 className='text-accent ml-2'><i className="czi-tag"/> $44.<small>99</small></h6>
						</div>


						<div className="row mt-3">
							<div className="col-lg-4">
								<img src={hairm} alt=""/>
							</div>

							<div className="col-lg-8">
								<div className="form-group">
									<input type="text" placeholder="Customer Name" className="form-control form-control-sm col-8" required/>
								</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(CashierAppointments);