<template>
  <div class="row mb-3">
    <div class="col-4">
      <v-lazy-image class="img-fluid" :src="image_url" :alt="name" />
    </div>
    <div class="col-6">
      <div class="d-flex flex-column justify-content-between h-100">
        <h1 class="h5 mb-0 product-name mt-auto mb-4"><strong>{{ name }}</strong></h1>
        <div class="quantity-selector mb-auto">
          <button class="btn btn-light"
                  :data-product-id="id" @click="addProductToCart(id)">
            +
          </button>
          <span class="p-3 mb-2 bg-light text-dark mx-3">{{ quantity }}</span>
          <button class="btn btn-light"
                  :data-product-id="id" @click="addProductToCart(id)">
            -
          </button>
        </div>
      </div>
    </div>
    <div class="col-2 d-flex align-items-center">
      <h2 class="h4 card-text d-lg-block text-left text-md-right product-price">{{ price }} €</h2>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    /**
     * ProductItem component.
     */
    name: 'ShoppingCartProductItem',
    data() {
      return {
        moreProductsCanBeAdded: true
      }
    },
    props: {
      id: {
        default: '',
        type: String
      },
      image_url: {
        default: 'fallback_url',
        type: String
      },
      price: {
        default: 0.00,
        type: Number
      },
      name: {
        default: 'Product Name',
        type: String
      },
      quantity: {
        default: 0,
        type: Number
      },
    },
    methods: {
      addProductToCart(productID) {
        const selectedProduct = _.find(this.$store.state.products.currentPageList, { 'id': productID });

        //As we cannot add a product from other page, iterate only on current one.
        this.$store.dispatch('cart/addProduct', selectedProduct);

        //Decrease Stock
        this.$store.dispatch('products/updateProductStock', {
          selectedProduct: selectedProduct,
          action: 'decrease'
        })
        .then(() => this.moreProductsCanBeAdded = true)
        .catch(() => this.moreProductsCanBeAdded = false);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .card-body {
    padding: 0.5rem;

    @media (min-width: 720px) {
      padding: 1.25rem;
    }
  }

  .product-name {
    font-size: 1rem;

    @media (min-width: 720px) {
      font-size: 1.25rem;
    }
  }
  .product-price {
    font-size: 1rem;
    color: cornflowerblue;

    @media (min-width: 720px) {
      font-size: 1.45rem;
      color: black;
    }
  }
</style>
