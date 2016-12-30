const model = require('./lib/model');
const getterHelper = require('open-rest-helper-getter');
const assertHelper = require('open-rest-helper-assert');
const restHelper = require('open-rest-helper-rest');
const paramHelper = require('open-rest-helper-params');
const mysql = require('mysql');
const Sequelize = require('sequelize');

module.exports = (rest, path, config, reset) => {
  /** 释放 sequelize 和 mysql 出去 */
  rest.Sequelize = Sequelize;
  rest.mysql = mysql;

  /**
   * model 的初始化
   * 将获取Model类的方法注册到 rest.utils 上
   */
  rest.utils.model = model(config, path, reset, rest);

  /** 插件的引入 */
  getterHelper(rest);
  assertHelper(rest);
  restHelper(rest);
  paramHelper(rest);

  return rest.utils.model;
};
