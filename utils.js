export const setTimeoutAnimationFrame = function(fn, delay) {
  if (typeof window === 'undefined') {
    return setTimeout(fn, delay);
  }
  if (typeof requestAnimationFrame !== 'function') {
    return window.setTimeout(fn, delay);
  }

  var start = new Date().getTime(),
    handle = new Object();

  function loop() {
    var current = new Date().getTime(),
      delta = current - start;

    delta >= delay ? fn.call() : (handle.value = requestAnimationFrame(loop));
  }
  handle.value = requestAnimationFrame(loop);
  return handle;
};
