/**
 * created by eaTong at 2019/12/27
 */
const {addTeam, getTeams,joinTeam} = require("../../server/services/teamService");

(async () => {
  const result = await addTeam({name:'test team'}, {id: 1});
  // const result = await getTeams({}, {id: 1});
  const join = await joinTeam({teamId:'f7bc8809-fca6-40da-b0e6-da34711e55fb',password:2},{id:2})
  console.log(join);
})();
