/**
 * created by eaTong at 2019/12/3
 */
const {getBookDetail} = require("../../server/services/bookService");

(async () => {
  const result = await getBookDetail({id: 6}, {id: 1});
  console.log(result);
})();
