import React, {Component} from 'react';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../../../redux/actions";
import {Link, Redirect} from "react-router-dom"
import {getAccountID, handleAxiosError, handleFormSubmissionError, loginUser, logOutUser, user_storage} from "../../../utils/helpers";
import Endpoint from "../../../utils/endpoint";
import ClipLoader from "react-spinners/ClipLoader";

class Login extends Component {
	state = {
		email: '',
		password: '',
		formIncomplete: false,
	};

	changeText = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	loadDataFromServer = () => {
		let data = [];
		let localToken = localStorage.getItem('token');
		let localUser = JSON.parse(localStorage.getItem('userStorage'));

		if (localToken && localUser) {
			data['token'] = localToken;
			data['user'] = localUser;

			loginUser(data);
		}

	};

	login = (e) => {
		e.preventDefault();
		this.setState({loading: true, success: false, error: false});

		if (!this.state.email || !this.state.password) {
			this.setState({formIncomplete: true, loading: false});
			return
		}

		const LoginProps = {
			email: this.state.email,
			password: this.state.password,
		};

		// Endpoint.login_user(LoginProps, callback => {
		// 	console.log(callback, "My Data");
			
		// 	this.setState({error: false, success: true, loading: false});
		// 		loginUser(callback.data);
		// })

		Endpoint.login(LoginProps)
			.then((res) => {
				console.log(res.data.data.token);
				this.setState({error: false, success: true, loading: false});
				console.log(res.data.data)
				loginUser(res.data.data);
			})
			.catch((error) => handleFormSubmissionError(error, this));

		return false;
	};

	componentDidMount() {
		if(user_storage != null){
			// loginStatus();
		}
		this.props.setState('home', stateKeys.PAGE_CLASS);
		this.props.setState('Sample content for dialog', stateKeys.DIALOG_CONTENT);

		this.loadDataFromServer();
	}

	render() {
		const override = {
			display: 'block',
			margin: '0 auto',
			// borderColor: 'red',
		};

		

		return (
			<>
				{/*Hero section*/}

				<div className="container py-4 py-lg-5 my-4">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<div className="card border-0 box-shadow">
								<div className="card-body">
									<h2 className="h4 mb-1">Login</h2>

									<hr/>

									<h3 className="font-size-base pt-4 pb-2">Using form below</h3>

									{this.state.formIncomplete ?
										<div className="bg-danger border-rad-2 text-center p-2 mb-3">
											<p className="small text-light mb-0">
												<i className="czi-bell mr-2"/> Please fill in all fields.
											</p>
										</div>
										: null
									}
									{this.state.error ?
										<div className="bg-danger border-rad-2 text-center p-2 mb-3">
											<p className="small text-light mb-0">
												<i className="czi-bell mr-2"/> {this.state.errorMessage}
											</p>
										</div>
										: null
									}
									<form className="needs-validation" noValidate onSubmit={this.login}>
										<div className="input-group-overlay form-group">
											<div className="input-group-prepend-overlay">
                                                <span className="input-group-text">
                                                    <i className="czi-mail"/>
                                                </span>
											</div>
											<input className="form-control prepended-form-control" type="email"
												   onChange={this.changeText} name='email' placeholder="Email" required/>
										</div>

										<div className="input-group-overlay form-group">
											<div className="input-group-prepend-overlay">
                                                <span className="input-group-text">
                                                    <i className="czi-locked"/>
                                                </span>
											</div>
											<div className="password-toggle">
												<input className="form-control prepended-form-control" type="password"
													   onChange={this.changeText} name='password' placeholder="Password" required/>

												<label className="password-toggle-btn">
													<input className="custom-control-input" type="checkbox"/>
													{/*<i className="czi-eye password-toggle-indicator"/>*/}
													{/*<span className="sr-only">Show password</span>*/}
												</label>
											</div>
										</div>

										<div className="d-flex flex-wrap justify-content-between">
											<div className="custom-control custom-checkbox">
												<input className="custom-control-input" type="checkbox"
													   id="remember_me"/>
												<label className="custom-control-label" for="remember_me">Remember
													me</label>
											</div>

											<a className="nav-link-inline font-size-sm"
											   href="#">Forgot password?</a>
										</div>

										<hr className="mt-4"/>

										<div className="d-flex justify-content-between pt-4">
											<p>Don't have an account? <span className='font-weight-bold'> <Link to={'/register'}> Register</Link></span></p>

											{this.state.loading ?
												<div className="sweet-loading">
													<ClipLoader
														css={override}
														size={30}
														color={"#3C96B3"}
														loading={this.state.loading}
													/>
												</div>
												:
												<button className="btn btn-custom" type="submit">
													<i className="czi-sign-in mr-2 ml-n21"/>Sign In
												</button>
											}
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
