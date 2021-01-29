import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import hairm from "../../assets/images/home/hairm.png";
import cards from "../../assets/images/cards.png"

class CashierCheckout extends Component {

	componentDidMount() {
		this.props.setState('home', stateKeys.PAGE_CLASS);

		this.props.setState('Sample content for dialog', stateKeys.DIALOG_CONTENT);
	}

	render() {
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

				<div className="container mt-4 mb-5 pb-3">
					<div className="bg-light box-shadow-lg rounded-lg overflow-hidden">
						<div className="row">

							<section className="col-lg-8 pt-2 pt-lg-4 pb-4 mb-3">
								<div className="pt-2 px-4 pr-lg-0 pl-xl-5">

									<div className="accordion mb-5" id="payment-method" role="tablist">
										<div className="card">
											<div className="card-header" role="tab">
												<h3 className="accordion-heading">
													<a href="#" data-toggle="collapse">
														<i className="czi-card font-size-lg mr-2 mt-n1 align-middle"/>
														Pay with Credit Card<span className="accordion-indicator"></span>
													</a>
												</h3>
											</div>

											<div className="collapse show" id="card" data-parent="#payment-method"
												 role="tabpanel">
												<div className="card-body">
													<p className="font-size-sm">
														We accept following credit cards:&nbsp;&nbsp;
														<img className="d-inline-block align-middle" src={cards} style={{width: '187px'}}/>
													</p>

													<div className="card-wrapper"></div>
													<form className="interactive-credit-card row">
														<div className="form-group col-sm-6">
															<input className="form-control" type="text" name="number"
																   placeholder="Card Number" required/>
														</div>
														<div className="form-group col-sm-6">
															<input className="form-control" type="text" name="name"
																   placeholder="Full Name" required/>
														</div>
														<div className="form-group col-sm-3">
															<input className="form-control" type="text" name="expiry"
																   placeholder="MM/YY" required/>
														</div>
														<div className="form-group col-sm-3">
															<input className="form-control" type="text" name="cvc"
																   placeholder="CVC" required/>
														</div>
														<div className="col-sm-6">
															<button className="btn btn-primary btn-block mt-0"
																	type="submit">Place order
															</button>
														</div>
													</form>
												</div>
											</div>
										</div>

										<div className="card">
											<div className="card-header" role="tab">
												<h3 className="accordion-heading">
													<a className="collapsed" href="#paypal" data-toggle="collapse">
														<i className="czi-paypal mr-2 align-middle"/>Pay with PayPal
														<span className="accordion-indicator"></span>
													</a>
												</h3>
											</div>

											<div className="collapse" id="paypal" data-parent="#payment-method" role="tabpanel">
												<div className="card-body font-size-sm">
													<p><span className='font-weight-medium'>PayPal</span> - the safer,
														easier way to pay</p>
													<button className="btn btn-primary" type="button">Checkout with
														PayPal
													</button>
												</div>
											</div>
										</div>
									</div>

									<div className="widget mb-3 d-lg-none">
										<h2 className="widget-title">Order summary</h2>
										<div className="media align-items-center pb-2 border-bottom">
											<a className="d-block mr-2" href="marketplace-single.html">
												<img className="rounded-sm" width="64" src={hairm} alt="Product"/>
											</a>
											<div className="media-body pl-1">
												<h6 className="widget-product-title">
													<a href="#">UI Isometric Devices Pack</a>
												</h6>
												<div className="widget-product-meta"><span
													className="text-accent border-right pr-2 mr-2">$23.<small>99</small></span><span
													className="font-size-xs text-muted">Standard license</span></div>
											</div>
										</div>
										<div className="media align-items-center py-2 border-bottom">
											<a className="d-block mr-2" href="#">
												<img className="rounded-sm" width="64" src={hairm} alt="Product"/>
											</a>

											<div className="media-body pl-1">
												<h6 className="widget-product-title">
													<a href="#">Project Devices Showcase</a>
												</h6>

												<div className="widget-product-meta">
													<span className="text-accent border-right pr-2 mr-2">$18.<small>99</small></span>
													<span className="font-size-xs text-muted">Standard license</span>
												</div>
											</div>
										</div>

										<div className="media align-items-center py-2 border-bottom">
											<a className="d-block mr-2" href="#">
												<img className="rounded-sm" width="64" src={hairm} alt="Product"/>
											</a>

											<div className="media-body pl-1">
												<h6 className="widget-product-title">
													<a href="#">Gravity Devices UI Mockup</a>
												</h6>

												<div className="widget-product-meta">
													<span className="text-accent border-right pr-2 mr-2">$15.<small>99</small></span>
													<span className="font-size-xs text-muted">Standard license</span>
												</div>
											</div>
										</div>

										<ul className="list-unstyled font-size-sm py-3">
											<li className="d-flex justify-content-between align-items-center">
												<span className="mr-2">Subtotal:</span>
												<span className="text-right">$58.<small>97</small></span>
											</li>

											<li className="d-flex justify-content-between align-items-center">
												<span className="mr-2">Taxes:</span>
												<span className="text-right">$10.<small>45</small></span>
											</li>

											<li className="d-flex justify-content-between align-items-center font-size-base">
												<span className="mr-2">Total:</span><span className="text-right">$69.<small>42</small></span>
											</li>
										</ul>
									</div>

									<h2 className="h6 border-bottom pb-3 my-3">Billing details</h2>

									<div className="row pb-4">
										<div className="col-sm-6 form-group">
											<label htmlFor="mc-fn">First name <span
												className='text-danger'>*</span></label>
											<input className="form-control" type="text" value="Jonathan" id="mc-fn"/>
										</div>
										<div className="col-sm-6 form-group">
											<label htmlFor="mc-ln">Last name <span
												className='text-danger'>*</span></label>
											<input className="form-control" type="text" value="Doe" id="mc-ln"/>
										</div>
										<div className="col-12 form-group">
											<label htmlFor="mc-email">Email address <span
												className='text-danger'>*</span></label>
											<input className="form-control" type="email" value="contact@createx.studio"
												   id="mc-email"/>
										</div>
										<div className="col-sm-6 form-group">
											<label htmlFor="mc-company">Company</label>
											<input className="form-control" type="text" value="Createx Studio"
												   id="mc-company"/>
										</div>
										<div className="col-sm-6 form-group">
											<label htmlFor="mc-country">Country <span
												className='text-danger'>*</span></label>
											<select className="custom-select" id="mc-country">
												<option value>Select country</option>
												<option value="Argentina">Argentina</option>
												<option value="Belgium">Belgium</option>
												<option value="France">France</option>
												<option value="Germany">Germany</option>
												<option value="Madagascar" selected>Madagascar</option>
												<option value="Spain">Spain</option>
												<option value="UK">United Kingdom</option>
												<option value="USA">USA</option>
											</select>
										</div>
									</div>

								</div>
							</section>


							<aside className="col-lg-4 d-none d-lg-block">
								<hr className="d-lg-none"/>
								<div className="cz-sidebar-static h-100 ml-auto border-left">
									<div className="widget mb-3">
										<h2 className="widget-title text-center">Order summary</h2>
										<div className="media align-items-center pb-2 border-bottom">
											<a className="d-block mr-2" href="#">
												<img className="rounded-sm" width="64" src={hairm} alt="Product"/>
											</a>

											<div className="media-body pl-1">
												<h6 className="widget-product-title">
													<a href="marketplace-single.html">UI Isometric Devices Pack</a>
												</h6>

												<div className="widget-product-meta">
													<span className="text-accent border-right pr-2 mr-2">$23.<small>00</small></span>
													<span className="font-size-xs text-muted">Standard license</span>
												</div>
											</div>
										</div>

										<div className="media align-items-center py-2 border-bottom">
											<a className="d-block mr-2" href="#">
												<img className="rounded-sm" width="64" src={hairm} alt="Product"/>
											</a>

											<div className="media-body pl-1">
												<h6 className="widget-product-title">
													<a href="#">Gravity Devices UI Mockup</a>
												</h6>

												<div className="widget-product-meta">
													<span className="text-accent border-right pr-2 mr-2">$15.<small>00</small></span>
													<span className="font-size-xs text-muted">Standard license</span>
												</div>
											</div>
										</div>

										<ul className="list-unstyled font-size-sm pt-3 pb-2 border-bottom">
											<li className="d-flex justify-content-between align-items-center">
												<span className="mr-2">Subtotal:</span>
												<span className="text-right">$56.<small>00</small></span>
											</li>

											<li className="d-flex justify-content-between align-items-center">
												<span className="mr-2">VAT:</span>
												<span className="text-right">$9.<small>30</small></span>
											</li>
										</ul>

										<h3 className="font-weight-normal text-center my-4">
											$65.
											<small>30</small>
										</h3>
									</div>
								</div>
							</aside>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CashierCheckout);