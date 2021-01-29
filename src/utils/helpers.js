import {useState} from "react";
import {worker} from "./Identifiers"

export const user_storage = JSON.parse(localStorage.getItem("userStorage"));

export function getSubDomain() {
    let hostname = window.location.hostname;
    let regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
    let urlParts = regexParse.exec(hostname);
    return hostname.replace(urlParts[0], '').slice(0, -1);
}

export function userLoggedIn() {
    return !!localStorage.getItem('token');
}

export function loginUser(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userStorage', JSON.stringify(data.user));
    
    if(data.user.worker_profile != null && data.user.worker_profile.worker_type_id === worker.admin){
        window.location =  "/admin";        
    }
    else if(data.user.worker_profile != null && data.user.worker_profile.worker_type_id === worker.cashier){
        window.location =  "/cashier";        
    }
    else if(data.user.worker_profile != null && data.user.worker_profile.worker_type_id === worker.attendant){
        window.location =  "/attendant";
    }
    else if(data.user.worker_profile == null){
        window.location =  "/Dashboard";        

    }
    

}

export function formatNaira(amount) {
    var amt = amount/100;
    var n_sign = '₦';

    var rounded = roundNum(amt, 2);
    var formathousand = rounded.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return n_sign + formathousand;
}

export function roundNum(value, decimals) {
    return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
}

export function time_convert(num)
{
    var hours = Math.floor(num / 60);
    var minutes = num % 60;

    var my_hours = '' + hours;
    while (my_hours.length < 2) {
        my_hours = '0' + my_hours;
    }

    var my_mins = '' + minutes;
    while (my_mins.length < 2) {
        my_mins = '0' + my_mins;
    }

    if (hours > 0) {
        return my_hours + " hrs:" + my_mins + " mins";
    } else {
        return my_mins + " mins";
    }

}

export function durationCovert(data) {
	var num = data;
	var hours = (num / 60);
	var rhours = Math.floor(hours);
	var minutes = (hours - rhours) * 60;
	var rminutes = Math.round(minutes);
	if(rhours < 1)
	{
		return rminutes +"mins";
	}
	else if(rhours == 1)
	{
		return rhours +"hr" + " " + rminutes +"mins";
	}
	else if(rhours > 1)
	{
		return rhours +"hrs"+ " " + rminutes +"mins";
	}
}

export function getWeekDay(data){
    if(data == 0){
        return "Sunday"
    }else if(data == 1){
        return "Monday";
    }
    else if(data == 2){
        return "Tuesday"
    }
    else if(data == 3){
        return "Wednesday"
    }
    else if(data == 4){
        return "Thursday"
    }
    else if(data == 5){
        return "Friday"
    }
    else if(data == 6){
        return "Saturday"
    }
}

export function logOutUser() {
    localStorage.removeItem('token');
    localStorage.clear();
    window.location = '/login';
}

export function vd(value, defaultValue) {
    return typeof (value) !== 'undefined' ? value : defaultValue;
}

export function handleAxiosError(error, form, el) {
    el = vd(el, '.notify');
    let message = getErrorMessage(error);
    notify({'status': false, 'message': message}, el);
}

export function handleFormSubmissionError(error, component) {
    let message = getErrorMessage(error);
    component.setState({errorMessage: message, success: false, error: true, loading: false});
}

export function getErrorMessage(xhr) {
    let message = '';
    const error = xhr ? (xhr.response ? xhr.response : xhr) : null;
    if (error && error.status) {
        // Request made and server responded
        if (error.status === 500) {
            message = "Something went wrong, try again later";
        } else if (error.status === 503) {
            message = "Service is temporary unavailable, try again later";
        } else if (error.status === 401) {
            message = "Unauthorized, authentication failed";
        } else if (error.status === 422 && typeof error.data.message == "object") {
            // const key = Object.keys(error.data.message)[0];
            const errMessage = error.data.message;
            let textArr = [];
            Object.keys(errMessage).forEach(key => {
                errMessage[key].forEach(function (value, index) {
                    textArr.push(value);
                });
            });
            message = textArr;
        } else {
            message = error.data.message;
        }
    } else if (error && error.toString().startsWith('Error:')) {
        message = error.toString().substring(6);
    } else {
        // The request was made but no response was received
        message = "Seems like you're offline, check internet connection";
    }
    return message;
}

export function currencyFormat(num, symbol = '₦', dp = 0) {
    if (typeof num === 'number')
        return symbol + num.toFixed(dp)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    else
        return symbol + num;
}

export function nairaFormat(num, dp = 0, inKobo = true) {
    return currencyFormat(inKobo ? (num / 100) : num, '₦', dp)
}

