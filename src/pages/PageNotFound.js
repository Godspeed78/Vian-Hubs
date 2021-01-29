import React, {Component} from 'react';
import ErrorScreen from "../components/ErrorScreen/ErrorScreen";
import FrontHeader from "../layouts/FrontHeader";

export default class PageNotFound extends Component {

    render() {
        return <>
            <ErrorScreen title={'Page Not Found'}>
                <p>We could not locate the page you're looking for</p>
                <div style={{
                    'margin':'auto auto 30px auto',
                    'width': '350px',
                    'textAlign':'left',
                    'padding':'10px',
                    'backgroundColor': '#DAECD2',
                    'border': '1px solid #026E33'
                }}>
                    You can try any of these:
                    <ul>
                        <li><a href={'/services'}>View our services</a></li>
                        <li><a href={'/'}>Go to Homepage</a></li>
                    </ul>
                </div>
            </ErrorScreen>
        </>
    }
}
