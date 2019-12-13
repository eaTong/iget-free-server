/**
 * created by eaTong at 2019/12/3
 */
const axios = require("axios");
const moment = require("moment");
const {transferImage} = require("./image");

function getBookByISDN(isbn) {
  return new Promise(async (resolve, reject) => {
    const result = await axios.get('https://cdn-free-api-api.agaege.com/open/book/msg.f', {
      params: {isbn}
    });
    if (result.status === 200) {
      if (result.data && result.data.code === 200) {
        const data = result.data.data.msg;
        const coverImage = await transferImage(data.image);
        const pubdate = /\d{4}-\d+$/.test(data.pubdate) ? `${data.pubdate}-01` : data.pubdate;
        resolve({
          publishTime: moment(pubdate).format('YYYY-MM-DD'),
          coverImage,
          author: data.author.join('、'),
          publisher: data.publisher,
          isbn13: data.isbn13,
          isbn10: data.isbn10,
          enable: true,
          name: data.title,
          subTitle: data.subtitle,
          letterCount: 0,
          pages: data.pages,
          summary: data.summary,
        });
      } else {
        reject('找不到指定的图书信息');
      }
    } else {
      reject('查询图书信息失败');
    }
  })
}

module.exports = {getBookByISDN};
