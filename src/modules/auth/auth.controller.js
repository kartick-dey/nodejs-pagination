const Yup = require('yup');
const { 
    createUserInDB, 
    activateAccountInDB, 
    loginFromDB, 
    getEmailFromDB
} = require('./auth.service');


/**
 * It will trigger when /api/v1.0/create called
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
    const bodyParameter = req.body;

    // body validator object using Yup module.
    const bodySchema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });

    try {
        // Validating body parameter using Yup module.
        await bodySchema.validate(bodyParameter);
        // Calling createUserInDB() service function to create user in DB
        const user = await createUserInDB(bodyParameter);
        res.status(200).json({ 
            status: 'Register Successfully', 
            message: 'Email verification link is sent to your email',
            user: user
        });
    } catch (error) {
        res.status(400).json({ message: error.message });       
    }
};

/**
 * It will trigger when /api/v1.0/email-activate called
 * @param {*} req 
 * @param {*} res 
 */
const activateAccount = async (req, res) => {
    const { token } = req.body;

    // Calling activateAccountInDB() service function to activate the email and also modify the isverified record from DB
    activateAccountInDB(token, (error, result) => {
        if (error) {
            res.status(400).json({ message: error });
        }
        res.status(200).json({ 
            status: 'Account is activated', 
            message: 'Please login in',
            user: result
        });
    });
};

/**
 * It will trigger when /api/v1.0/login called
 * @param {*} req 
 * @param {*} res 
 */
const loginWithJwtToken = async (req, res) => {
    const bodyParam = req.body;

    // body validator object using Yup module.
    const bodySchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });

    try {
        // Validating body parameter using Yup module.
        await bodySchema.validate(bodyParam);
        // Calling loginFromDB() service function to create a jwt token
        loginFromDB(bodyParam, (error, jwtToken) => {
            if (error) {
                res.status(401).json({ message: error }); 
            }
            res.status(200).json({ 
                status: 'Successfully logged In',
                jwtToken: jwtToken
            });
        });
    } catch (error) {
        res.status(401).json({ message: error.message });       
    }
}

/**
 * It will trigger when /api/v1.0/get-email/:email called
 * @param {*} req 
 * @param {*} res 
 */
const getEmail = (req, res) => {

    const email = req.params.email;

    // Calling getEmailFromDB() service function to fetch email from DB
    getEmailFromDB(email, (error, emailFromDB) => {
        if (error) {
            res.status(200).json();
        }
        res.status(200).json(emailFromDB);
    });
}

module.exports = {
    createUser,
    activateAccount,
    loginWithJwtToken,
    getEmail
};