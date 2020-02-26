/* ============
 * Actions for the cart module
 * ============
 *
 * The actions that are available on the
 * cart module.
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

export const removeProduct = ({ commit }, payload) => {
  commit(types.REMOVE_PRODUCT, payload);
};

export const setProductQuantity = ({ commit }) => {
  commit(types.SET_PRODUCT_QUANTITY);
};

export const toggleCartVisibility = ({ commit }) => {
  commit(types.TOGGLE_CART_VISIBILITY);
};

export default {
  addProduct,
  removeProduct,
  setProductQuantity,
  toggleCartVisibility
};
