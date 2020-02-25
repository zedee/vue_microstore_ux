/* ============
 * Actions for the product module
 * ============
 *
 * The actions that are available on the
 * product module.
 */

import * as types from './mutation-types';
import ProductProxy from '../../../proxies/ProductProxy';

export const list = ({ commit }) => {
  new ProductProxy()
    .all()
    .then((response) => {
      commit(types.LIST, response);
      commit(types.SET_PAGE, 0);
    })
    .catch(() => {
      console.log('Request Failed');
    });
};

export const nextPage = ({ commit }) => {
  commit(types.SET_PAGE, 'next');
};

export const prevPage = ({ commit }) => {
  commit(types.SET_PAGE, 'prev');
};

export const updateProductStock = ({ commit }, payload) => {
  commit(types.UPDATE_PRODUCT_STOCK, payload);
}

export default {
  list,
  nextPage,
  prevPage,
  updateProductStock
};
