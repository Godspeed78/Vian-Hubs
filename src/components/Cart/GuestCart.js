import React from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import hairm from "../../assets/images/home/hairm.png";
import {formatNaira, time_convert} from "../../utils/helpers";
import Endpoint from "../../utils/endpoint";


const GuestCart = (props) => {
	const [cartValues, setCartValues] = useState({
		cart: [],
		cartTotal: "",
		loading: false,
		toastRemoved: false,
	});
	
	const toggleToastRemoved = () => {
		this.setState({toastRemoved: !this.state.toastRemoved});
	};
	
	const deleteCartItem = (reference) => {
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
	
	const emptyCart = () => {
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
	
	useEffect( () => {
		setCartValues({loading: true});
		// Cart Contents
		const cartContent = JSON.parse(localStorage.getItem('guestCart'));
		setCartValues({cart: cartContent});
		
		Endpoint.getCart()
			.then(res => {
				setCartValues({cart: res.data.data});
				
				let arr = cartValues.cart;
				const total = arr.reduce((total, obj) => obj.service.cost + total,0);
				setCartValues({cartTotal: total, loading: false});
				console.log(res.data.data);
			});
		
		Endpoint.getCartTotal()
			.then((res) => {
				localStorage.setItem('cartTotal', res.data.data.count);
			})
		}, []);
	
	
	
	return (
		<>
			<div className="pt-1 pb-5">
				<section>
					<div className="pt-1 pb-5">
						<section className="mb-5">
							<div className="mt-3">
								<div className="container mb-5 pb-3">
									<div className="bg-light box-shadow-lg rounded-lg overflow-hidden min-vh-50">
										<div className="row">
											
											<section className="col-lg-8 pt-2 pt-lg-4 pb-4 mb-3">
												<div className="pt-2 px-4 pr-lg-0 pl-xl-5">
													
													<div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3">
														<div className="py-1">
															<a className="btn btn-outline-accent btn-sm" href="/services">
																<i className="czi-arrow-left mr-1 ml-n1"/>Back to shopping
															</a>
														</div>
														
														<div className="d-none d-sm-block py-1 font-size-ms">You have {cartValues.cart.length} products in your cart</div>
														<div className="py-1">
															<button className="btn btn-outline-danger btn-sm" onClick={() => emptyCart}>
																<i className="czi-close font-size-xs mr-1 ml-n1"/>Clear cart
															</button>
														</div>
													</div>
													
													{cartValues.loading ?
														<div className="sweet-loading mt-5 mr-3">
															<ClipLoader css={override} size={100} color={"#3C96B3"}
																		loading={this.state.loading} />
														</div>
														:
														null
													}
													
													{cartValues.cart.length ?
														cartValues.cart.map((item, index) => {
															return (
																<div className="media d-block d-sm-flex align-items-center py-4 border-bottom">
																	<a className="d-block position-relative mb-3 mb-sm-0 mr-sm-4 mx-auto" href="#"
																	   style={{width: '12.5rem'}}>
																		<img className="rounded-lg" src={hairm} alt="Product"/>
																		<span className="close-floating" onClick={() => deleteCartItem(item.reference)}>
																				<i className="czi-close"/>
																			</span>
																	</a>
																	
																	<div className="media-body text-center text-sm-left">
																		<h3 className="h6 product-title mb-2">
																			<a href="#">{item.service.name}</a>
																		</h3>
																		
																		<div className="d-inline-block text-accent">{formatNaira(item.service.cost)}</div>
																		
																		<p className="d-inline-block text-accent font-size-ms border-left ml-2 pl-2" >
																			by {item.worker.user.first_name} {item.worker.user.last_name}
																		</p>
																		
																		<br/>
																		
																		<div className="d-inline-block mt-3 mr-2 pr-2 ">
																			<small className='font-weight-bold'>{new Date(item.start_at).toDateString()}</small>
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
											
											<aside className="col-lg-4">
												<hr className="d-lg-none"/>
												<div className="cz-sidebar-static h-100 ml-auto border-left">
													<div className="text-center mb-4 pb-3 border-bottom">
														<h2 className="h6 mb-3 pb-1">Cart total</h2>
														{cartValues.cartTotal ?
															<h3 className="">{formatNaira(cartValues.cartTotal)}</h3>
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
				<div className={cartValues.toastRemoved ? "toast mb-3 fade show" : "toast mb-3 fade hide"} id="cart-toast" data-delay="5000" role="alert"
					 aria-live="assertive" aria-atomic="true">
					<div className="toast-header bg-danger text-white">
						<i className="czi-check-circle mr-2"/>
						<h6 className="font-size-sm text-white mb-0 mr-auto">Removed from cart!</h6>
						<button className="close text-white ml-2 mb-1" type="button" onClick={()=> toggleToastRemoved()}
								aria-label="Close"><span aria-hidden="true">×</span>
						</button>
					</div>
					<div className="toast-body">The item has been removed from your cart.</div>
				</div>
			</div>
		</>
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart);
