/* ============
 * Mutations for the product module
 * ============
 *
 * The mutations that are available on the
 * product module.
 */

import { LIST } from './mutation-types';
import { SET_PAGE } from './mutation-types';
import { UPDATE_PRODUCT_STOCK } from './mutation-types';
import { REFRESH_PRODUCT_ACTIVE_PAGE } from "./mutation-types";

/* eslint-disable no-param-reassign */
export default {
  [LIST](state, payload) {
    state.productList = payload;
    //Get total pages
    state.totalPages = Math.ceil(payload.length / state.itemsPerPage);
    //Set initial page to zero
    state.currentPage = 0;
  },
  [SET_PAGE](state, selectedPage) {
    switch (selectedPage) {
      case 'next':
        if (state.currentPage + 1 <= state.totalPages) {
          state.currentPage = state.currentPage + 1;
        }
        break;
      case 'prev':
        if (state.currentPage > 0) {
          state.currentPage = state.currentPage - 1;
        }
        break;
      case Number.isInteger(selectedPage):
      default:
        if (selectedPage >= 0 && selectedPage <= state.totalPages) {
          state.currentPage = selectedPage;
        }
        break;
    }
  },
  [UPDATE_PRODUCT_STOCK](state, payload) {
    //Update product stock on main product list
    const productToUpdateIndex = _.findIndex(state.productList, { id: payload.selectedProduct.id });
    let productHasMoreStock = false;

    if (payload.action === 'increase') {
      state.productList[productToUpdateIndex].stock++;
      productHasMoreStock = true;
    }
    else {
      state.productList[productToUpdateIndex].stock--;
    }

    return productHasMoreStock;
  },
  [REFRESH_PRODUCT_ACTIVE_PAGE](state) {
    //Refresh currentPageList
    const sliceStartIndex = (state.currentPage) * state.itemsPerPage;
    const sliceEndIndex = ((state.currentPage) * state.itemsPerPage) + state.itemsPerPage;
    state.currentPageList = state.productList.slice(sliceStartIndex, sliceEndIndex);
  }
};
