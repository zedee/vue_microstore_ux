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

export const favoriteList = ({ commit }) => {
  new ProductProxy({ favorite: 1 })
    .all()
    .then((response) => {
      commit(types.FAVORITE_LIST, response);
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

export const updateProductFavorite = ({ commit, state }, selectedProduct) => {
  return new Promise((resolve, reject) => {
      const updateValueObject = {
        favorite: selectedProduct.favorite ? 0 : 1
      };

      new ProductProxy()
        .updateProduct(selectedProduct.id, updateValueObject)
        .then((response) => {
          commit(types.UPDATE_PRODUCT_DATA, response);
          commit(types.REFRESH_PRODUCT_ACTIVE_PAGE);
          resolve(response);
        })
        .catch(() => {
          reject('Request Failed');
        });
    });
};

export default {
  list,
  favoriteList,
  nextPage,
  prevPage,
  updateProductStock,
  updateProductFavorite,
};
