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
    team.creator = loginUser.id;
    team.needPassword = !!team.password;
    team = await Team.create(team);
    await TeamUser.create({userId: loginUser.id, teamId: team.id, isOwner: true});
    return team;
  },

  updateTeams: async (team, loginUser) => {
    team.needPassword = !!team.password;
    return Team.update(team, {where: {id: team.id,}})
  },

  deleteTeams: async (ids, loginUser) => {
    return Team.update({enable: false}, {where: {id: {[Op.in]: ids}}});
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
    return TeamUser.create({isOwner: 0, teamId, userId: loginUser.id})
  },
  quitTeam: async ({teamId}, loginUser) => {
    return TeamUser.destroy({where: {teamId, userId: loginUser.id}});
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
    return TeamUser.destroy({where: {teamId, userId}});
  },

  getTeams: async ({pageIndex = 0, pageSize = 20, keywords = '', status = -1}, loginUser) => {

    const option = {
      where: {enable: true, name: {[Op.like]: `%${keywords}%`}},
      attributes: ['id', 'name', 'description', 'creator', 'needPassword'],
      include: [
        {model: User, where: {id: loginUser.id}, attributes: ['id', 'name', 'account']},
      ]
    };
    // status = 1 all I created
    if (status === 1) {
      option.where.creator = loginUser.id;
    }
    // status = 0 creator is not me
    if (status === 0) {
      option.where.creator = {[Op.not]: loginUser.id}
    }
    const totalValue = await Team.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']],
      group: Team.id
    });
    const list = await Team.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});

    return {
      total: totalValue ? totalValue.dataValues.total : 0,
      list: JSON.parse(JSON.stringify(list)).map(team => (
        {
          ...team,
          creator: team.users.find(user => user.id === team.creator),
          userCount: team.users.length,
          users: undefined
        }
      ))
    }
  },

  getTeamDetail: async ({id}, loginUser) => {
    const teamDetail = await Team.findOne({
      where: {id},
      attributes: ['id', 'name', 'description', 'creator', 'needPassword','creator'],
      include: [
        {model: User, attributes: ['id', 'name', 'account']},
      ]
    });
    const team = JSON.parse(JSON.stringify(teamDetail));
    return {...team, creator: team.users.find(user => user.id === team.creator)}
  }
};
