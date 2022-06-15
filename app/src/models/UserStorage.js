"use strict"

const fs = require("fs").promises;

class UserStorage{

    static #getUserInfo(data, id){
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userskeys = Object.keys(users);
        const userInfo = userskeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        },{});
        return userInfo;
        
    }

    static #getUsers(data, isAll, fields){
        const users = JSON.parse(data);
        if (isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field]
                ;
            };
            return newUsers;
        }, {});
        return newUsers;
    }
    
    static getUsers(isAll, ...fields) {
        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUsers(data, isAll, fields);
        })
        .catch((err) => console.error(err))
        
    }

    static getUserInfo(id){
        
        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUserInfo(data, id);
        })
        .catch((err) => console.error(err))
        
    }

    static async save(userInfo){
        const users = await this.getUsers(true);// 모든데이터를 받아올떄 true를 써서 isAll로 추가
        if (users.id.includes(userInfo.id)){
            throw "이미 존재하는 아이디입니다.";
        }
            // 데이터 추가
            users.id.push(userInfo.id);
            users.name.push(userInfo.name);
            users.psword.push(userInfo.psword);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return {success : true };
        
    }
}

module.exports = UserStorage;
