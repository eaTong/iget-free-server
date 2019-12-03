/**
 * Created by eaTong on 2018/11/22 .
 * Description:
 */

const fs = require('fs-extra');
const path = require('path');

let config = {
  mysql: {
    user: "fully",
    password: "fully@123",
    database: "fully",
    host: "127.0.0.1"
  },
  showAPI:{
    showapi_appid: '121674',showapi_sign: 'a752f59bab354efe89f5d71face7a03b'
  }
};

if (fs.existsSync(path.resolve(__dirname, 'server.config.production.js'))) {
  config = require("./server.config.production")
}


module.exports = config;
