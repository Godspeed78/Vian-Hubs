import React, { Component } from "react";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	mapStateToProps,
	stateKeys,
} from "../../redux/actions";
import Endpoint from "../../utils/endpoint";
import { worker } from "../../utils/Identifiers";
import { Link } from "react-router-dom";
import { Modal, Row, Col, Tabs, Tab } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import {currencyFormat, durationCovert, getWeekDay} from "../../utils/helpers"
import { displayPartsToString } from "typescript";


class Settings extends Component {
	state = {
		// createShopServiceCard:true
	};
	
	changeText = (event) => {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		
		this.setState({
			[name]: value,
		});
	};
	loadEditData = (data) => {
		
		this.setState({
			weekday:data.weekday,
			start_time:data.start_time,
			end_time:data.end_time,
			current_state_title:"Update",
			successMsg:false,
			shopOpeningCard:true
			
		})
		console.log(data, "Loaded")
		
	}
	
	
	handleCreateService = () => {
		var name = document.getElementById("sn").value;
		var desc = document.getElementById("desc").value;
		var duration = document.getElementById("duration").value;
		var cost = document.getElementById("cost").value;
		var oldCost = document.getElementById("oldCost").value;
		if(name == "" || desc == "" || duration == "" || cost == "" ||
			oldCost == ""){
			this.setState({errorMsg:true, content_message:"All fields are to be filled"})
			setTimeout(() => {
				this.setState({errorMsg:false})
			},3000)
			return false
			
		}
		this.setState({spinner:true})
		const payload = {
			name:this.state.service_name,
			description: this.state.service_description,
			duration: parseInt(this.state.service_duration),
			cost: parseInt(this.state.cost) * 100,
			old_cost:parseInt(this.state.old_cost) * 100
		};
		Endpoint.createShopService(payload)
			.then((res) => {
				this.setState({successMsg: true, spinner: false, createShopServiceCard:false});
				this.componentDidMount();
			})
			.catch((error) => {
				console.log(error + "error")
				this.setState({spinner:false, errorMsg:true, content_message:"Oops! Request Failed. Check that you have an active internet connection and try again"})
				setTimeout(() => {
					this.setState({errorMsg:false})
				},3000)
			});
		
	};
	
	handleUpdateOpeningHour = () => {
		this.setState({spinner:true})
		const payload = {
			weekday:this.state.weekday,
			start_time: this.state.start_time,
			end_time: this.state.end_time
			
		};
		Endpoint.editShopService(payload)
			.then((res) => {
				this.setState({successMsg: true, spinner: false});
				this.componentDidMount();
			})
			.catch((error) => console.log(error + "error"));
	};
	
	getShopOpeningTime = () => {
		Endpoint.getShopOpeningHours()
			.then(res => {
				this.setState({openingHours: res.data.data});
				console.log(res.data.data)
			})
	};
	
	getShopPayment = () => {
		Endpoint.getShopPaymentMethods()
			.then(res => {
				this.setState({paymentMethods: res.data.data});
				console.log(res.data.data)
			})
	};


//   handleDeleteShopService = () => {
//     this.setState({deleteModal:false})
//     Endpoint.deleteShopService(this.state.service_slug)
//     .then((res) => {
//       console.log(res)
//       this.componentDidMount();
//     })
//   }
	
	promptDelete = (a) => {
		this.loadData(a);
		this.setState({
			deleteModal:true,
			service_name:a.name,
			service_slug:a.slug,
		})
	}
	
	loadData = (data) => {
		this.setState({
			weekday:data.weekday,
			start_time:data.start_time,
			end_time:data.end_time
			
		})
		console.log(data, "Loaded")
	}
	
	
	
