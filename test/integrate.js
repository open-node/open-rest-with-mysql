const rest = require('open-rest');
const assert = require('assert');
const restWithMysql = require('../');
const config = require('./app/configs');
const routers = require('./app/routes');
const middleWares = require('./app/middle-wares');

const controllers = rest.utils.getModules(`${__dirname}/app/controllers`, 'js');
const service = {
  name: 'open-rest-with-mysql',
  version: '1.0.0',
};

describe('integrate', () => {
  describe('#inited', () => {
    const model = restWithMysql(rest, `${__dirname}/models`, config.db);
    const server = rest({ routers, controllers, middleWares, service });
    server.listen(8989, '127.0.0.1');

    it('helper init completed', (done) => {
      assert.ok(rest.helper.rest);
      assert.ok(rest.helper.getter);
      assert.ok(rest.helper.assert);
      assert.ok(rest.helper.params);

      assert.ok(rest.utils.model instanceof Function);
      assert.ok(rest.utils.model('team'));
      assert.ok(rest.utils.model('user'));
      assert.ok(rest.utils.model('book'));

      assert.ok(model('team'));
      assert.ok(model('user'));
      assert.ok(model('book'));

      assert.ok(rest.Sequelize);
      assert.ok(rest.mysql);
      assert.ok(restWithMysql.Sequelize);
      assert.ok(restWithMysql.mysql);

      done();
    });
  });

  describe('#model type error', () => {
    it('catch unexception', (done) => {
      assert.throws(() => {
        restWithMysql(rest, `${__dirname}/model-type-error`, config.db);
      }, (error) => (
        error instanceof Error && (
          error.message === 'Sequelize types non-exists: hello.world'
        )
      ));
      done();
    });
  });
});
