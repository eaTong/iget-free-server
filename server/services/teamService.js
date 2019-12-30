/**
 * Created by eaTong on 2019-12-27 .
 * Description: auto generated in  2019-12-27
 */


const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Team = require('../models/Team');
const User = require('../models/User');
const TeamUser = require('../models/TeamUser');

module.exports = {
  addTeam: async (team, loginUser) => {
    team.enable = true;
    team = await Team.create(team);
    await TeamUser.create({userId: loginUser.id, teamId: team.id, isOwner: true});
    return team;
  },

  updateTeams: async (team, loginUser) => {
    return await Team.update(team, {where: {id: team.id,}})
  },

  deleteTeams: async (ids, loginUser) => {
    return await Team.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },
  joinTeam: async ({teamId, password}, loginUser) => {
    const teamUser = await TeamUser.findOne({where: {userId: loginUser.id, teamId}});
    if (teamUser) {
      throw new LogicError('您已经加入该团队了。');
    }
    const team = await Team.findOne({where: {id: teamId}});
    if (!team) {
      throw new LogicError('糟糕，找不到这个团队。')
    }
    if (team.password && team.password !== password) {
      throw new LogicError('加入口令错误');
    }
    return await TeamUser.create({isOwner: 0, teamId, userId: loginUser.id})
  },
  quitTeam: async ({teamId}, loginUser) => {
    return await TeamUser.destroy({where: {teamId, userId: loginUser.id}});
  },
  inviteMember: async ({teamId}, loginUser) => {

  },
  deleteTeamMember: async ({teamId, userId}, loginUser) => {
    const team = await Team.findOne({where: {id: teamId}});
    if (!team) {
      throw new LogicError('该团队不存在，或已被解散');
    }
    const isTeamOwner = await TeamUser.findOne({where: {userId: loginUser, isOwner: true, teamId}});
    if (!isTeamOwner) {
      throw new LogicError('您不是该团队管理员，无法删除团队成员');
    }
    return await TeamUser.destroy({where: {teamId, userId}});
  },

  getTeams: async ({pageIndex = 0, pageSize = 20, keywords = ''}, loginUser) => {
    const option = {
      where: {enable: true, name: {[Op.like]: `%${keywords}%`}},
      include: [{model: User, where: {id: loginUser.id}}]
    };
    const {dataValues: {total}} = await Team.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']],
      group: Team.id
    });
    const list = await Team.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getTeamDetail: async ({id}, loginUser) => {
    return await Team.findOne({where: {id}});
  }
};
