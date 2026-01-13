import { config } from "dotenv";
import { resolve } from "path";

config({path: resolve(__dirname,'../secrets/.env')});

module.exports = {
    validUser: {
        username: process.env.EMAIL,
        password: process.env.PASSWORD,
    },
    urls: {
        loginPage: process.env.BASE_URL + '/signin'
},
};