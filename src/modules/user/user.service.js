const randomUserModel = require('./user.model');
const fetch = require('node-fetch');
const buildUser = require('./buildUser');


/**
 * It will trigger when /api/v1.0/get-email/:email called
 * @param callback
 * @param callback(error, success) 
 */
const fetchUserFromExternal = (callback) => {
    fetch('https://randomuser.me/api/?results=1000')
        .then(res => res.json())
        .then(jsonData => {
            const users = buildUser(jsonData.results);
            callback(null, users);
        })
        .catch(error => {callback("Error in fetching users from external resource");
        console.log("Error in doc counting");});
};


/**
 * It will trigger when /api/v1.0/get-email/:email called
 * @param callback
 * @param callback(error, success)
 */
const addUsersToDB = (callback) => {
    fetchUserFromExternal((error, users) => {
        if (error) {
            return callback(error)
        }
        randomUserModel.estimatedDocumentCount({}, (err, count) => {
            if (error) {
                console.log("Error in doc counting");
                return callback('Error in counting no of documents in collection(users)')
            }
            if (count === 1000) {
                return callback(null, "1000 Data available");
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


/**
 * It will help to fetch the users from DB
 * @param None 
 * @param None 
 */
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