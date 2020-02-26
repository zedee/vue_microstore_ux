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
      <b-card no-body class="mb-1 d-none d-md-block">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle="'product-description-' + id" variant="info">Toggle description</b-button>
        </b-card-header>
        <b-collapse :id="'product-description-' + id" accordion="product-description" role="tabpanel">
          <b-card-body>
            <b-card-text>{{ description }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <div class="row mt-4">
          <div class="col-12 col-md-8 d-none d-md-flex align-items-center">
            <template v-if="stock > 0">
              <span>Stock: {{ stock }}</span>
            </template>
            <template v-else>
              <span class="badge badge-danger">Product out of stock</span>
            </template>
          </div>
          <div class="col-12 col-md-4 text-right">
            <button class="btn btn-info btn-block" :disabled="!(stock > 0)"
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
    name: 'ProductItem',
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
      description: {
        default: 'Description',
        type: String
      },
      stock: {
        default: 0,
        type: Number
      },
      favorite: {
        default: false,
        type: Boolean
      }
    },
    methods: {
      addProductToCart(productID) {
        const selectedProduct = _.find(this.$store.state.products.currentPageList, { 'id': productID });

        //Decrease Stock
        this.$store.dispatch('products/updateProductStock', {
          selectedProduct: selectedProduct,
          action: 'decrease'
        })
        .then(() => //As we cannot add a product from other page, iterate only on current one.
          this.$store.dispatch('cart/addProduct', selectedProduct))
        .catch();
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
