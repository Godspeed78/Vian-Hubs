import axios from 'axios'
import {logOutUser, objectToHTTPQuery} from "./helpers";


let accountId = 'vianhubs';
let Endpoint = {
    init: () => {
        // let accountId = process.env.REACT_APP_ACCOUNT_ID;
        let token = localStorage.getItem("token");
        if (token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
        // Intercept 401 HTTP Error code in API
        axios.interceptors.response.use(response => response, (error) => {
            if (error.response && error.response.status === 401 && error.response.config.url !== '/login') {
                logOutUser();
            }

            return Promise.reject(error);
        });
    },


    login: (data) => {
        return axios.post(`/shop/${accountId}/login`, data)
    },
    register: (data) => {
        return axios.post(`/shop/${accountId}/register`, data)
    },
    getFeatureServices: () => {
        return axios.get(`/shop/${accountId}/services`)
    },
    getAllShopServices: () => {
        return axios.get(`/shop/${accountId}/services`)
    },
    getOrderByReference: (data) => {
        return axios.get(`/shop/${accountId}/orders/` + data)
    },
    getCart: () => {
        return axios.get(`/shop/${accountId}/cart`)
    },
    addToCart: (data) => {
        return axios.post(`/shop/${accountId}/cart`, data)
    },
    deleteItemFromCart: (data) => {
        return axios.delete(`/shop/${accountId}/cart/` + data)
    },
    emptyCart: () => {
        return axios.delete(`/shop/${accountId}/cart`)
    },
    getUserProfile: () => {
        return axios.get(`/shop/${accountId}/user/`)
    },
    updateUserProfile: (data) => {
        return axios.patch(`/shop/${accountId}/user`, data)
    },
    getAttendantSchedule: (data) => {
        return axios.get(`/shop/${accountId}/attendants/` + data + `/schedule`)
    },
    getCustomerOrders: (data) => {
        return axios.get(`/shop/${accountId}/orders`, data)
    },
    getCustomerSessions: (data) => {
        let query = objectToHTTPQuery(data);
        return axios.get(`/shop/${accountId}/sessions` + query)
    },

    cashierCheckout: (data) => {
        return axios.post(`/shop/${accountId}/s/cart/checkout`, data)
    },
    customerCheckout: (data) => {
        return axios.post(`/shop/${accountId}/cart/checkout`, data)
    },
    verifyPayment: (method, data) => {
        return axios.post(`/shop/${accountId}/payment/verify/` + data + `/` + method)
    },
    getShopDetails: () => {
        return axios.get(`/shop/${accountId}`)
    },
    getShopOrders: () => {
        return axios.get(`/shop/${accountId}/sessions`)
    },
    getShopAttendants: () => {
        return axios.get(`/shop/${accountId}/attendants`)
    },
    getAttendantAppointments: (id, data) => {
        let query = objectToHTTPQuery(data);
        return axios.get(`/shop/${accountId}/s/sessions/worker/` + id + query)
    },
    getShopAppointments: () => {
        return axios.get(`/shop/${accountId}/sessions/`)
    },
    getShopAttendantAsStaff: (data) => {
        return axios.get(`/shop/${accountId}/s/workers/` + data)
    },
    getShopAttendantAsCustomer: (data) => {
        return axios.get(`/shop/${accountId}/attendants/` + data)
    },
    getCartTotal: () => {
        return axios.get(`/shop/${accountId}/cart/count`)
    },
    createCustomerReview: (data) => {
        return axios.post(`/shop/${accountId}/reviews`, data)
    },
    getShopWorkers: () => {
        return axios.get(`/shop/${accountId}/s/workers`)
    },
    getWorkerTypes: () => {
        return axios.get(`/shop/${accountId}/s/workers/types`)
    },
    getCustomerAppointments: () => {
        return axios.get(`/shop/${accountId}/orders`)
    },
    createShopWorker: (data) => {
        return axios.post(`shop/${accountId}/s/workers`, data)
    },
    getShopCustomers: (data) => {
        return axios.get(`/shop/${accountId}/s/customers`, data)
    },
    getArticles: (data) => {
        let query = objectToHTTPQuery(data);
        return axios
            .get("/articles" + query);
    },
    getArticle: (slug, data) => {
        let query = objectToHTTPQuery(data);
        return axios
            .get("/articles/" + slug + query);
    },

    deleteShopWorker: (worker_id) => {
        return axios.delete(`/shop/${accountId}/s/workers/${worker_id}`)
    },
    createShopService: (data) => {
        return axios.post(`/shop/${accountId}/s/services`, data)
    },
    editShopService: (data, service_slug) => {
        return axios.patch(`/shop/${accountId}/s/services/${service_slug}`, data)
    },
    deleteShopService: (service_slug) => {
        return axios.delete(`/shop/${accountId}/s/services/${service_slug}`)
    },

    getAttendantSessions: (data, filter) => {
        return axios.get(`shop/${accountId}/s/sessions/worker/${data}?filter=${filter}`)
    },
    getAttendantSessionsDefault: (data) => {
        return axios.get(`shop/${accountId}/s/sessions/worker/${data}`)
    },

    editShopWorker: (workerId, data) => {
        return axios.patch(`/shop/${accountId}/s/workers/${workerId}`, data)
    },
    getShopEarnings: (start_date, end_date) => {
        let query = objectToHTTPQuery({start_date: start_date, end_date: end_date});
        return axios.get(`shop/${accountId}/s/earnings` + query)
    },
    getShopEarningsLazy: () => {
        return axios.get(`shop/${accountId}/s/earnings`)
    },
    getShopOpeningHours: () => {
        return axios.get(`shop/${accountId}/opening-hours`)
    },
    getShopPaymentMethods: () => {
        return axios.get(`shop/${accountId}/payment/methods`)
    },

    updateShopCustomer: (data, customer_id) => {
        return axios.patch(`/shop/${accountId}/s/customers/${customer_id}`, data)
    },

    deleteShopCustomer: (customer_id) => {
        return axios.delete(`/shop/${accountId}/s/customers/${customer_id}`)
    },
    
    getCustomerReviews: () => {
        return axios.get(`shop/${accountId}/reviews`)
    },
    
    getShopCategories: () => {
        return axios.get(`shop/${accountId}/categories`)
    },
    createShopCategory: (data) => {
        return axios.post(`/shop/${accountId}/s/categories`, data)
    },
    editShopCategory: (data, category_slug) => {
        return axios.patch(`/shop/${accountId}/s/categories/${category_slug}`, data)
    },
    deleteShopCategory: (category_slug) => {
        return axios.delete(`/shop/${accountId}/s/categories/${category_slug}`)
    },

    getAttendantEarningsLazy: (worker_id) => {
        return axios.get(`/shop/${accountId}/s/workers/${worker_id}/earnings`)
    },
    getAttendantEarnings: (start_date, end_date, worker_id ) => {
        return axios.get(`/shop/${accountId}/s/workers/${worker_id}/earnings?start_date=${start_date}&end_date=${end_date}`)
    },
 

    

}

export default Endpoint