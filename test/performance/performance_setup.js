/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function(_global) {
  var allTasks = _global['__zone_symbol__performance_tasks'];
  if (!allTasks) {
    allTasks = _global['__zone_symbol__performance_tasks'] = [];
  }
  _global['__zone_symbol__mark'] = function(name) {
    performance && performance['mark'] && performance['mark'](name);
  };
  _global['__zone_symbol__measure'] = function(name, label) {
    performance && performance['measure'] && performance['measure'](name, label);
  };
  _global['__zone_symbol__getEntries'] = function() {
    performance && performance['getEntries'] && performance['getEntries']();
  };
  _global['__zone_symbol__getEntriesByName'] = function(name) {
    return performance && performance['getEntriesByName'] && performance['getEntriesByName'](name);
  };
}(typeof window === 'undefined' ? global : window));