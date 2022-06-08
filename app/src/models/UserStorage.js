"use strict"

class UserStorage{
    static #users = {
        id : ["123"],
        psword : ["123"],
        name : ["개발자"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field]
                ;
            };
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;
