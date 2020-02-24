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
}

export default ProductProxy;
