const jwt = require('jsonwebtoken');
const User = require('../models/account');


const accessTokenSecret = 'mysupercoolsecret';

const authenticateStudent = async (username, password) => {
    const user = await User.authenticateUser(username, password);
    if (user === null) {
        return user;
    }
    const account = await User.findUserByUser(username);
    console.log('Account', account);
    const accessToken = jwt.sign({ ...username[0], }, accessTokenSecret);

    return accessToken;
    
}

module.exports = {
    authenticateStudent
};