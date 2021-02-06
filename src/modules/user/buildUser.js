const buildUser = (usersData) => {
    const users = [];
    usersData.map(user => {
        const userObj = {};
        userObj.name = user.name.title + ' ' + user.name.first + ' ' + user.name.last;
        userObj.email = user.email;
        userObj.dob = user.dob.date;
        userObj.phone = user.phone;
        userObj.gender = user.gender;
        userObj.picture = user.picture.thumbnail;
        userObj.address = user.location.street.number + ', ' + 
                          user.location.street.name + ', ' + 
                          user.location.city + ', ' + 
                          user.location.state + ', ' + 
                          user.location.country + ', ' + 
                          user.location.postcode;

        users.push(userObj);
    });
    return users

};

module.exports = buildUser;