export function httpQueryBuild(params) {
    let esc = encodeURIComponent;
    return Object.keys(params)
        .map(function (k) {
            return esc(k) + '=' + esc(params[k]);
        })
        .join('&');
}

export function objectToHTTPQuery(params) {
    let query = '';
    if (params)
        query = '?' + httpQueryBuild(params);

    return query;
}

export function br2nl(str) {
    return str.replace(/<br\s*\/?>/mg, "\n");
}

export function nl2br(str) {
    return str.replace(/\n/g, "<br/>");
}

export function isSmallScreen() {
    return window.innerWidth <= 600;
}

export function isMediumScreen() {
    return window.innerWidth > 600 && window.innerWidth < 1024;
}

export function isLargeScreen() {
    return window.innerWidth >= 1024;
}

let lastToast;
let toastTimer;

export function toast(message, time) {
    if (typeof (lastToast) !== 'undefined') {
        clearTimeout(toastTimer);
        lastToast.parentNode.removeChild(lastToast);
    }

    let toastContainer = document.getElementById('__toast');
    if (!toastContainer || !toastContainer.length) {
        toastContainer = document.createElement('div');
        toastContainer.id = '__toast';
        toastContainer.style.position = 'fixed';
        toastContainer.style.textAlign = isSmallScreen() ? 'center' : 'left';
        toastContainer.style.top = isSmallScreen() ? 'auto' : '100px';
        toastContainer.style.bottom = isSmallScreen() ? '0' : 'auto';
        toastContainer.style.width = isSmallScreen() ? '100%' : 'auto';
        toastContainer.style.zIndex = '2000';
        toastContainer.style.right = isSmallScreen() ? '0' : '50px';

        document.body.appendChild(toastContainer);
    }

    lastToast = document.createElement('div');
    lastToast.classList.add('animated', 'slideInUp', 'toast');
    lastToast.style.backgroundColor = '#333';
    lastToast.style.color = '#fff';
    lastToast.style.visibility = 'visible';
    lastToast.style.opacity = '1';
    lastToast.style.padding = '10px';
    lastToast.style.minWidth = '100px';
    lastToast.style.marginTop = '5px';
    lastToast.style.width = isSmallScreen() ? '100%' : 'auto';
    lastToast.style.borderRadius = isSmallScreen() ? '0px' : '5px';

    lastToast.innerHTML = message;
    toastContainer.appendChild(lastToast);

    toastTimer = setTimeout(function () {
        lastToast.parentNode.removeChild(lastToast);
        lastToast = undefined;
    }, time ? time : 4000);
}

export function notify(response, container, style) {
    //Process message
    let message = '';
    if (typeof (response['message']) !== 'undefined') {
        message = response['message'];
        if (message instanceof Array) {
            message = message.join('<br/>');
        }
    } else {
        message = toString(response);
    }

    container = document.querySelectorAll(container);
    if (!container.length) {
        //If no container is set
        toast(message, 10000);
    } else {
        mapToElements(container, function (el) {
            let handle = el['data-timer'];
            if (typeof handle === 'number') {
                clearTimeout(handle);
            }

            //Remove *-text classes
            el.classList.remove('green-text', 'red-text', 'orange-text');
            el.innerHTML = message;
            if (typeof (response['message']) !== 'undefined') {
                el.classList.add((typeof (response['mode']) !== 'undefined') ?
                    response.mode + '-text' :
                    (response['status'] === true ? 'green-text' : 'red-text'));
            } else {
                el.classList.add((typeof style === 'undefined') ? 'orange-text' : style);
            }
            el.style.display = 'block';
            el['data-timer'] = setTimeout(function () {
                el.style.display = 'none';
            }, 15000);
        })
    }
}

export function mapToElements(elements, callable) {
    [...elements].forEach(function (el, index) {
        callable(el, index);
    });
}

export function copyToClipboard(text, notify) {
    let copy;
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        copy = window.clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        let textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            copy = document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }

    if (typeof notify !== 'undefined' ? !!notify : true) {
        toast('copied', 3000);
    }
    return copy;
}

export function showPageLoader() {
    let els = document.querySelectorAll('#page-loader, #page-loader #loader');
    [...els].forEach(function (el) {
        el.style.display = 'block';
    });
}

export function hidePageLoader() {
    let els = document.querySelectorAll('#page-loader, #page-loader #loader');
    [...els].forEach(function (el) {
        el.style.display = 'none';
    });
}

export function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState =>
        setState(prevState => Object.assign({}, prevState, newState));
    return [state, setMergedState];
}
