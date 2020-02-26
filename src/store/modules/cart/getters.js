/* ============
 * Getters for the cart module
 * ============
 *
 * The getters that are available on the
 * cart module.
 */

import _ from 'lodash';

export default {
  itemsInCart: (state) => state.cartContent.length,
  itemsTotalSum: (state) => _.sumBy(state.cartContent, (item) => item.price * item.quantity ),
};
