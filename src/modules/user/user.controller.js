const { getUsersFromDB } = require('./user.service');

const getUsers = async (req, res) => {
    try {
        const users = await getUsersFromDB();
        const page = parseInt(req.query.page);
        const results = parseInt(req.query.results);
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
        dataResult.results = users.slice(startIndex, endIndex);
        res.status(200).json(dataResult);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

module.exports = {
    getUsers
};