const knex = require('../database/knex');
const bcrypt = require('bcrypt');

const USER_TABLE = 'Account';

const createNewUser = async (username, password) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);

    const query = knex(USER_TABLE).insert({ username, password: hashedPassword });
    console.log('Raw query for createNewUser:', query.toString());
    const result = await query;

    return result;
};
//COME BACK TO THIS //////////// V

const findUserByUser = async (username) => {
    const query = knex(USER_TABLE).where({ username });
    const result = await query;
    return result;
}

const authenticateUser = async (username, password) => {
    const users = await findUserByEmail(email);
    console.log('Results of users query', users);
    if (users.length === 0) {
        console.error(`No users matched the email: ${username}`);
        return null;
    }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        delete user.password;
        return user;
    }
    return null;
}




module.exports = {
    createNewUser,
    findUserByUser,
    authenticateUser
};