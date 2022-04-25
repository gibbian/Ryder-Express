// const knex = require('../database/knex');
// //const bcrypt = require('bcrypt');
// const Connection = require('mysql/lib/Connection');

// const USER_TABLE = 'Customer';

// const hashPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
// }


// const createNewUser = async (name, email, phone, username, password ) => {
//     //console.log('Raw password:', password);
//     const salt = await bcrypt.genSalt(10);
//     //console.log('Password salt', salt);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     //console.log('Hashed password', hashedPassword);
//     Connection.query(`INSERT INTO ${USER_TABLE} (name, email, phone, username, password) VALUES ('${name}', '${email}', '${phone}', '${username}', '${hashedPassword}')`, (err, result) => {
//     Connection.query(`INSERT INTO ${USER_TABLE} (name, email, phone, username, password ) VALUES (?, ?, ?, ?, ?)`, [name, email, username, phone, [hashedPassword],  (err, results) => {


//     // const query = knex(USER_TABLE).insert({ username, password: hashedPassword });
//     console.log('Raw query for createNewUser:', query.toString());
//     const result = await query;

//     return result;
// };
// //COME BACK TO THIS //////////// V

// const findUserByUser = async (username) => {
//     const query = knex(USER_TABLE).where({ username });
//     const result = await query;
//     return result;
// }

// const authenticateUser = async (username, password) => {
//     const users = await findUserByEmail(email);
//     console.log('Results of users query', users);
//     if (users.length === 0) {
//         console.error(`No users matched the email: ${username}`);
//         return null;
//     }
//     const user = users[0];
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (validPassword) {
//         delete user.password;
//         return user;
//     }
//     return null;
// }




// module.exports = {
//     createNewUser,
//     findUserByUser,
//     authenticateUser
// };