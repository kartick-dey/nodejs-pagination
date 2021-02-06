const fetch = require('node-fetch');
const mongoose = require('mongoose');
const userModel = require('./src/modules/user/user.model');
const buildUser = require('./src/modules/user/buildUser')

// Database connection 
mongoose.connect('mongodb://127.0.0.1:27017/user_registration_db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// fetch('https://randomuser.me/api/?results=5')
//     .then(res => res.json())
//     .then(jsonData => {
//         const users = buildUser(jsonData.results);
//         console.log(typeof users);
//         console.log(users);
//         userModel.insertMany(users)
//         .then(() => console.log('Data inserted'))
//         .catch(error => console.log(error));
//     });

// User model 
// const User = mongoose.model('User', {
//     name: { type: String },
//     age: { type: Number }
// });

// User.insertMany([
//     { name: 'Gourav', age: 20 },
//     { name: 'Kartick', age: 20 },
//     { name: 'Niharika', age: 20 }
// ]).then(function () {
//     console.log("Data inserted")  // Success 
// }).catch(function (error) {
//     console.log(error)      // Failure 
// });

const findUsers = async () => {
    const data = await userModel.find();
    console.log(data);
}

// addUsers();
findUsers();

userModel.estimatedDocumentCount({}, function(err, count){
    console.log( "Number of docs: ", count );
});