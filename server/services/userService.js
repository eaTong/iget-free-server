/**
 * Created by eatong on 18-2-10.
 */
const md5 = require('crypto-js/md5');
const {Op} = require('sequelize');
const {LogicError} = require('../framework/errors');
const User = require('../models/User');

module.exports = {
  addUser: async (user) => {
    const usr = await User.findOne({where: {account: user.account}});
    if (usr) {
      throw new LogicError(`账号(${user.account})已存在`);
    }
    user.password = md5(user.password).toString();
    user.enable = true;
    return await User.create(user);
  },
  updateUsers: async (data) => {
    if (data.hasOwnProperty('account')) {
      const usr = await User.findOne({where: {account: data.account, id: {[Op.ne]: data.id}}});
      if (usr) {
        throw new LogicError(`账号(${data.account})已存在`);
      }
    }
    return await User.update(data, {where: {id: data.id}})
  },
  deleteUsers: async (ids) => {
    return await User.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },
  getUsers: async () => {
    return await User.findAll({attributes: ['id', 'name', 'account'], where: {enable: true}});
  },
  changePassword: async ({password, originPassword, id, uuid}, loginUser) => {
    const user = await User.findOne({
      where: {id, enable: true,}
    });
    if (user && user.dataValues.password && user.dataValues.password !== md5(originPassword).toString()) {
      throw new LogicError('原始密码错误');
    } else if (loginUser.uuid !== uuid) {
      throw new LogicError('当前用户未设置密码，且非本人操作，无法修改密码！');
    }
    user.password = md5(password).toString();
    return await user.save();
  },
  login: async ({account, password}) => {
    const user = await User.findOne({
      attributes: ['id', 'name', 'account', 'uuid'],
      where: {account, enable: true, password: md5(password).toString()}
    });
    return {...user.dataValues, hasPassword: true}
  },
  quickLogin: async ({uuid}) => {
    const user = await User.findOne({
      attributes: ['id', 'name', 'account', 'uuid'],
      where: {uuid, enable: true}
    });
    if (user) {
      return {...user.dataValues, hasPassword: true};
    }
    const newUser = {uuid, enable: true, name: `用户${uuid.slice(0, 7)}`};
    return await User.create(newUser);
  }
};


