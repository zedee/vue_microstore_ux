/* ============
 * Actions for the product module
 * ============
 *
 * The actions that are available on the
 * product module.
 */

import * as types from './mutation-types';
import ProductProxy from '../../../proxies/ProductProxy';
import _ from 'lodash';

export const addProduct = ({ commit }, payload) => {
  if (payload) {
    commit(types.ADD_PRODUCT, payload);
  }
  else {
    console.log('No product present to add to cart');
  }
};

export const removeProduct = ({ commit }) => {
  commit(types.REMOVE_PRODUCT);
};

export const setProductQuantity = ({ commit }) => {
  commit(types.SET_PRODUCT_QUANTITY);
};

export default {
  addProduct,
  removeProduct,
  setProductQuantity,
};
