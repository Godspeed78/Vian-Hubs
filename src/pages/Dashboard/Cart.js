import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import hairm from "../../assets/images/home/hairm.png"
import Endpoint from "../../utils/endpoint";
import ClipLoader from "react-spinners/ClipLoader";
import {formatNaira, time_convert} from "../../utils/helpers";
import moment from "moment";

class Cart extends Component {
	state = {
		cart: [],
		cartTotal: "",
		loading: false,
		toastRemoved: false,
	};

	toggleToastRemoved = () => {
		this.setState({toastRemoved: !this.state.toastRemoved});
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

				Endpoint.getCartTotal()
					.then((res) => {
						localStorage.setItem('cartTotal', res.data.data.count);
					})
			})
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

				Endpoint.getCartTotal()
					.then((res) => {
						localStorage.setItem('cartTotal', res.data.data.count);
					})
			})
	};

	loadDataFromServer = () => {
		this.setState({loading: true});
		// Cart Contents
		Endpoint.getCart()
			.then(res => {
				this.setState({cart: res.data.data});

				let arr = this.state.cart;
				const total = arr.reduce((total, obj) => obj.service.cost + total,0);
				this.setState({cartTotal: total, loading: false});
				console.log(res.data.data);
			});

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
							<section className="mb-5">
								<div className="mt-3">
									<div className="container mb-5 pb-3">
										<div className="bg-light box-shadow-lg rounded-lg overflow-hidden min-vh-50">
											<div className="row">

												<section className="col-lg-7 pt-2 pt-lg-4 pb-4 mb-3">
													<div className="pt-2 px-4 pr-lg-0 pl-xl-5">

														<div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3">
															<div className="py-1">
																<a className="btn btn-outline-accent btn-sm" href="/dashboard/shop">
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
																<ClipLoader css={override} size={100} color={"#3C96B3"}
																	loading={this.state.loading} />
															</div>
															:
															null
														}

														{this.state.cart.length ?
															this.state.cart.map((item, index) => {
																return (
																	<div className="media d-block d-sm-flex align-items-center py-4 border-bottom">
																		<p className="d-block position-relative mb-3 mb-sm-0 mr-sm-4 mx-auto" href="#"
																		   style={{width: '12.5rem'}}>
																			<img className="rounded-lg" src={hairm} alt="Product"/>
																			<span className="close-floating" onClick={() => this.deleteCartItem(item.reference)}>
																				<i className="czi-close"/>
																			</span>
																		</p>

																		<div className="media-body text-center text-sm-left">
																			<h3 className="h6 product-title mb-2">
																				<a href="#">{item.service.name}</a>
																			</h3>

																			<div className="d-inline-block text-accent">
																				{formatNaira(item.service.cost)}
																			</div>
																			
																			<p className="d-inline-block text-accent
																				font-size-ms border-left ml-2 pl-2">
																				by <span>
																					{item.worker.user.first_name} {item.worker.user.last_name}
																				   </span>
																			</p>
																			
																			<br/>
																			
																			<div className="d-inline-block mt-3 mr-2 pr-2 ">
																				<small className='font-weight-bold'>
																					{moment(item.start_at).format("lll")}
																				</small>
																			</div>

																			<div className='d-inline-block'>
																				<span className="text-sm">Duration: </span>
																				<span className="d-inline-block font-size-ms border-left badge badge-accent">
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
																<h3>₦0.00</h3>
															}
														</div>

														<a className="btn btn-primary btn-shadow btn-block mt-4" href="/dashboard/checkout">
															<i className="czi-locked font-size-lg mr-2"/>Secure Checkout
														</a>

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

				<div className="toast-container toast-bottom-center" style={{zIndex: '1070',}}>
					<div className={this.state.toastRemoved ? "toast mb-3 fade show" : "toast mb-3 fade hide"} id="cart-toast" data-delay="5000" role="alert"
						 aria-live="assertive" aria-atomic="true">
						<div className="toast-header bg-danger text-white">
							<i className="czi-check-circle mr-2"/>
							<h6 className="font-size-sm text-white mb-0 mr-auto">Removed from cart!</h6>
							<button className="close text-white ml-2 mb-1" type="button" onClick={()=> this.toggleToastRemoved()}
									aria-label="Close"><span aria-hidden="true">×</span>
							</button>
						</div>
						<div className="toast-body">The item has been removed from your cart.</div>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);