/**
 * created by eaTong at 2019/12/2
 */
const {getBookMarksStatics} = require("../../server/services/bookMarkService");
(async () => {
  const result = await getBookMarksStatics({id: 1});
  console.log(result);
})();
