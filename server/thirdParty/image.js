/**
 * created by eaTong at 2019/12/3
 */
const axios = require("axios");
const fs = require('fs-extra');
const path = require('path');
const {v4} = require('uuid');
const OSS = require('ali-oss');

const config = require('../../config/server.config');

function transferImage(url) {
  return new Promise(async (resolve, reject) => {
    const response = await new axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    const fileName = v4() + '.jpg';
    const filePath = path.resolve(fileName);
    const writer = fs.createWriteStream(filePath);
    const client = new OSS(config.oss);

    response.data.pipe(writer);
    writer.on('finish', async () => {
      const uploadResult = await client.put(fileName, filePath);
      resolve(uploadResult.url);
      fs.remove(filePath);
    }).on('error', (a, b, c) => {
      reject();
    })
  })
}

module.exports = {transferImage};
