const importedData = require('../../random-user.json');

const pagination = (req, res, next) => {
    const users = importedData.users;
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
    req.users = dataResult;
    next();
};

module.exports = pagination;