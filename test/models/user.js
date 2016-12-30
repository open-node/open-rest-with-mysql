const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = (sequelize) => (
  _.extend(sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      },
    },
    avatar: {
      type: Sequelize.STRING,
    },
  }), {
    includes: ['team'],
    searchCols: {
      name: {
        op: 'LIKE',
        match: ['{1}%', '%{1}'],
      },
      email: {
        op: 'LIKE',
        match: '%{1}%',
      },
    },
  })
);
