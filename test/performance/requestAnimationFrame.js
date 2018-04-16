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
    title: 'requestAnimationFrame',
    testFn: function() {
      var nativeRequestAnimationFrame = _global['__zone_symbol__requestAnimationFrame'];
      var cancelAnimationFrame = _global['__zone_symbol__cancelAnimationFrame'];
      var count = 10000;
      var timerId = [];
      mark('nativeRequestAnimationFrame');
      for (var i = 0; i < count; i++) {
        timerId = nativeRequestAnimationFrame(function() {});
      }
      measure('nativeRequestAnimationFrame', 'nativeRequestAnimationFrame');
      mark('nativeCancelAnimationFrame');
      for (var i = 0; i < count; i++) {
        cancelAnimationFrame(timerId[i]);
      }
      measure('nativeCancelAnimationFrame', 'nativeCancelAnimationFrame');
      timerId = [];
      mark('requestAnimationFrame');
      for (var i = 0; i < count; i++) {
        timerId = requestAnimationFrame(function() {});
      }
      measure('requestAnimationFrame', 'requestAnimationFrame');
      mark('cancelAnimationFrame');
      for (var i = 0; i < count; i++) {
        cancelAnimationFrame(timerId[i]);
      }
      measure('cancelAnimationFrame', 'cancelAnimationFrame');

      var nativeRequestAnimationFrameMeasure = getEntriesByName('nativeRequestAnimationFrame')[1];
      var nativeCancelAnimationFrameMeasure = getEntriesByName('nativeCancelAnimationFrame')[1];
      var requestAnimationFrameMeasure = getEntriesByName('requestAnimationFrame')[1];
      var cancelAnimationFrameMeasure = getEntriesByName('cancelAnimationFrame')[1];
      var requestAnimationFrameSlowPercent = Math.floor(
          100 *
          (requestAnimationFrameMeasure.duration - nativeRequestAnimationFrameMeasure.duration) /
          nativeRequestAnimationFrameMeasure.duration);
      var cancelAnimationFrameSlowPercent = Math.floor(
          100 *
          (cancelAnimationFrameMeasure.duration - nativeCancelAnimationFrameMeasure.duration) /
          nativeCancelAnimationFrameMeasure.duration);
      return {
        displayText: `running ${count} times.
      - native requestAnimationFrame cost ${nativeRequestAnimationFrameMeasure
                         .duration} ms.        
      - native cancelAnimationFrame cost ${nativeCancelAnimationFrameMeasure
                         .duration} ms.
      - zone.js patched requestAnimationFrame cost ${requestAnimationFrameMeasure
                         .duration} ms.
      - zone.js patched cancelAnimationFrame cost ${cancelAnimationFrameMeasure.duration
                     } ms.
      # zone.js patched requestAnimationFrame is ${requestAnimationFrameSlowPercent
                     }% slower than native one.
      # zone.js patched cancelAnimationFrame is ${cancelAnimationFrameSlowPercent
                     }% slower than native one.
      `,
        rawData: {
          nativeRequestAnimationFrameMeasure,
          nativeCancelAnimationFrameMeasure,
          requestAnimationFrameMeasure,
          cancelAnimationFrameMeasure,
          requestAnimationFrameSlowPercent,
          cancelAnimationFrameSlowPercent
        },
        summary: {
          requestAnimationFrame: requestAnimationFrameSlowPercent,
          cancelAnimationFrame: cancelAnimationFrameSlowPercent
        }
      };
    }
  });
}(typeof window === 'undefined' ? global : window));