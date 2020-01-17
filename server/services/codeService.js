const Code = require('../models/Code');

module.exports = {
  async generateCode(type) {
    const pad = '0000';
    const maxCode = await Code.findOne({where: {type}});
    let code, commit;
    if (maxCode) {
      code = maxCode.max + 1;
      await Code.update({max: maxCode.max + 1}, {where: {type}});
    } else {
      code = 1;
      Code.create({type, max: 1});
    }
    return `${type}_${code > 9999 ? code : `${pad.substring(0, pad.length - String(code).length)}${code}`}`
  }
};
