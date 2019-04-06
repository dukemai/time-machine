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

    delta >= delay ? fn.call() : (handle.value = requestAnimFrame(loop));
  }
  console.log(requestAnimationFrame);
  handle.value = requestAnimFrame(loop);
  return handle;
};
