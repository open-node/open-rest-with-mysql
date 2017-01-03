# Open-rest-with-mysql

MySQL & Sequlize as store, Base on open-rest

[![Build status](https://api.travis-ci.org/open-node/open-rest-with-mysql.svg?branch=master)](https://travis-ci.org/open-node/open-rest-with-mysql)
[![codecov](https://codecov.io/gh/open-node/open-rest-with-mysql/branch/master/graph/badge.svg)](https://codecov.io/gh/open-node/open-rest-with-mysql)

## Node version
<pre> >= 6 </pre>

## Open-rest version
<pre> >= 8</pre>


## Installation
```bash
npm install open-rest-with-mysql --save
```

## Usage
```js
const openRest  = require('open-rest');
const getter = require('open-rest-helper-getter');
const assert = require('open-rest-helper-assert');
const rest = require('open-rest-helper-rest');
const params = require('open-rest-helper-params');

openRest
 .plugin(U.openRestWithMysql)
 .plugin(getter, assert, rest, params)
 .start(`${__dirname}/app`, (error) => {
   if (error) {
     console.error(error);
     process.exit();
   }
   console.info(`Service started at: ${new Date()}`);
 });

```

