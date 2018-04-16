/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function(_global) {
  var allTasks = _global['__zone_symbol__performance_tasks'];
  var mark = _global['__zone_symbol__mark'];
  var measure = _global['__zone_symbol__measure'];
  var getEntriesByName = _global['__zone_symbol__getEntriesByName'];
  allTasks.push({
    title: 'timer',
    testFn: function() {
      var nativeSetTimeout = _global['__zone_symbol__setTimeout'];
      var nativeClearTimeout = _global['__zone_symbol__clearTimeout'];
      var count = 100000;
      var timerId = [];
      mark('nativeSetTimeout');
      for (var i = 0; i < count; i++) {
        timerId = nativeSetTimeout(function() {});
      }
      measure('nativeSetTimeout', 'nativeSetTimeout');
      mark('nativeClearTimeout');
      for (var i = 0; i < count; i++) {
        nativeClearTimeout(timerId[i]);
      }
      measure('nativeClearTimeout', 'nativeClearTimeout');
      timerId = [];
      mark('setTimeout');
      for (var i = 0; i < count; i++) {
        timerId = setTimeout(function() {});
      }
      measure('setTimeout', 'setTimeout');
      mark('clearTimeout');
      for (var i = 0; i < count; i++) {
        clearTimeout(timerId[i]);
      }
      measure('clearTimeout', 'clearTimeout');

      var nativeSetTimeoutMeasure = getEntriesByName('nativeSetTimeout')[1];
      var nativeClearTimeoutMeasure = getEntriesByName('nativeClearTimeout')[1];
      var setTimeoutMeasure = getEntriesByName('setTimeout')[1];
      var clearTimeoutMeasure = getEntriesByName('clearTimeout')[1];
      var setTimeoutSlowPercent = Math.floor(
          100 * (setTimeoutMeasure.duration - nativeSetTimeoutMeasure.duration) /
          nativeSetTimeoutMeasure.duration);
      var clearTimeoutSlowPercent = Math.floor(
          100 * (clearTimeoutMeasure.duration - nativeClearTimeoutMeasure.duration) /
          nativeClearTimeoutMeasure.duration);
      return {
        displayText: `running ${count} times.
      - native setTimeout cost ${nativeSetTimeoutMeasure
                         .duration} ms.        
      - native clearTimeout cost ${nativeClearTimeoutMeasure
                         .duration} ms.
      - zone.js patched setTimeout cost ${setTimeoutMeasure
                         .duration} ms.
      - zone.js patched clearTimeout cost ${clearTimeoutMeasure.duration} ms.
      # zone.js patched setTimeout is ${setTimeoutSlowPercent}% slower than native one.
      # zone.js patched clearTimeout is ${clearTimeoutSlowPercent}% slower than native one.
      `,
        rawData: {
          nativeSetTimeoutMeasure,
          nativeClearTimeoutMeasure,
          setTimeoutMeasure,
          clearTimeoutMeasure,
          setTimeoutSlowPercent,
          clearTimeoutSlowPercent
        },
        summary: {setTimeout: setTimeoutSlowPercent, clearTimeout: clearTimeoutSlowPercent}
      };
    }
  });
}(typeof window === 'undefined' ? global : window));