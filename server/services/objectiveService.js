/**
 * Created by eaTong on 2020-01-10 .
 * Description: auto generated in  2020-01-10
 */


const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Objective = require('../models/Objective');
const User = require('../models/User');
const ObjectiveRecord = require('../models/ObjectiveRecord');
const {generateCode} = require("./codeService");

module.exports = {
  addObjective: async (objective, loginUser) => {
    objective.enable = true;
    objective.publishUserId = loginUser.id;
    objective.responsibleUserId = ~~objective.responsibleUserId || loginUser.id;
    objective.code = await generateCode('objective');

    return Objective.create(objective);
  },

  updateObjectives: async (objective, loginUser) => {
    return Objective.update(objective, {where: {id: objective.id}})
  },

  deleteObjectives: async (ids, loginUser) => {
    return Objective.update({enable: false}, {where: {id: {[Op.in]: ids}, userId: loginUser.id}});
  },

  getObjectives: async ({pageIndex = 0, pageSize = 20, keywords = '', publishStatus = -1, completeStatus = -1}, loginUser) => {
    const userCondition = [];
    if (publishStatus === '0') {
      userCondition.push({publishUserId: loginUser.id})
    } else if (publishStatus === '1') {
      userCondition.push({responsibleUserId: loginUser.id})
    } else {
      userCondition.push({publishUserId: loginUser.id}, {responsibleUserId: loginUser.id});
    }

    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}, [Op.or]: userCondition}};
    // 是否完成  0:未开始，1已开始未完成，2已完成，3 所有未完成
    if (completeStatus === '0') {
      option.where.progress = 0;
    } else if (completeStatus === '1') {
      option.where.progress = {[Op.between]: [1, 99]};
    } else if (completeStatus === '2') {
      option.where.progress = 100;
    } else if (completeStatus === '3') {
      option.where.progress = {[Op.lt]: 100};
    }
    const {dataValues: {total}} = await Objective.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']],

    });
    const list = await Objective.findAll({
      include: [
        {model: User, as: 'responsibleUser'},
        {model: User, as: 'publishUser'}
      ],
      order: [['createdAt', 'DESC']],
      offset: pageIndex * pageSize,
      limit: pageSize,
      ...option
    });
    return {total, list}
  },

  addRecord: async (record, loginUser) => {
    record.operatorUserId = loginUser.id;
    return ObjectiveRecord.create(record);
  },

  getObjectiveDetail: async ({id}, loginUser) => {
    const objective = await Objective.findOne({
      where: {id},
      include: [
        {model: User, as: 'responsibleUser', attributes: ['name', 'id']},
        {model: User, as: 'publishUser', attributes: ['name', 'id']}
      ],
    });
    if (objective) {
      const childrenObjectives = await Objective.findAll({
        where: {enable: true, parentObjectiveId: id},
        include: [
          {model: User, as: 'responsibleUser', attributes: ['name', 'id']},
          {model: User, as: 'publishUser', attributes: ['name', 'id']}
        ],
        order: [['progress', 'asc']]
      });
      const records = await ObjectiveRecord.findAll({
        where: {objectiveId: {[Op.in]: [...childrenObjectives.map(obj => obj.dataValues.id), id]}},
        include: [
          {model: User, as: 'operator', attributes: ['name', 'id']},
          {model: Objective, as: 'objective', attributes: ['name', 'id']}
        ]
      });
      return {...objective.dataValues, records, childrenObjectives}
    } else {
      throw new LogicError('ID 不合法或数据已被删除');
    }
  },
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

