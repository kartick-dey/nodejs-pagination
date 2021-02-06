const mongoose = require('mongoose');
const randomUserModel = require('./user.model');
const fetch = require('node-fetch');
const buildUser = require('./buildUser');

const fetchUserFromExternal = (callback) => {
    fetch('https://randomuser.me/api/?results=10')
        .then(res => res.json())
        .then(jsonData => {
            const users = buildUser(jsonData.results);
            callback(null, users);
        })
        .catch(error => callback("Error in fetching users from external resource"));
};

const addUsersToDB = (callback) => {
    fetchUserFromExternal((error, users) => {
        if (error) {
            return callback(error)
        }
        randomUserModel.estimatedDocumentCount({}, (err, count) => {
            if (error) {
                return callback('Error in counting no of documents in collection(users)')
            }
            if (count === 10) {
                return callback(null, "10 Data available");
            }
            randomUserModel.insertMany(users)
                .then(() => {
                    callback(null, "Data added successfully");
                })
                .catch(error => {
                    console.log(error);
                    callback('Error in inserting user data in DB')
                });
        });

    })
}

const getUsersFromDB = async () => {
    try {
        const users = await randomUserModel.find();
        return users;
    } catch (error) {
        return "Somenthing went wrong!";
    }


}

module.exports = {
    getUsersFromDB,
    addUsersToDB
};