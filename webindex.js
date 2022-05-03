function createWebLib (execlib) {
  'use strict';
  
  var lib = execlib.lib,
    lR = execlib.execSuite.libRegistry,
    templateslib = lR.get('allex_templateslitelib'),
    htmltemplateslib = lR.get('allex_htmltemplateslib'),
    o = templateslib.override,
    m = htmltemplateslib;

  var mylib = {};

  require('./form')(lib, o, m, mylib);

  return mylib;
}
module.exports = createWebLib;