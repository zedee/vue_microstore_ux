/* ============
 * Mutations for the cart module
 * ============
 *
 * The mutations that are available on the
 * cart module.
 */

import { ADD_PRODUCT } from './mutation-types';
import { REMOVE_PRODUCT } from './mutation-types';
import { SET_PRODUCT_QUANTITY } from './mutation-types';
import { TOGGLE_CART_VISIBILITY } from './mutation-types';
import _ from 'lodash';

/* eslint-disable no-param-reassign */
export default {
  [ADD_PRODUCT](state, selectedProduct) {
    console.log('CART MODULE: product added', selectedProduct);

    //Push article into cart if we don't have any, otherwise increase item qty
    if (!_.some(state.cartContent, { id: selectedProduct.id } )) {
      state.cartContent.push({
        id: selectedProduct.id,
        name: selectedProduct.productName,
        image_url: selectedProduct.image_url,
        price: selectedProduct.price,
        quantity: 1
      });
    }
    else {
      const currentProductIndex = _.findIndex(state.cartContent, { id: selectedProduct.id });
      state.cartContent[currentProductIndex].quantity++;
    }
  },
  [REMOVE_PRODUCT](state, productID) {
    console.log('CART MODULE: product removed', productID);
  },
  [SET_PRODUCT_QUANTITY](state, quantity) {

  },
  [TOGGLE_CART_VISIBILITY](state) {
    state.isVisible = !state.isVisible;
  }
};
