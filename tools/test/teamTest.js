/**
 * created by eaTong at 2019/12/27
 */
const {addTeam, getTeams, joinTeam, quitTeam, getTeamDetail} = require("../../server/services/teamService");

(async () => {
  // const result = await addTeam({
  //   name: "random",
  //   description: "外部用户组",
  //   password: "123"
  // }, {id: 5});
  // const result = await getTeams({status: 0}, {id: 1, });
  const result = await getTeamDetail({id: 'd44e7556-f084-4574-9d28-9e0d1d78d5a2'}, {id: 1, });
  // const join = await joinTeam({teamId: 'f7bc8809-fca6-40da-b0e6-da34711e55fb', password: 2}, {id: 2});
  // const quit = await quitTeam({teamId: 'f7bc8809-fca6-40da-b0e6-da34711e55fb'}, {id: 2});
  console.log(JSON.parse(JSON.stringify(result)));
})();
