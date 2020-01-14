/**
 * Created by eaTong on 2020-01-10 .
 * Description: auto generated in  2020-01-10
 */


const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Objective = require('../models/Objective');
const {generateCode} = require("./codeService");

module.exports = {
  addObjective: async (objective, loginUser) => {
    objective.enable = true;
    objective.publishUserId = loginUser.id;
    objective.responsibleUserId = ~~objective.responsibleUserId || loginUser.id;
    objective.pictures = JSON.stringify(objective.pictures);
    objective.code = await generateCode('objective');

    return Objective.create(objective);
  },

  updateObjectives: async (objective, loginUser) => {
    return Objective.update(objective, {where: {id: objective.id, userId: loginUser.id}})
  },

  deleteObjectives: async (ids, loginUser) => {
    return Objective.update({enable: false}, {where: {id: {[Op.in]: ids}, userId: loginUser.id}});
  },

  getObjectives: async ({pageIndex = 0, pageSize = 20, keywords = ''}, loginUser) => {
    const option = {where: {enable: true, userId: loginUser.id, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Objective.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Objective.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getObjectiveDetail: async ({id}, loginUser) => {
    return Objective.findOne({where: {id, userId: loginUser.id}});
  },
  getStructuredObjectiveDetail: async (id) => {
    const objective = await Objective.findOne({where: {id}});
    if (objective) {
      const allObjectives = await Objective.findAll({
        where: {code: {[Op.like]: `${objective.code}%`}},
        include: [
          {model: User, as: 'responsibleUser'},
          {model: User, as: 'publishUser'}
        ],
        order: [['code', 'DESC']]
      });
      return structureObjectiveTree(allObjectives)
    } else {
      throw new LogicError('ID 不合法或数据已被删除');
    }
  }
};

function structureObjectiveTree(myObjectives) {
  const objectiveMapping = {};
  myObjectives.forEach(item => {
    item = item.toJSON();
    item.pictures = item.pictures ? JSON.parse(item.pictures) : [];
    //如果mapping中有当前code为key的值，说明已经循环完当前的子项了，那么将所有子项的key删除，避免二次计算（code肯定是唯一的）
    if (objectiveMapping[item.code]) {
      item = {...item, children: objectiveMapping[item.code]};
    }
    const parentCode = item.code.slice(0, item.code.lastIndexOf('_'));
    //将当前节点push到父层节点上
    objectiveMapping[parentCode] = objectiveMapping[parentCode] || [];
    objectiveMapping[parentCode].push(item);
    delete objectiveMapping[item.code];

  });
  const myObjectivesTree = [];
  for (let key in objectiveMapping) {
    if (Object.keys(objectiveMapping[key])) {
      myObjectivesTree.push(...objectiveMapping[key])
    }
  }
  return myObjectivesTree;
}

