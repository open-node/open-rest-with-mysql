const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = (sequelize) => (
  _.extend(sequelize.define('user', {
    id: {
      type: Sequelize.type('integer.unsigned'),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.type('string', 30),
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
