/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { LIST } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [LIST](state, payload) {
    state.productList = payload;
  },
};
