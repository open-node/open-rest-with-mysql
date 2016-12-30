# Open-rest-with-mysql

MySQL & Sequlize as store, Base on open-rest

[![Build status](https://api.travis-ci.org/open-node/open-rest-with-mysql.svg?branch=master)](https://travis-ci.org/open-node/open-rest-with-mysql)
[![codecov](https://codecov.io/gh/open-node/open-rest-with-mysql/branch/master/graph/badge.svg)](https://codecov.io/gh/open-node/open-rest-with-mysql)

## Node version
<pre> >= 6 </pre>

## Open-rest version
<pre> ~8</pre>


## Installation
```bash
npm install open-rest-with-mysql --save
```

## Usage
```js
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

const server = rest({ routers, controllers, middleWares, service });
restWithMysql(rest, `${__dirname}/models`, config.db);
server.listen(8989, '127.0.0.1');
```

