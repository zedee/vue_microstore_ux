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
import { RESET } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [ADD_PRODUCT](state, selectedProduct) {
    //Push article into cart if we don't have any, otherwise increase item qty
    if (!_.some(state.cartContent, { id: selectedProduct.id } )) {
      selectedProduct.quantity = 1;
      state.cartContent.push(selectedProduct);
    }
    else {
      const currentProductIndex = _.findIndex(state.cartContent, { id: selectedProduct.id });
      //Force reactivity
      let updateObject = Object.assign({},  state.cartContent[currentProductIndex], {
        quantity: state.cartContent[currentProductIndex].quantity + 1 }
        );
      state.cartContent.splice(currentProductIndex, 1, updateObject);
    }
  },
  [REMOVE_PRODUCT](state, selectedProduct) {
    const currentProductIndex = _.findIndex(state.cartContent, { id: selectedProduct.id });
    //Force reactivity
    let updateObject = Object.assign({},  state.cartContent[currentProductIndex], {
      quantity: state.cartContent[currentProductIndex].quantity - 1 }
    );
    state.cartContent.splice(currentProductIndex, 1, updateObject);

    if (state.cartContent[currentProductIndex].quantity === 0) {
      state.cartContent.splice(currentProductIndex, 1);
    }
  },
  [SET_PRODUCT_QUANTITY](state, quantity) {

  },
  [TOGGLE_CART_VISIBILITY](state) {
    state.isVisible = !state.isVisible;
  },
  [RESET](state) {
    state.cartContent = [];
  }
};
