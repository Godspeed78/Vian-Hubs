import React from 'react'
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import hairm from "../../assets/images/home/hairm.png";
import {formatNaira, time_convert} from "../../utils/helpers";


class GuestCart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showGuestCart: false,
			cart: [],
			cartTotal: "",
			loading: false,
			toastRemoved: false,
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

		this.props.setState(this.handleOpenModal, stateKeys.OPEN_GUEST_CART);
		this.props.setState(this.handleCloseModal, stateKeys.CLOSE_GUEST_CART);
	}

	handleOpenModal() {
		this.setState({showGuestCart: true});
	}

	handleCloseModal() {
		this.setState({showGuestCart: false});
	}

	toggleGuestCart = () => {
		this.setState({showGuestCart: !this.state.showGuestCart});
	};

	render() {
		const override = {
			display: 'block',
			margin: '0 auto',
			// borderColor: 'red',
		};

		return (

			<Modal show={this.state.showGuestCart} size="xl" centered>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						My Cart
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">

						<section className="col-lg-8 pt-2 pt-lg-4 pb-4 mb-3">
							<div className="pt-2 px-4 pr-lg-0 pl-xl-5">

								<div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3">
									<div className="py-1">
										<a className="btn btn-outline-accent btn-sm" href="/services">
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
													<div className="d-inline-block text-accent">{formatNaira(item.service.cost)}</div>
													<a className="d-inline-block text-accent font-size-ms border-left ml-2 pl-2" href="#">
														by {item.worker.user.first_name} {item.worker.user.last_name}
													</a>
													<br/>
													<div className="d-inline-block mt-3">
														<small className='font-weight-bold'>{new Date(item.start_at).toDateString()}</small>
													</div>
													<span className="d-inline-block font-size-ms border-left ml-2 pl-2 mt-3 badge badge-accent" href="#">
																				{time_convert(item.service.duration)}
																			</span>
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
				</Modal.Body>

				<Modal.Footer>
					{/*{this.state.cartLoader ?*/}
					{/*	<div className="sweet-loading mr-3">*/}
					{/*		<ClipLoader*/}
					{/*			css={override}*/}
					{/*			size={30}*/}
					{/*			color={"#3C96B3"}*/}
					{/*			loading={this.state.cartLoader}*/}
					{/*		/>*/}
					{/*	</div>*/}
					{/*	:*/}
					{/*	<button className="btn btn-custom" onClick={() => this.addToCart()}>*/}
					{/*		<i className="czi-cart mr-2"/>*/}
					{/*		Add to Cart*/}
					{/*	</button>*/}
					{/*}*/}

					<button className="btn btn-outline-danger" onClick={() => this.toggleGuestCart()}>Close</button>
				</Modal.Footer>

			</Modal>

		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(GuestCart);