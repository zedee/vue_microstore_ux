/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { ADD_PRODUCT } from './mutation-types';
import { REMOVE_PRODUCT } from './mutation-types';
import { SET_PRODUCT_QUANTITY } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [ADD_PRODUCT](state, productID) {
    console.log('CART MODULE: product added', productID);
  },
  [REMOVE_PRODUCT](state, productID) {
    console.log('CART MODULE: product removed', productID);
  },
  [SET_PRODUCT_QUANTITY](state, quantity) {

  }
};
