import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import hairm from "../../assets/images/home/hairm.png";
import cards from "../../assets/images/cards.png"
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import Endpoint from "../../utils/endpoint";
import ClipLoader from "react-spinners/ClipLoader";
import {formatNaira, handleFormSubmissionError} from "../../utils/helpers";
import {Modal} from "react-bootstrap";


class Checkout extends Component {

	state = {
		loading: false,
		order: [],
		cart: [],
		cartTotal: "",
		payWithPaystack: false,
		checkoutComplete: false,
	};

	closePayWithPaystack = () => {
		this.setState({payWithPaystack: false});
	};

	checkout = () => {
		this.setState({loading: true});

		Endpoint.customerCheckout()
			.then( res => {
				this.setState({loading: false, order: res.data.data.data, payWithPaystack: true});
				console.log(res.data.data.data);
			})
			.catch((error) => handleFormSubmissionError(error, this));

		Endpoint.getCartTotal()
			.then((res) => {
				localStorage.setItem('cartTotal', res.data.data.count);
			})
	};

	toggleCheckoutComplete = () => {
		this.setState({checkoutComplete: !this.state.checkoutComplete})
	};

	finishPurchase = () => {
		this.setState({loading: true});

		Endpoint.verifyPayment('paystack', this.state.order)
			.then( res => {
				this.setState({loading: false, checkoutComplete: true});
				console.log(res.data.data);

				let currentState = this;
				setTimeout(function() {
					currentState.setState({checkoutComplete: false});
				}, 5000);
			})
			.catch((error) => handleFormSubmissionError(error, this));
	};

	loadDataFromServer = () => {
		this.setState({loading: true});
		Endpoint.getCart()
			.then( res => {
				this.setState({cart: res.data.data});
				console.log(res.data.data);

				let arr = this.state.cart;
				const total = arr.reduce((total, obj) => obj.service.cost + total,0);
				this.setState({cartTotal: total, loading: false});
			})
			.catch((error) => handleFormSubmissionError(error, this));

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
		const config = {
			reference: (new Date()).getTime(),
			email: "user@example.com",
			amount: this.state.cartTotal,
			publicKey: 'pk_test_bfd52fe30040205803c4c9602490d24f95f4015a',
		};

		const PaystackHookExample = () => {
			const initializePayment = usePaystackPayment(config);
			return (
				<div>
					<button onClick={() => {initializePayment()}}>
						Paystack Hooks Implementation
					</button>
				</div>
			);
		};

		const componentProps = {
			...config,
			text: 'Make Payment',
			onSuccess: () => this.finishPurchase(),
			onClose: () => null
		};

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

							<li className="breadcrumb-item">
								<a className="text-nowrap" href="">
									<i className="czi-"/>Cart
								</a>
							</li>

							<li className="breadcrumb-item text-nowrap active" aria-current="page">Checkout</li>
						</ol>
					</nav>

					<h2 className="mt-lg-1 pt-lg-1">Checkout</h2>
				</div>

				<Modal show={this.state.payWithPaystack} size="" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header>
						<Modal.Title id="contained-modal-title-vcenter">
							Pay With Paystack
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="d-flex justify-content-between">
							<h5 className='mr-2'>{this.state.cart.length} Items</h5>

							<h6 className='text-accent ml-2'>
								You are to pay:
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
						<PaystackConsumer {...componentProps} >
							{({initializePayment}) =>
								<button onClick={() => initializePayment()} className="btn btn-outline-dark">
									<i className="czi-arrow-right mr-2"/> Proceed
								</button>}
						</PaystackConsumer>

						<button className="btn btn-outline-danger" onClick={()=> this.closePayWithPaystack()}>Close</button>
					</Modal.Footer>
				</Modal>

				<div className="container mt-4 mb-5 pb-3">
					<div className="bg-light box-shadow-lg rounded-lg overflow-hidden">
						<div className="row">

							<section className="col-lg-8 pt-2 pt-lg-4 pb-4 mb-3">
								<div className="pt-2 px-4 pr-lg-0 pl-xl-5">

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
										<div className="accordion mb-5" id="payment-method" role="tablist">
											<div className="card">
												<div className="card-header" role="tab">
													<h3 className="accordion-heading">
														<a href="#" data-toggle="collapse">
															<i className="czi-card font-size-lg mr-2 mt-n1 align-middle"/>
															Pay with PayStack
														</a>
													</h3>
												</div>

												<div className="collapse show" id="card"
													 data-parent="#payment-method"
													 role="tabpanel">
													<div className="card-body">
														<p>Proceed to make payment of {formatNaira(this.state.cartTotal)} with PayStack</p>
														<br/>
														<button className="btn btn-custom"
																onClick={() => this.checkout()}>PayStack Checkout
														</button>

														{this.state.error ?
															<div className="col-8 bg-danger fade show border-rad-1 text-center p-2 my-3">
																<p className="small text-light mb-0">
																	<i className="czi-bell mr-2"/> {this.state.errorMessage}
																</p>
															</div>
															: null
														}

													</div>
												</div>
											</div>
										</div>
									}

