const { getUsersFromDB } = require('./user.service');

/**
 * It will trigger when /api/v1.0/user called
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {
    try {

        // Fetching users data from DB 
        const users = await getUsersFromDB();
        const page = parseInt(req.query.page);
        const results = parseInt(req.query.results);
        // Implementing paggiation logic
        const startIndex = (page - 1) * results;
        const endIndex = page * results;
        const dataResult = {};
        if (startIndex > 0) {
            dataResult.previous = {
                page: page - 1,
                results: results
            };
        }
        if (endIndex < users.length) {
            dataResult.next = {
                page: page + 1,
                results: results
            };
        }
        dataResult.totalPages = users.length / results;
        dataResult.results = users.slice(startIndex, endIndex);
        res.status(200).json(dataResult);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

module.exports = {
    getUsers
};