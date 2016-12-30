const assert = require('assert');
const _ = require('lodash');
const rest = require('open-rest');
const { db } = require('./app/configs');
const model = require('../lib/model');

const { utils } = rest;

describe('lib/model', () => {
  describe('#init', () => {
    const errorLog = utils.logger.error;
    let getModel;
    utils.logger.error = () => {};

    it('model dir non-exists', (done) => {
      getModel = model(db, `${__dirname}/models-non-exists`, true, rest);
      assert.ok(true);

      done();
    });

    it('model dir exists', (done) => {
      getModel = model(db, `${__dirname}/models`, null, rest);

      assert.ok(true);
      done();
    });

    it('check model', (done) => {
      assert.ok(getModel('user'));
      assert.ok(getModel('team'));
      assert.ok(getModel('book'));

      assert.deepEqual(['book', 'team', 'user'], _.sortBy(_.keys(getModel())));

      done();
    });

    it('table-sync ENV is development', (done) => {
      const NODE_ENV = process.env.NODE_ENV;
      const infoLog = utils.logger.info;

      process.env.NODE_ENV = 'development';

      _.each(getModel(), (Model) => {
        Model.sync = () => (
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(Model.name);
            }, 10);
          })
        );
      });

      utils.logger.info = (synced, table) => {
        assert.equal('Synced', synced);
        assert.ok(_.includes(['book', 'team', 'user'], table));
      };

      process.argv.push('table-sync');

      model(db, `${__dirname}/models`, null, rest);

      utils.logger.info = infoLog;
      process.env.NODE_ENV = NODE_ENV;
      process.argv.pop();
      done();
    });

    it('table-sync ENV is development, exclude table-sync in argv', (done) => {
      const NODE_ENV = process.env.NODE_ENV;
      const infoLog = utils.logger.info;

      process.env.NODE_ENV = 'development';
      model(db, `${__dirname}/models`, null, rest);

      utils.logger.error = errorLog;
      utils.logger.info = infoLog;
      process.env.NODE_ENV = NODE_ENV;
      done();
    });
  });
});