	componentDidMount() {
		this.props.setState("home", stateKeys.PAGE_CLASS);
		this.props.setState("Sample content for dialog", stateKeys.DIALOG_CONTENT);
		this.getShopOpeningTime();
		this.getShopPayment();
		// this.getWorkerTypes();
	}
	
	
	render() {
		
		
		const override = {
			display: 'block',
			margin: '0 auto',
			// borderColor: 'red',
		};
		return (
			<>
				<Modal show={this.state.deleteModal} size="sm">
					<Modal.Header>
					</Modal.Header>
					<Modal.Body>
						<p>Delete {getWeekDay(this.state.weekday)}?</p>
					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-custom"
								onClick={this.handleDeleteShopService}
						>
							<i className="czi-check mr-2"/>
							Confirm
						</button>
						
						<button className="btn btn-outline-danger" onClick={()=> {this.setState({deleteModal:false})}}>Close</button>
					</Modal.Footer>
				</Modal>
				<div className="border-bottom mt-lg-2 mt-5 pt-5 pb-2 mb-2">
					<nav className="mb-4 mt-5" aria-label="breadcrumb">
						<ol className="breadcrumb flex-lg-nowrap">
							<li className="breadcrumb-item">
								<a className="text-nowrap" href="">
									<i className="czi-home" />
									Home
								</a>
							</li>
							
							<li
								className="breadcrumb-item text-nowrap active"
								aria-current="page"
							>
								Settings
							</li>
						</ol>
					</nav>
					
					<h2 className="mt-lg-1 pt-lg-1">Shop Settings</h2>
				</div>
				
				<div className="pt-1 pb-5">
					<section className="border-bottom pb-4">
						<div className="row">
							<div className="col-md-6 col-lg-3">
								{/*<img src={hairm} className="card-img-top" alt="Card image"/>*/}
								
								{/* <div className="card-body">
                  <button
                    className="btn btn-custom btn-sm mt-2"
                    onClick={() => {
                      this.setState({ createShopServiceCard: true, 
                        successMsg:false, 
                        service_name:"",
                        service_description: "",
                        service_duration:"",
                        cost: "",
                        old_cost:"", 
                        current_state_title:"Add"
                      });
                    }}
                  >
                    <i className="czi-add mr-2" />
                    Create a service
                  </button>
                </div> */}
							</div>
						</div>
					</section>
					
					<section>
						<div className="box-shadow rounded-lg overflow-hidden p-3 bg-white">
							<div className="pt-1 pb-5">
								<section className="mb-3">
									<div className="mt-3">
										<Tabs
											fill
											defaultActiveKey="profile"
											id="uncontrolled-tab-example"
										>
											<Tab eventKey="profile" title="Opening Hours">
												<div className="table-responsive">
													<table className="table table-hover">
														
														<thead className="thead-light">
														<tr className="font-weight-bold">
															<td>S/No</td>
															<td>Weekdays</td>
															<td>Open</td>
															<td>Close</td>
															<td>Action</td>
														</tr>
														</thead>
														
														<tbody>
														{this.state.openingHours &&
														this.state.openingHours.map((a, b) => {
															return (
																<tr>
																	<td>{b + 1}</td>
																	<td>
																		{getWeekDay(a.weekday)}
																	</td>
																	<td>{a.start_time == null ? "-" : a.start_time.substring(0,5)}</td>
																	<td>{a.end_time == null ? "-" : a.end_time.substring(0,5)}</td>
																	
																	
																	
																	<td>
																		<button className="btn btn-outline-danger btn-sm"
																				onClick={() => this.loadEditData(a)}
																		>
																			<i className="czi-edit" />
																		</button>
																		&nbsp;
																		<button className="btn btn-outline-danger btn-sm"
																				onClick={() => this.promptDelete(a)}
																		>
																			<i className="czi-trash" />
																		</button>
																	</td>
																</tr>
															);
														})}
														
														{!this.state.openingHours ? <tr>
															<td>&nbsp;</td>
															<td>&nbsp;</td>
															<td>
																<div className="sweet-loading">
																	<ClipLoader
																		css={override}
																		size={60}
																		color={"#3C96B3"}
																		loading={this.state.spinner}
																	/>
																</div>
															</td>
														
														</tr> : null}
														</tbody>
													</table>
												</div>
											</Tab>
											
											
											<Tab eventKey="payment" title="Payment Settings">
												<div className="table-responsive">
													<table className="table table-hover">
														
														<thead className="thead-light">
														<tr className="font-weight-bold">
															<td>S/No</td>
															<td>Payment Method</td>
															<td>Key</td>
														
														</tr>
														</thead>
														
														<tbody>
														
														<tr>
															<td>1</td>
															<td>
																Paystack
															</td>
															<td>{this.state.paymentMethods?.paystack?.public}</td>
														
														</tr>
														
														
														{!this.state.openingHours ? <tr>
															<td>&nbsp;</td>
															<td>&nbsp;</td>
															<td>
																<div className="sweet-loading">
																	<ClipLoader
																		css={override}
																		size={60}
																		color={"#3C96B3"}
																		loading={this.state.spinner}
																	/>
																</div>
															</td>
														
														</tr> : null}
														</tbody>
													</table>
												</div>
											</Tab>
										
										
										</Tabs>
									</div>
								</section>
							</div>
						</div>
					</section>
				</div>
				<form>
					
					<Modal show={this.state.successMsg} size="sm">
						<Modal.Header>
						</Modal.Header>
						<Modal.Body>
							<p>Shop Service was created
								successfully !</p>
						</Modal.Body>
						<Modal.Footer>
							<button className="btn btn-custom"
									onClick={() => {this.setState({successMsg:false})}}
							>
								Ok
							</button>
						
						</Modal.Footer>
					</Modal>
					
					<Modal show={this.state.shopOpeningCard} size="lg">
						<Modal.Header>
							<Modal.Title id="contained-modal-title-vcenter">
								{this.state.current_state_title} Shop Opening Details
							</Modal.Title>
						</Modal.Header>
						{/* {this.state.successMsg ? (
            <div className="bg-success border-rad-2 text-center p-2 mb-3">
              <p className="small text-light mb-0">
                <i className="czi-bell mr-2" /> Shop Service was created
                successfully !
              </p>
            </div>
          ) : null} */}
						
						{this.state.errorMsg ? (
							<div className="bg-danger border-rad-2 text-center p-2 mb-3">
								<p className="small text-light mb-0">
									<i className="czi-bell mr-2" /> {this.state.content_message}
								</p>
							</div>
						) : null}
						<Modal.Body>
							
							<br />
							<Row>
								<Col xs={6} md={6}>
									<div className="input-group-overlay form-group">
										<select className="form-control"
										>
											<option>--Select Weekday--</option>
											<option value="0">Sunday</option>
											<option value="1">Monday</option>
											<option value="2">Tuesday</option>
											<option value="3">Wednesday</option>
											<option value="4">Thursday</option>
											<option value="5">Friday</option>
											<option value="6">Saturday</option>
										
										</select>
									</div>
								</Col>
								<Col xs={6} md={6}>
									<div className="input-group-overlay form-group">
										<div className="input-group-prepend-overlay">
                    <span className="input-group-text">
                      <i className="czi-edit" />
                    </span>
										</div>
										<input
											className="form-control prepended-form-control"
											type="time"
											onChange={this.changeText}
											name="start_time"
											defaultValue={this.state.openingHours?.start_time}
											placeholder="Service Description"
											required
											id="desc"
										/>
									</div>
								</Col>
							</Row>
							
							<Row>
								<Col xs={6} md={6}>
									<div className="input-group-overlay form-group">
										<div className="input-group-prepend-overlay">
                    <span className="input-group-text">
                      <i className="czi-time" />
                    </span>
										</div>
										<input
											className="form-control prepended-form-control"
											type="time"
											onChange={this.changeText}
											name="end_time"
											defaultValue={this.state.openingHours?.end_time}
											placeholder="Service Duration(mins)"
											required
											id="duration"
										/>
									</div>
								</Col>
							</Row>
							
							
							
							{this.state.spinner ? (
								<div className="sweet-loading">
									<ClipLoader
										css={override}
										size={30}
										color={"#3C96B3"}
										loading={this.state.spinner}
									/>
								</div>
							) : null}
						</Modal.Body>
						<Modal.Footer>
							
							{this.state.current_state_title == "Add" ? <button
								className="btn btn-custom"
								onClick={this.handleCreateService}
							>
								<i className="czi-check mr-2" />
								Add Opening Hour
							</button> : this.state.current_state_title == "Update" ?
								
								<button
									className="btn btn-custom"
									onClick={this.handleUpdateService}
								>
									<i className="czi-check mr-2" />
									Update
								</button> : null
							}
							
							<button
								className="btn btn-outline-danger"
								onClick={() => {
									this.setState({ shopOpeningCard: false });
								}}
							>
								Close
							</button>
						</Modal.Footer>
					</Modal>
				</form>
			
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
