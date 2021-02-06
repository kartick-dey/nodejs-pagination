const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (error, conncetions) => {
    // check error
    if (error) {
        console.log('Error in DB connection: ', error);
    } else {
        console.log('DB connection successfull....');
    }
});