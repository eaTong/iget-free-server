/**
 * created by eaTong at 2019/12/27
 */
const {addTeam, getTeams} = require("../../server/services/teamService");

(async () => {
  // const result = await addTeam({name:'test team'}, {id: 1});
  const result = await getTeams({}, {id: 1});
  console.log(result);
})();