									<div className="widget mb-3 d-lg-none">
										<h2 className="widget-title">Order summary</h2>

										{
											this.state.cart.length ?
												this.state.cart.map(item => {
													return (
														<div className="media align-items-center pb-2 border-bottom">
															<div className="d-block mr-2">
																<img className="rounded-sm" width="64" src={hairm} alt="Product"/>
															</div>
															<div className="media-body pl-1">
																<h6 className="widget-product-title">
																	<a href="#">{item.service.name}</a>
																</h6>

																<div className="widget-product-meta">
																	<span className="text-accent border-right pr-2 mr-2">
																		{formatNaira(item.service.cost)}
																	</span>
																</div>
															</div>
														</div>
													)
												})
												:
												<p>Empty Order</p>
										}

										<ul className="list-unstyled font-size-sm py-3">
											<li className="d-flex justify-content-between align-items-center">
												<span className="mr-2">Subtotal:</span>
												<span className="text-right">
													{formatNaira(this.state.cartTotal)}
												</span>
											</li>

											<li className="d-flex justify-content-between align-items-center font-size-base">
												<span className="mr-2">Total:</span>
												<span className="text-right">
													{formatNaira(this.state.cartTotal)}
												</span>
											</li>
										</ul>
									</div>

								</div>
							</section>

							<aside className="col-lg-4 d-none d-lg-block">
								<hr className="d-lg-none"/>
									<div className="cz-sidebar-static h-100 ml-auto border-left">
										<div className="widget mb-3">
											<h2 className="widget-title text-center">Order summary</h2>

											{
												this.state.cart.length ?
													this.state.cart.map(item => {
														return (
															<div className="media align-items-center pb-2 border-bottom">
																<div className="d-block mr-2">
																	<img className="rounded-sm" width="64" src={hairm} alt="Product"/>
																</div>
																<div className="media-body pl-1">
																	<h6 className="widget-product-title">
																		<a href="#">{item.service.name}</a>
																	</h6>

																	<div className="widget-product-meta">
																	<span className="text-accent border-right pr-2 mr-2">
																		{formatNaira(item.service.cost)}
																	</span>
																	</div>
																</div>
															</div>
														)
													})
													:
													<p>Empty Order</p>
											}

											<ul className="list-unstyled font-size-sm pt-3 pb-2 border-bottom">
												<li className="d-flex justify-content-between align-items-center">
													<span className="mr-2">Subtotal:</span>
													<span className="text-right">
														{formatNaira(this.state.cartTotal)}
													</span>
												</li>
											</ul>

											<h3 className="font-weight-normal text-center my-4">
												{formatNaira(this.state.cartTotal)}
											</h3>
										</div>
									</div>
							</aside>
						</div>
					</div>
				</div>


				<div className="toast-container toast-bottom-center" style={{zIndex: '1070',}}>
					<div className={this.state.checkoutComplete ? "toast mb-3 fade show" : "toast mb-3 fade hide"} id="cart-toast" data-delay="5000" role="alert"
						 aria-live="assertive" aria-atomic="true">
						<div className="toast-header bg-danger text-white">
							<i className="czi-check-circle mr-2"/>
							<h6 className="font-size-sm text-white mb-0 mr-auto">Purchase Complete!</h6>
							<button className="close text-white ml-2 mb-1" type="button" onClick={()=> this.toggleCheckoutComplete()}
									aria-label="Close"><span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="toast-body">Your purchase has been completed!.</div>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);