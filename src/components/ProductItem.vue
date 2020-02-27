<template>
  <div class="card product-card">
    <div :class="disabledProductCardLayer"></div>
    <span :class="'product-favorite h2 ' + isProductFavorite"
          @click="updateFavoriteStatus()">
      <i class="fa fa-heart"></i>
    </span>
    <v-lazy-image class="img-fluid img-card-top"
                  :src="product.image_url"
                  :alt="product.productName" />
    <div class="card-body">
      <div class="row my-md-3">
        <div class="col-12 col-md-9 col-lg-8 d-flex align-items-center">
          <h1 class="h5 card-title mb-0 product-name">
            <strong>{{ product.productName }}</strong>
          </h1>
        </div>
        <div class="col-12 col-md-3 col-lg-4 mt-3 my-md-0">
          <h2 class="h4 card-text d-lg-block text-left text-md-right product-price">
            {{ product.price }} €
          </h2>
        </div>
      </div>
      <b-card no-body class="mb-1 d-none d-md-block">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#"
                    v-b-toggle="'product-description-' + product.id"
                    variant="info">
            Toggle description
          </b-button>
        </b-card-header>
        <b-collapse :id="'product-description-' + product.id"
                    accordion="product-description"
                    role="tabpanel">
          <b-card-body>
            <b-card-text>{{ product.productDescription }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
      <div class="row mt-4">
        <div class="col-12 col-md-8 d-none d-md-flex align-items-center">
          <template v-if="product.stock > 0">
            <span :class="stockColorInfo">{{ product.stock }} left</span>
          </template>
          <template v-else>
            <span class="badge badge-dark">Product out of stock</span>
          </template>
        </div>
        <div class="col-12 col-md-4 text-right">
          <button class="btn btn-info btn-block"
                  :disabled="!(product.stock > 0)"
                  @click="addProductToCart()">
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
    data() {
      return {
        waitingForResponse: false
      }
    },
    props: {
      product: {
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
            productDescription: {
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
          }
        },
        type: Object
      },
    },
    methods: {
      addProductToCart() {
        //Decrease Stock
        this.$store.dispatch('products/updateProductStock', {
          selectedProduct: this.product,
          action: 'decrease'
        })
        .then(() => this.$store.dispatch('cart/addProduct', this.product))
        .catch((reason) => console.log(reason));
      },
      updateFavoriteStatus() {
        if (!this.waitingForResponse) {
          this.waitingForResponse = true;

          this.$store.dispatch('products/updateProductFavorite', this.product)
            .then()
            .catch((reason) => {
              console.log(reason);
            })
            .finally(() => {
              this.waitingForResponse = false;
            });
        }
      }
    },
    computed: {
      stockColorInfo() {
        let colorClass = 'text-dark';

        if (this.product.stock < 5 && this.product.stock > 2) {
          colorClass = 'badge badge-warning';
        }
        else if (this.product.stock <= 2 ) {
          colorClass = 'badge badge-danger';
        }

        return colorClass;
      },
      isProductFavorite() {
        return this.product.favorite ? 'text-danger' : 'text-light';
      },
      disabledProductCardLayer() {
        return this.waitingForResponse ? 'product-disabled' : '';
      }
    }
  };
</script>

<style lang="scss" scoped>
  .badge {
    font-size: 100%;
  }

  .card.product-card {
    box-shadow: 3px 3px 8px 0px #b5b5b5;
  }

  .card-body {
    padding: 0.5rem;

    @media (min-width: 720px) {
      padding: 1.25rem;
    }
  }

  .product-disabled {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7;
    background-color: #b5b5b5;
    z-index: 50;
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

  .product-favorite {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    z-index: 10;
  }
</style>
