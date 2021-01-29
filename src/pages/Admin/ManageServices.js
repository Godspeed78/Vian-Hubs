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
import { Modal, Row, Col } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import {currencyFormat, durationCovert} from "../../utils/helpers"
import { displayPartsToString } from "typescript";


class ManageServices extends Component {
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
			service_name:data.name,
			service_description: data.description,
			service_duration:data.duration,
			cost: data.cost/100,
			old_cost:data.old_cost/100,
			createShopServiceCard:true,
			current_state_title:"Update",
			service_slug:data.slug,
			successMsg:false,
			id:data.id
		})
		console.log(data, "Service Data")
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
	
	handleUpdateService = () => {
		this.setState({spinner:true})
		const payload = {
			name:this.state.service_name,
			description: this.state.service_description,
			duration: parseInt(this.state.service_duration),
			cost: parseInt(this.state.cost) * 100,
			old_cost:parseInt(this.state.old_cost) * 100,
			slug: this.state.service_slug
		};
		Endpoint.editShopService(payload, this.state.service_slug)
			.then((res) => {
				this.setState({successMsgUpdate: true, spinner: false, createShopServiceCard:false});
				this.componentDidMount();
			})
			.catch((error) => {
				console.log(error + "error")
				this.setState({
					errorMsg:true,
					content_message:"Oops! An error occured. Check that you have an active internet connection and try again",
				})
				
				setTimeout(() => {
					this.setState({
						errorMsg:false
					})
				},4000)
			});
	};
	
	getShopServices = () => {
		Endpoint.getFeatureServices()
			.then(res => {
				this.setState({shopServices: res.data.data});
				console.log(res.data.data)
			})
	};
	
	
	handleDeleteShopService = () => {
		this.setState({deleteModal:false})
		Endpoint.deleteShopService(this.state.service_slug)
			.then((res) => {
				console.log(res)
				this.componentDidMount();
			})
	}
	
	promptDelete = (a) => {
		// this.loadData(a);
		this.setState({
			deleteModal:true,
			service_name:a.name,
			service_slug:a.slug,
		})
	}
	
	// loadData = (data) => {
	//   this.setState({
	//     id:data.id
	
	//   })
	// }
	
	
	
	componentDidMount() {
		this.props.setState("home", stateKeys.PAGE_CLASS);
		this.props.setState("Sample content for dialog", stateKeys.DIALOG_CONTENT);
		this.getShopServices();
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
				
				<Modal show={this.state.successMsgUpdate} size="sm">
					<Modal.Header></Modal.Header>
					<Modal.Body>
						<p>Shop Service updated successfully !</p>
					</Modal.Body>
					<Modal.Footer>
						<button
							className="btn btn-custom"
							onClick={() => {
								this.setState({ successMsgUpdate: false });
							}}
						>
							Ok
						</button>
					</Modal.Footer>
				</Modal>
				<Modal show={this.state.deleteModal} size="sm">
					<Modal.Header>
					</Modal.Header>
					<Modal.Body>
						<p>Delete {this.state.service_name}?</p>
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
								Manage Shop Services
							</li>
						</ol>
					</nav>
					
					<h2 className="mt-lg-1 pt-lg-1">Shop Services</h2>
				</div>
				
				<div className="pt-1 pb-5">
					<section className="border-bottom pb-4">
						<div className="row">
							<div className="col-md-6 col-lg-3">
								{/*<img src={hairm} className="card-img-top" alt="Card image"/>*/}
								
								<div className="card-body">
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
								</div>
							</div>
						</div>
					</section>
					
					<section>
						<div className="box-shadow rounded-lg overflow-hidden p-3 bg-white">
							<div className="pt-1 pb-5">
								<section className="mb-3">
									<div className="mt-3">
										<div className="table-responsive">
											<table className="table table-hover">
												
												<thead className="thead-light">
												<tr className="font-weight-bold">
													<td>S/No</td>
													<td>Service Name</td>
													<td>Duration</td>
													<td>Cost</td>
													<td>Date Created</td>
													<td>Action</td>
												</tr>
												</thead>
												
												<tbody>
												{this.state.shopServices &&
												this.state.shopServices.map((a, b) => {
													return (
														<tr>
															<td>{b + 1}</td>
															<td>
																{a.name}
															</td>
															<td>{durationCovert(a.duration)}</td>
															<td>{currencyFormat(a.cost/100)}</td>
															
															
															<td>{a.created_at.slice(0,10)}</td>
															
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
												
												{!this.state.shopServices ? <tr>
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
					
					<Modal show={this.state.createShopServiceCard} size="lg">
						<Modal.Header>
							<Modal.Title id="contained-modal-title-vcenter">
								{this.state.current_state_title} Shop Service
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
										<div className="input-group-prepend-overlay">
                    <span className="input-group-text">
                      <i className="czi-edit" />
                    </span>
										</div>
										<input
											className="form-control prepended-form-control"
											type="text"
											onChange={this.changeText}
											name="service_name"
											defaultValue={this.state.service_name}
											placeholder="Service Name"
											required
											id="sn"
										
										/>
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
											type="text"
											onChange={this.changeText}
											name="service_description"
											defaultValue={this.state.service_description}
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
											type="number"
											onChange={this.changeText}
											name="service_duration"
											defaultValue={this.state.service_duration}
											placeholder="Service Duration(mins)"
											required
											id="duration"
										/>
									</div>
								</Col>
								<Col xs={6} md={6}>
									<div className="input-group-overlay form-group">
										<div className="input-group-prepend-overlay">
                    <span className="input-group-text">
                      <i className="czi-naira" >
                      ₦
                        </i>
                    </span>
										</div>
										<input
											className="form-control prepended-form-control"
											type="number"
											onChange={this.changeText}
											name="cost"
											defaultValue={this.state.cost}
											placeholder="Cost"
											required
											id="cost"
										
										/>
									</div>
								</Col>
							</Row>
							
							<Row>
								<Col xs={6} md={6}>
									<div className="input-group-overlay form-group">
										<div className="input-group-prepend-overlay">
                    <span className="input-group-text">
                    <i className="czi-naira" >
                      ₦
                        </i>
                    </span>
										</div>
										<input
											className="form-control prepended-form-control"
											type="number"
											onChange={this.changeText}
											name="old_cost"
											defaultValue={this.state.old_cost}
											placeholder="Old Cost"
											required
											id="oldCost"
										
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
								Add Service
							</button> : this.state.current_state_title == "Update" ?
								
								<button
									className="btn btn-custom"
									onClick={this.handleUpdateService}
								>
									<i className="czi-check mr-2" />
									Update Service
								</button> : null
							}
							
							<button
								className="btn btn-outline-danger"
								onClick={() => {
									this.setState({ createShopServiceCard: false });
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageServices);
