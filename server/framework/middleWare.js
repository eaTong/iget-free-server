/**
 * Created by eatong on 17-12-28.
 */
const {ArgMissError, LogicError} = require('./errors');
const logService = require('../services/logService');
const whiteList = ['/api/user/login', '/api/user/loginByCode', '/api/user/bind'];

module.exports.checkArguments = (args) => {
  return async (ctx, next) => {
    if (args) {
      const bodyKeys = Object.keys(ctx.request.body);
      if (typeof args === 'string') {
        if (bodyKeys.indexOf(args) === -1) {
          throw(new ArgMissError(args));
        }
      } else {
        for (let arg of args) {
          if (bodyKeys.indexOf(arg) === -1) {
            throw(new ArgMissError(arg));
          }
        }
      }
    }
    return next();
  }
};

module.exports.checkLogin = async (ctx, next) => {
  if (!/^\/api\/pub/.test(ctx.originalUrl) && whiteList.indexOf(ctx.originalUrl) === -1) {
    if (!ctx.session.loginUser) {
      ctx.status = 401;
      ctx.body = {success: false, data: {}, message: 'this api is not a shared api ,please login'};
      return;
    }
  }
  return next();
};

module.exports.structureData = async (ctx, next) => {
  try {
    const data = await next();
    ctx.body = {success: true, data, message: ''};
  } catch (ex) {
    const message = typeof ex === 'string' ? ex : ex.message;
    if (ex instanceof ArgMissError) {
      ctx.status = 400;
      ctx.body = {success: false, data: {}, message};
    } else if (ex instanceof LogicError) {
      ctx.status = 200;
      ctx.body = {success: false, data: {}, message};

    } else {
      ctx.status = 500;
      console.error(message, ex);
      ctx.body = {success: false, data: {}, message};
    }
  }
};

module.exports.insertLog = (type, dataResolve) => {
  return async (ctx, next) => {
    const operator = ctx.session.loginUser ? ctx.session.loginUser.id : 0,
      url = ctx.originalUrl,
      req = JSON.stringify(dataResolve ? dataResolve(ctx.request.body) : ctx.request.body);
    await logService.insertLog({operator, req, type, url});
    return next();
  }
};
