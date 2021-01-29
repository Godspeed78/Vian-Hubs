import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import hairm from "../../assets/images/home/hairm.png"
import ClipLoader from "react-spinners/ClipLoader";
import Endpoint from "../../utils/endpoint";
import {formatNaira, handleFormSubmissionError, loginUser, time_convert} from "../../utils/helpers";
import {Modal} from "react-bootstrap";

class CashierCart extends Component {
	state = {
		cart: [],
		cartTotal: "",
		loading: false,
		toastRemoved: false,
		customers: [],
		customerCheckoutForm: false,
		guestCheckoutForm: false,
		selectedCustomerName: "",
		description: "",
		coupon: "",
		formIncomplete: false,
		formComplete: false,
		cartLoader: false,
		toastAdded: false,
		completeCheckout: false,
	};

	toggleToastRemoved = () => {
		this.setState({toastRemoved: !this.state.toastRemoved});
	};

	changeText = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	deleteCartItem = (reference) => {
		Endpoint.deleteItemFromCart(reference)
			.then(res => {
				this.setState({toastRemoved: true});
				let currentState = this;
				this.loadDataFromServer();
				setTimeout(function() {
					currentState.setState({toastRemoved: false});
				}, 5000);
			})
	};

	toggleToastAdded = () => {
		this.setState({toastAdded: !this.state.toastAdded});
		this.setState({customerCheckoutForm: false, guestCheckoutForm: false});
		let currentState = this;
		setTimeout(function() {
			currentState.setState({toastAdded: false});
		}, 5000);
	};

	setCustomerName = (event) => {
		var customerName = event.target.value;
		this.setState({selectedCustomerName: customerName});
		console.log(customerName);
	};

	printReceipt = () => {
		this.setState({customerCheckoutForm: false});
		this.toggleToastAdded();
	};

	checkout = () => {
		this.setState({cartLoader: true, success: false, error: false});

		if (!this.state.selectedCustomerName) {
			this.setState({formIncomplete: true, cartLoader: false});
			return false
		} else {
			const CheckoutProps = {
				buyer_name: this.state.selectedCustomerName,
				// description: this.state.description,
				// coupon: this.state.coupon,
			};
			console.log(CheckoutProps);

			Endpoint.cashierCheckout(CheckoutProps)
				.then((res) => {
					console.log(res.data.data);

					this.setState({error: false, success: true, completeCheckout: true, formComplete: true});
					// this.toggleToastAdded();
					this.loadDataFromServer();
				})
				.catch((error) => handleFormSubmissionError(error, this));

			let currentState = this;
			setTimeout(function() {
				currentState.setState({cartLoader: false});
			}, 5000);
		}

	};

	emptyCart = () => {
		Endpoint.emptyCart()
			.then(res => {
				this.setState({toastRemoved: true});
				let currentState = this;
				this.loadDataFromServer();
				setTimeout(function() {
					currentState.setState({toastRemoved: false});
				}, 5000);
			})
	};

	customerCheckoutModal = () => {
		this.setState({customerCheckoutForm: true});
	};

	guestCheckoutModal = () => {
		this.setState({guestCheckoutForm: true});
	};

	closeCustomerCheckout = () => {
		this.setState({customerCheckoutForm: false});
	};

	closeGuestCheckout = () => {
		this.setState({guestCheckoutForm: false});
	};

	toggleCustomerCheckoutModal = () => {
		this.setState({customerCheckoutForm: !this.state.customerCheckoutForm});
	};

	toggleGuestCheckoutModal = () => {
		this.setState({guestCheckoutForm: !this.state.guestCheckoutForm});
	};

