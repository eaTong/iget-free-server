/**
 * created by eaTong at 2019/12/3
 */
const {searchBook} = require("../../server/services/bookService");

(async () => {
  const result = await searchBook({keywords:'9787547251751'});
  console.log(result);
})();
