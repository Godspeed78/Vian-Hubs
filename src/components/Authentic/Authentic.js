import React from 'react';

class Authentic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			info: null
		};
	}


	componentDidCatch(error, errorInfo) {
		this.setState({
			hasError: true,
			error: error,
			info: errorInfo
		});

		// log the error to an error reporting service e.g slack
		// console.log(error, errorInfo);
	}

	render() {


		if (!localStorage.getItem('token') || !localStorage.getItem('userStorage')) {
			window.location = "/login";
		} else {
			return this.props.children;
		}

	}
}

export default Authentic