async function toAsyncAwait(fn, defaultResult = null) {
  return fn
    .then((res) => [true, res])
    .catch((err) => [false, defaultResult || err])
}

export { toAsyncAwait }
