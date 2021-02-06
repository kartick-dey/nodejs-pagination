const AuthModel = require('./auth.model');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Helps to save user data into DB
 * @param user 
 * @returns user
 */
const createUserInDB = async (user) => {

    try {
        let userInDB = await AuthModel.findOne({ email: user.email });
        if (!userInDB) {
            // creating emailVerificationToken using jsonWebToken
            const emailVerifyToken = jwt.sign(user, process.env.JWT_ACC_ACTIVATE_KEY, { expiresIn: '1d' });

            // Sending Verification email using SendGrid
            const message = {
                from: 'kartick.dey1995@gmail.com',
                to: user.email,
                subject: 'Verify Your Email',
                html: `
                <h3>Hello ${user.firstName},</h3>
                <p>Thank you for registering our website</p>
                <p>Please click on given link or button to activate your account</p>
                <a href='${process.env.CLIENT_URL}/confirmemail?token=${emailVerifyToken}' style="color: blue">Click Here</a>
                <br/>
                <h4>Regards,</h4>
                <h4>Kartick Dey</h4>
                `
            };
            sgMail.send(message)
            .then(() => console.log("Verification email link send."))
            .catch(error => console.log("Error in sending email verification link: ", error));

            //hashing the pwd before saved to db
            const salt = await bcrypt.genSalt(10);
            const hashedPwd = await bcrypt.hash(user.password, salt);
            user.password = hashedPwd;
            const userInfo = await AuthModel.create(user);
            return userInfo;
        }
        await userInDB.save();
        return userInDB;
    } catch (error) {
        throw error;
    }
};

/**
 * Helps to activate user account and update the record ino DB
 * @param token 
 * @param callback 
 * @returns callback(error, user)
 */

const activateAccountInDB = async (token, callback) => {
    jwt.verify(token, process.env.JWT_ACC_ACTIVATE_KEY, async (error, decodedToken) => {

        if (!decodedToken) {
            return callback('Invaild link');
        }

        try {
            let userInDB = await AuthModel.findOne({ email: decodedToken.email });

            if (!userInDB) {
                // throw new Error('Invaild link');
                return callback('Invaild link');
            }
            userInDB.isVerified = true;

            await userInDB.save();
            return callback(null, userInDB);
        } catch (error) {
            return callback(error);
        }
    })
};

/**
 * Helps to check user exist in DB or not for login purpose
 * @param bodyParam
 * @param callback
 * @returns callback(error, jwtToken)
 */

const loginFromDB = async (bodyParam, callback) => {
    const user = await AuthModel.findOne({ email: bodyParam.email });
    if (!user) {
        return callback('Invalid Email!');
    }

    if (!user.isVerified) {
        return callback('Please verify your email. then try to login');
    }

    // Comparing the pwd
    const validPwd = bcrypt.compareSync(bodyParam.password, user.password);
    console.log('validPwd: ', validPwd);
    if (!validPwd) {
        return callback('Invalid Password!');
    }

    const jwtToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });

    return callback(null, jwtToken);
}



/**
 * Helps to save user data into DB
 * @param userId 
 * @param callback 
 * @returns callback(error, user)
 */
const getUserByIdFromDB = async (userId, callback) => {
    try {
        const user = await AuthModel.findById(userId);
        return callback(null, user);
    } catch (error) {
        return callback('USER_NOT_FOUND');
    }
};


/**
 * Helps to save user data into DB
 * @param callback 
 * @param email
 * @returns callback(error, email)
 */

const getEmailFromDB = async (email, callback) => {
    try {
        const user = await AuthModel.findOne({ email: email });
        return callback(null, user.email);
    } catch (error) {
        return callback("Somenthing went wrong!");
    }

}

module.exports = {
    createUserInDB,
    activateAccountInDB,
    loginFromDB,
    getUserByIdFromDB,
    getEmailFromDB
};