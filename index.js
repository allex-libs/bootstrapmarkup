function createLib (execlib) {
  'use strict';

  return execlib.loadDependencies(
    'client', 
    ['allex:templateslite:lib', 'allex:htmltemplates:lib'], 
    require('./webindex').bind(null, execlib)
  );
}
mmdule.exports = createLib;