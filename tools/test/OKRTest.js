/**
 * created by eaTong at 2019/12/27
 */
const {addObjective, addRecord} = require("../../server/services/ObjectiveService");

(async () => {
  // for (let i = 0; i < 40; i++) {
  //   const result = await addObjective({
  //     name: `test for ${i}`,
  //     description: "外部用户组",
  //   }, {id: 1});
  // }
  addRecord({objectiveId: '75ac9512-283a-4cef-94b4-78f6d66acdb3', title: '标题', content: '今天做了什么什么什么蛇么'}, {id: 1})
})();
