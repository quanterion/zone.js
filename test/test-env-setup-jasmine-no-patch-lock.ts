// test not patch fakeAsyncCase
if (typeof window !== 'undefined') {
  (window as any)['__zone_symbol__fakeAsyncPatchLock'] = false;
} else {
  (global as any)['__zone_symbol__fakeAsyncPatchLock'] = false;
}