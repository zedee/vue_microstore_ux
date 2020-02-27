<template>
  <div class="row mb-1">
    <div class="col-3 col-md-4 d-flex align-items-center">
      <v-lazy-image class="img-fluid" :src="cartItem.image_url" :alt="cartItem.productName" />
    </div>
    <div class="col-6 col-md-5">
      <div class="d-flex flex-column justify-content-between h-100">
        <h1 class="h5 mb-0 product-name mt-auto mb-4"><strong>{{ cartItem.productName }}</strong></h1>
        <div class="quantity-selector mb-auto">
          <button class="btn btn-success" :disabled="disableAddMoreProducts"
                  @click="updateItemInCart( 'decrease')">
            <i class="fa fa-plus"></i>
            <span class="sr-only">Add item</span>
          </button>
          <span class="p-3 mb-2 bg-light text-dark mx-3">{{ cartItem.quantity }}</span>
          <button class="btn btn-danger"
                  @click="updateItemInCart( 'increase')">
            <i class="fa fa-minus"></i>
            <span class="sr-only">Remove item</span>
          </button>
        </div>
      </div>
    </div>
    <div class="col-3 d-flex align-items-center justify-content-end">
      <h2 class="h4 card-text d-lg-block text-left text-md-right product-price pr-md-3">{{ cartItem.price }} €</h2>
    </div>
    <hr class="w-100">
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
        disableAddMoreProducts: false
      }
    },
    props: {
      cartItem: {
        default: () => {
          return {
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
            productName: {
              default: 'Product Name',
              type: String
            },
            quantity: {
              default: 0,
              type: Number
            },
            stock: {
              default: 0,
              type: Number
            }
          }
        },
        type: Object
      }
    },
    methods: {
      updateItemInCart(action) {
        //Decrease Stock
        this.$store.dispatch('products/updateProductStock', {
          selectedProduct: this.cartItem,
          action: action
        })
        .then((result) => {
          if (action === 'decrease') {
            this.$store.dispatch('cart/addProduct', result)
          }
          else {
            this.$store.dispatch('cart/removeProduct', result)
          }
        })
        .catch(() => this.disableAddMoreProducts = true);
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
