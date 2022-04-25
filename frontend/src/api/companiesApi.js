import axios from 'axios';

//api call


const apiEndpoint = 'http://thursdayteam2.cvnbciopzyaw.us-east-1.rds.amazonaws.com/';
const apiConfig = {
    headers: {
        Authorization: 'admin'
    }
};




export const getCompanies = (params) => new Promise((resolve, reject) => {
    let _apiConfig = { ...apiConfig };
    if (params) {
        _apiConfig.params = params;
    }

    axios.get(`${apiEndpoint}`, _apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getCompaniesById = (id) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/${id}`, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});
