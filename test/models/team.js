const Sequelize = require('sequelize');
const _ = require('lodash');

module.exports = (sequelize) => (
  _.extend(sequelize.define('team', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [0, 30],
      },
    },
    ownerId: Sequelize.INTEGER.UNSIGNED,
  }), {
    includes: {
      owner: 'user',
      book: ['book', false],
    },
  })
);
