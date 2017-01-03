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
      getModel = model(db, `${__dirname}/models-non-exists`, rest);
      assert.ok(getModel instanceof Function);

      done();
    });

    it('model dir exists', (done) => {
      getModel = model(db, `${__dirname}/app`, rest);

      assert.ok(getModel instanceof Function);
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

      model(db, `${__dirname}/app`, rest);

      utils.logger.info = infoLog;
      process.env.NODE_ENV = NODE_ENV;
      process.argv.pop();
      done();
    });

    it('table-sync ENV is development, exclude table-sync in argv', (done) => {
      const NODE_ENV = process.env.NODE_ENV;
      const infoLog = utils.logger.info;

      process.env.NODE_ENV = 'development';
      model(db, `${__dirname}/app`, rest);

      utils.logger.info = infoLog;
      process.env.NODE_ENV = NODE_ENV;
      done();
    });

    it('db is null', (done) => {
      getModel = model(null, `${__dirname}/app`, rest);
      assert.ok(getModel instanceof Function);
      assert.deepEqual({}, getModel());
      done();
    });

    it('reset ENV isnt production', (done) => {
      getModel = model({}, `${__dirname}/app`, rest);
      assert.ok(getModel.reset instanceof Function);
      assert.equal(3, _.keys(getModel()).length);

      getModel.reset();
      assert.equal(0, _.keys(getModel()).length);

      done();
    });

    it('reset ENV is production', (done) => {
      rest.utils.isProd = true;
      getModel.reset();
      getModel = model({}, `${__dirname}/app`, rest);
      assert.equal(null, getModel.reset);
      assert.equal(3, _.keys(getModel()).length);

      done();
    });

    it('model path is null', (done) => {
      utils.logger.error = () => {};
      getModel = model({}, null, rest);
      assert.ok(getModel instanceof Function);
      assert.deepEqual({}, getModel());
      utils.logger.error = errorLog;
      done();
    });
  });
});
