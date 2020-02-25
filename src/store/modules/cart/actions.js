/* ============
 * Actions for the product module
 * ============
 *
 * The actions that are available on the
 * product module.
 */

import * as types from './mutation-types';
import ProductProxy from '../../../proxies/ProductProxy';

export const addProduct = ({ commit }, payload) => {
  commit(types.ADD_PRODUCT, payload);
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
