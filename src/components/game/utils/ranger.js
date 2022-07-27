/**
 * @description Create sequence generator to iterate
 * @param start
 * @param end
 * @returns {Generator<*, void, *>}
 */
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

export default range;
