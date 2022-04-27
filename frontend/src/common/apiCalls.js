import axios from 'axios';
import { apiEndpoint, apiConfig } from './apiConfig';

export class apiCalls {
    getShipperToken() {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/shipper/login`, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
            })
                .then(res => {
                    console.log('Responce: ');
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error: ');
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                });
        }
        )
    }

    getCustomerToken() {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/customer/login`, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
            })
                .then(res => {
                    console.log('Responce: ');
                    resolve(res);
                })
                .catch(err => {
                    console.log('Error: ');
                    reject(err);
                })
                .finally(() => {
                    console.log("We're in");
                });
        }
        )
    }

    shipperLogin(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/shipper/login`, {username: username, password: password})
            .then(responce => {
                console.log('Responce: ');
                console.log(responce);
                sessionStorage.setItem('token', responce.data);
                resolve(responce);
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
            axios.post(`${apiEndpoint}/customer/login`, {username: username, password: password})
            .then(responce => {
                console.log('Responce: ');
                console.log(responce);
                sessionStorage.setItem('token', responce.data);
                resolve(responce);
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
                shippingRate: shippingRate,
                fleetSize: fleetSize,
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
}