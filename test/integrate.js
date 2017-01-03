const rest = require('../../open-rest/');
const assert = require('assert');
const restWithMysql = require('../');

describe('integrate', () => {
  describe('#inited', () => {
    const model = restWithMysql(rest, `${__dirname}/app`);

    it('helper init completed', (done) => {
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
        restWithMysql(rest, `${__dirname}/model-type-error`);
      }, (error) => (
        error instanceof Error && (
          error.message === 'Sequelize types non-exists: hello.world'
        )
      ));
      done();
    });
  });
});
