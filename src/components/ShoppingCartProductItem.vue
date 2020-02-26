<template>
  <div class="card">
    <v-lazy-image class="img-fluid img-card-top" :src="image_url" :alt="name" />
    <div class="card-body">
      <div class="row my-md-3">
        <div class="col-12 col-md-9 d-flex align-items-center">
          <h1 class="h5 card-title mb-0 product-name"><strong>{{ name }}</strong></h1>
        </div>
        <div class="col-12 col-md-3 mt-3 my-md-0">
          <h2 class="h4 card-text d-lg-block text-left text-md-right product-price">{{ price }} €</h2>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 col-md-4 text-right">
          <button class="btn btn-info btn-block"
                  :data-product-id="id" @click="addProductToCart(id)">
            + Add
          </button>
        </div>
      </div>
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
        /*const selectedProduct = _.find(this.$store.state.products.currentPageList, { 'id': productID });

        //As we cannot add a product from other page, iterate only on current one.
        this.$store.dispatch('cart/addProduct', selectedProduct);

        //Decrease Stock
        this.$store.dispatch('products/updateProductStock', {
          selectedProduct: selectedProduct,
          action: 'decrease'
        });*/
      }
    },
    computed: {

    }
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