	loadDataFromServer = () => {
		this.setState({loading: true});
		// Cart Contents
		Endpoint.getCart()
			.then(res => {
				this.setState({cart: res.data.data});
				console.log(res.data.data);

				let arr = this.state.cart;
				const total = arr.reduce((total, obj) => obj.service.cost + total,0);
				this.setState({cartTotal: total, loading: false});
			});

		Endpoint.getShopCustomers()
			.then(res => {
				this.setState({customers: res.data.data.data});
				console.log(res.data.data.data);
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

							<li className="breadcrumb-item">
								<a className="text-nowrap" href="">
									<i className="czi-"/>Dashboard
								</a>
							</li>

							<li className="breadcrumb-item text-nowrap active" aria-current="page">Cart</li>
						</ol>
					</nav>

					<h2 className="mt-lg-1 pt-lg-1">Your Cart</h2>
				</div>

				<div className="pt-1 pb-5">
					<section>
						<div className="pt-1 pb-5">
							<section className="mb-5 pb-5">
								<div className="mt-3">
									<div className="container mb-5 pb-3">
										<div className="bg-light box-shadow-lg rounded-lg overflow-hidden min-vh-50">
											<div className="row">

												<section className="col-lg-7 col-md-12 pt-2 pt-lg-4 pb-4 mb-3">
													<div className="pt-2 px-4 pr-lg-0 pl-xl-5">

														<div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3">
															<div className="py-1">
																<a className="btn btn-outline-accent btn-sm" href="/cashier/shop">
																	<i className="czi-arrow-left mr-1 ml-n1"/>Back to shopping
																</a>
															</div>

															<div className="d-none d-sm-block py-1 font-size-ms">You have {this.state.cart.length} products in your cart</div>
															<div className="py-1">
																<button className="btn btn-outline-danger btn-sm" onClick={() => this.emptyCart()}>
																	<i className="czi-close font-size-xs mr-1 ml-n1"/>Clear cart
																</button>
															</div>
														</div>

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
															null
														}

														{this.state.cart.length ?
															this.state.cart.map((item, index) => {
																return (
																	<div className="media d-block d-sm-flex align-items-center py-4 border-bottom">
																		<a className="d-block position-relative mb-3 mb-sm-0 mr-sm-4 mx-auto" href="#"
																		   style={{width: '12.5rem'}}>
																			<img className="rounded-lg" src={hairm} alt="Product"/>
																			<span className="close-floating" onClick={() => this.deleteCartItem(item.reference)}>
																				<i className="czi-close"/>
																			</span>
																		</a>

																		<div className="media-body text-center text-sm-left">
																			<h3 className="h6 product-title mb-2">
																				<a href="#">{item.service.name}</a>
																			</h3>
																			
																			<div className="d-inline-block text-accent">
																				{formatNaira(item.service.cost)}
																			</div>

																			<a className="d-inline-block text-accent
																				font-size-ms border-left ml-2 pl-2" href="#">
																				by <span className='text-custom'>
																					{item.worker.user.first_name} {item.worker.user.last_name}
																				   </span>
																			</a>
																			
																			<br/>
																			
																			<div className="d-inline-block mt-3 mr-2 pr-2">
																				<small className='font-weight-bold'>{new Date(item.start_at).toDateString()}</small>
																			</div>

																			<div className='d-inline-block'>
																				<span className="text-sm">Duration: </span>
																				<span className="d-inline-block font-size-ms border-left mt-3 badge badge-accent">
																					{time_convert(item.service.duration)}
																				</span>
																			</div>

																		</div>
																	</div>
																)
															})
															:
															<p className="text-center font-weight-bold mt-5">Cart is empty</p>
														}
													</div>
												</section>

												<aside className="col-lg-5">
													<hr className="d-lg-none"/>
													<div className="cz-sidebar-static h-100 ml-auto border-left">
														<div className="text-center mb-4 pb-3 border-bottom">
															<h2 className="h6 mb-3 pb-1">Cart total</h2>
															{this.state.cartTotal ?
																<h3 className="">{formatNaira(this.state.cartTotal)}</h3>
																:
																<h3>$0.00</h3>
															}
														</div>

														<button className="btn btn-outline-accent btn-shadow btn-block mt-4"
															onClick={this.customerCheckoutModal}>
															<i className="czi-locked font-size-lg mr-2"/>Customer Checkout
														</button>

														<button className="btn btn-outline-primary btn-shadow btn-block mt-4"
														   onClick={this.guestCheckoutModal}>
															<i className="czi-locked font-size-lg mr-2"/>Guest Checkout
														</button>

														<div className="text-center pt-2">
															<small className="text-form text-muted">100% quality service guarantee</small>
														</div>
													</div>
												</aside>
											</div>
										</div>
									</div>

								</div>
							</section>
						</div>
					</section>
				</div>

				<Modal show={this.state.customerCheckoutForm} size="" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">
							Checkout Customer Cart
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex justify-content-between">
							<h5 className='mr-2'>{this.state.cart.length} Items</h5>

							<h6 className='text-accent ml-2'>
								<i className="czi-tag"/>
								{this.state.cartTotal ?
									formatNaira(this.state.cartTotal)
									:
									<span>$0.00</span>
								}
							</h6>
						</div>

						<div className="row mt-3">

							<div className="col-lg-12">
								<div className="form-group">
									<select id="" className="form-control form-control-sm col-8 offset-2" required onChange={this.setCustomerName}>
										<option value='null'>--Select customer--</option>
										{this.state.customers ?
											this.state.customers.map(customer => {
												var full_name = customer.first_name + " " + customer.last_name;
												return(
													<option value={full_name}>{full_name}</option>
												)
											})
											:
											<option value="">No available customer.</option>
										}
									</select>

									<input type="text" className="form-control form-control-sm prepended-form-control col-8 offset-2 my-2"
										   onChange={this.changeText}
										   placeholder="Optional description" name="description"/>
									<input type="text" className="form-control form-control-sm prepended-form-control col-8 offset-2 my-2"
										   onChange={this.changeText}
										   placeholder="Optional coupon code" name="coupon"/>
								</div>

								{this.state.formIncomplete ?
									<div className="col-8 offset-2 bg-danger fade show border-rad-1 text-center p-2 mb-3">
										<p className="small text-light mb-0">
											<i className="czi-bell mr-2"/> Please select a customer.
										</p>
									</div>
									: null
								}

								{this.state.formComplete ?
									<div className="col-8 offset-2 bg-success fade show border-rad-1 text-center p-2 mb-3">
										<p className="small text-light mb-0">
											<i className="czi-bell mr-2"/> Checkout Complete!
										</p>
									</div>
									: null
								}

								{this.state.error ?
									<div className="col-8 offset-2 bg-danger fade show border-rad-1 text-center p-2 mb-3">
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
							<div>
								{this.state.completeCheckout ?
									<button className="btn btn-accent" onClick={() => this.printReceipt()}>
										<i className="czi-document mr-2"/>
										Print Receipt
									</button>
									:
									<button className="btn btn-custom" onClick={() => this.checkout()}>
										<i className="czi-cart mr-2"/>
										Checkout
									</button>
								}
							</div>
						}

						<button className="btn btn-outline-danger" onClick={()=> this.closeCustomerCheckout()}>Close</button>
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.guestCheckoutForm} size="" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">
							Checkout Guest Cart
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex justify-content-between">
							<h5 className='mr-2'>{this.state.cart.length} Items</h5>

							<h6 className='text-accent ml-2'>
								<i className="czi-tag"/>
								{this.state.cartTotal ?
									formatNaira(this.state.cartTotal)
									:
									<span>$0.00</span>
								}
							</h6>
						</div>

						<div className="row mt-3">

							<div className="col-lg-12">
								<div className="form-group">
									<input type="text" className="form-control form-control-sm prepended-form-control col-8 offset-2 my-2"
										   onChange={this.changeText}
										   placeholder="Name" name="selectedCustomerName"/>

									<input type="text" className="form-control form-control-sm prepended-form-control col-8 offset-2 my-2"
										   onChange={this.changeText}
										   placeholder="Optional description" name="description"/>
									<input type="text" className="form-control form-control-sm prepended-form-control col-8 offset-2 my-2"
										   onChange={this.changeText}
										   placeholder="Optional coupon code" name="coupon"/>
								</div>

								{this.state.formIncomplete ?
									<div className="col-8 offset-2 bg-danger fade show border-rad-1 text-center p-2 mb-3">
										<p className="small text-light mb-0">
											<i className="czi-bell mr-2"/> Please fill in all fields.
										</p>
									</div>
									: null
								}

								{this.state.formComplete ?
									<div className="col-8 offset-2 bg-success fade show border-rad-1 text-center p-2 mb-3">
										<p className="small text-light mb-0">
											<i className="czi-bell mr-2"/> Checkout Complete!
										</p>
									</div>
									: null
								}

								{this.state.error ?
									<div className="col-8 offset-2 bg-danger fade show border-rad-1 text-center p-2 mb-3">
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
							<div>
								{this.state.completeCheckout ?
									<button className="btn btn-accent" onClick={() => this.printReceipt()}>
										<i className="czi-document mr-2"/>
										Print Receipt
									</button>
									:
									<button className="btn btn-custom" onClick={() => this.checkout()}>
										<i className="czi-cart mr-2"/>
										Checkout
									</button>
								}
							</div>
						}

						<button className="btn btn-outline-danger" onClick={()=> this.closeGuestCheckout()}>Close</button>
					</Modal.Footer>
				</Modal>


				<div className="toast-container toast-bottom-center" style={{zIndex: '1070',}}>
					<div className={this.state.toastAdded ? "toast mb-3 fade show" : "toast mb-3 fade hide"} id="cart-toast" data-delay="5000" role="alert"
						 aria-live="assertive" aria-atomic="true">
						<div className="toast-header bg-success text-white">
							<i className="czi-check-circle mr-2"/>
							<h6 className="font-size-sm text-white mb-0 mr-auto">Checkout Successful!</h6>
							<button className="close text-white ml-2 mb-1" type="button" onClick={()=> this.toggleToastAdded()}
									aria-label="Close"><span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="toast-body">You have successfully checked out this purchase.</div>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CashierCart);