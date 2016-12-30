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
    const server = rest({ routers, controllers, middleWares, service });
    restWithMysql(rest, `${__dirname}/models`, config.db);
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

      done();
    });
  });
});
