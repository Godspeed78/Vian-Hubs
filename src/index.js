import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './assets/css/App.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './redux/reducers';
import Endpoint from "./utils/endpoint";

//Setup endpoint configurations
Endpoint.init();

const store = createStore(reducer);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

