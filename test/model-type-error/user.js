const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = (sequelize) => (
  _.extend(sequelize.define('user', {
    id: {
      type: Sequelize.type('hello.world'),
      primaryKey: true,
      autoIncrement: true,
    },
  }))
);
