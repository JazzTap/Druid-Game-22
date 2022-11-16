// replace lodash methods with vanilla js ports, mostly from https://youmightnotneed.com/lodash/
export {has,constant,isFunction,keys,filter,isEmpty,each,isUndefined,union,reduce,isObject,map,toString};

const has = (obj, path) => {
    // Regex explained: https://regexr.com/58j0k
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  
    return !!pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj)
  }
  const constant = arg => () => arg
  const isFunction = val => typeof val === 'function'
  const keys = Object.keys
  const filter = (arr, f) => arr.filter(f)
  
  // cut down from lodash implementation
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if (// isArrayLike(value) &&
        (Array.isArray(value) || typeof value == 'string' || typeof value.splice == 'function')) {
          // || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
      return !value.length;
    }
    /* var tag = getTag(value);
    if (tag == mapTag || tag == setTag) {
      return !value.size;
    }
    if (isPrototype(value)) {
      return !baseKeys(value).length;
    } */
    for (var key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }
  
  const each = (arr, f) => arr.forEach(f)
  const isUndefined = val => val === undefined
  const union = (arr, ...args) => [...new Set(arr.concat(...args))]
  const reduce = (arr, f) => arr.reduce(f)
  const isObject = a => a instanceof Object
  const map = (arr, f) => arr.map(f)
  const toString = (arr) => arr.toString  // not really a workalike