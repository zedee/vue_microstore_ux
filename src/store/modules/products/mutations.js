/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { LIST } from './mutation-types';
import { SET_PAGE } from './mutation-types';

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
    let sliceStartIndex = 0;
    let sliceEndIndex = 0;

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

    //Set First Page & Array index start and end
    sliceStartIndex = (state.currentPage) * state.itemsPerPage;
    sliceEndIndex = ((state.currentPage) * state.itemsPerPage) + state.itemsPerPage;
    state.currentPageList = state.productList.slice(sliceStartIndex, sliceEndIndex);
  }
};
