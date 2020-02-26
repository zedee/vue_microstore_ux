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
      commit(types.REFRESH_PRODUCT_ACTIVE_PAGE);
    })
    .catch(() => {
      console.log('Request Failed');
    });
};

export const nextPage = ({ commit }) => {
  commit(types.SET_PAGE, 'next');
  commit(types.REFRESH_PRODUCT_ACTIVE_PAGE);
};

export const prevPage = ({ commit }) => {
  commit(types.SET_PAGE, 'prev');
  commit(types.REFRESH_PRODUCT_ACTIVE_PAGE);
};

export const updateProductStock = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    const productToUpdateIndex = _.findIndex(state.productList, { id: payload.selectedProduct.id });

    console.log(state.productList[productToUpdateIndex].stock)

    if (state.productList[productToUpdateIndex].stock > 0 || payload.action === 'increase') {
      commit(types.UPDATE_PRODUCT_STOCK, payload);
      commit(types.REFRESH_PRODUCT_ACTIVE_PAGE);
      resolve()
    }
    else {
      reject('No more items on stock')
    }
  });
};

export default {
  list,
  nextPage,
  prevPage,
  updateProductStock
};
