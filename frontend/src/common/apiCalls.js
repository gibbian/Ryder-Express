import axios from 'axios';
import { apiEndpoint, apiConfig } from './apiConfig';

export class apiCalls {
    // getShipperToken() {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${apiEndpoint}/shipper/login`, {
    //             headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    //         })
    //             .then(res => {
    //                 console.log('response: ');
    //                 resolve(res);
    //             })
    //             .catch(err => {
    //                 console.log('Error: ');
    //                 reject(err);
    //             })
    //             .finally(() => {
    //                 console.log("We're in");
    //             });
    //     }
    //     )
    // }

    // getCustomerToken() {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${apiEndpoint}/customer/login`, {
    //             headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    //         })
    //             .then(res => {
    //                 console.log('response: ');
    //                 resolve(res);
    //             })
    //             .catch(err => {
    //                 console.log('Error: ');
    //                 reject(err);
    //             })
    //             .finally(() => {
    //                 console.log("We're in");
    //             });
    //     }
    //     )
    // }

    shipperLogin(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/shipper/login`, { username: username, password: password })
                .then(response => {
                    console.log('Response: ');
                    console.log(response);
                    sessionStorage.setItem('token', response.data.data[0].token);
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('isShipper', true);
                    resolve(response);
                })
                .catch(err => {
                    console.log('Error: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                });
        })
    }

    customerLogin(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/customer/login`, { username: username, password: password })
                .then(response => {
                    console.log('Response: ');
                    console.log(response);
                    sessionStorage.setItem('token', response.data.data[0].token);
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('isShipper', false);
                    resolve(response);
                })
                .catch(err => {
                    console.log('Error: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                });
        })
    }


    shipperRegister(name, email, phone, region, shippingRate, fleetSize, username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/shipper`, {
                name: name,
                email: email,
                phone: phone,
                region: region,
                shipping_rates: shippingRate,
                fleet_size: fleetSize,
                username: username,
                password: password

            })
                .then(res => {
                    console.log('Connected');
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error: Not Connected');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                });
        }
        )
    }

    buyerRegister(name, email, phone, username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/customer`, {
                name: name,
                email: email,
                phone: phone,
                username: username,
                password: password
            })
                .then(res => {
                    console.log('Connected');
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error: Not Connected');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                });
        }
        )
    }

    getDeliveries(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/delivery/buyer/${id}}`)
                .then(res => {
                    console.log('Response: ');
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error, cannot fetch deliveries: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

    getOutgoingDeliveries(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/delivery/seller/${id}}`)
                .then(res => {
                    console.log('Response: ');
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error, cannot fetch deliveries: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

    getReviews(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/shipper_reviews/${id}}`)
                .then(res => {
                    console.log('Response: ');
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error, cannot fetch reviews: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

    getCustomerByUsername(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/customer/${username}`)
                .then(res => {
                    console.log('Found User: ');
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error, cannot fetch reviews: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

    getShipperByUsername(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/shipper/${username}`)
                .then(res => {
                    console.log('Found User: ');
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error, cannot fetch reviews: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

    getEmployee(companyID, employeeID){
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/employee/${companyID}/${employeeID}`)
                .then(res => {
                    console.log('Found Employee: ');
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error, cannot fetch reviews: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

    getSellerByID(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/shipper/${id}}`)
                .then(res => {
                    console.log('Response: ');
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error, cannot fetch reviews: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

    getShipperAvailable(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/dates/${id}}/true`)
                .then(res => {
                    console.log('Response: ');
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error, cannot fetch reviews: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

    makeDelivery(buyer_id, seller_id, employee_id, origin_loc, destination, product_name,date_received) {  
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/delivery`, {
                buyer_id: buyer_id,
                seller_id: seller_id,
                employee_id: employee_id,
                origin_loc: origin_loc,
                destination: destination,
                product_name: product_name,
                date_received: date_received,

            })
                .catch(err => {
                    console.log('Error, cannot fetch reviews: ');
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                })
        })
    }

}