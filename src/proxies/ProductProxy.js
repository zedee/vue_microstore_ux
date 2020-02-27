import Proxy from './Proxy';

class ProductProxy extends Proxy {
  /**
   * The constructor for the ProductProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('grocery', parameters);
  }

  /**
   * Method used to update an product.
   * Overriding the method 'update' on proxy will complain about datatype
   *
   * @param {string} productID The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  updateProduct(productID, item) {
    return this.submit('patch', `/${this.endpoint}/${productID}`, item);
  }
}

export default ProductProxy;
