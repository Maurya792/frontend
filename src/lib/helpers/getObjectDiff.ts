import _ from "lodash";

/**
 * This code is licensed under the terms of the MIT license
 *
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function getObjectDiff<T extends Record<any, any>>(object: T, base: T): Partial<T> {
  function changes<C extends Record<any, any>>(object: C, base: C) {
    return _.transform<C, C>(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}
