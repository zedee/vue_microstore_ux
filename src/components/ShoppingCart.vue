<template>
  <div class="sidebar">
    <div class="cart-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
    <transition name="slide">
      <div v-if="isPanelOpen"
           class="cart-panel">
        <slot>
          <header class="d-flex justify-content-between align-items-center mb-5">
            <span class="h1 align-self-start mb-0 close-cart-action" @click="closeSidebarPanel">
              <i class="fa fa-chevron-left"></i>
            </span>
            <h1 class="mb-0 mx-auto">My Cart</h1>
          </header>
          <template v-if="cartItems.length">
            <main class="cart-product-items-container">
              <ul class="list-unstyled">
                <li v-for="cartItem in cartItems" :key="cartItem.id">
                  <ShoppingCartProductItem :cartItem="cartItem"></ShoppingCartProductItem>
                </li>
              </ul>
            </main>
          </template>
          <template v-else>
            <main class="h-75 d-flex align-items-center justify-content-center">
              <h1>Your cart is empty</h1>
            </main>
          </template>
          <footer class="mt-4">
            <div class="row">
              <div class="col-12">
                <h2 class="h4 text-right">
                  Total amount: <span class="cart-total-price">{{ cartTotalPrice }} €</span>
                </h2>
                <hr>
                <button v-if="cartItems.length"
                        class="btn btn-success btn-block py-3 mt-4 mb-1"
                        @click="checkout">
                  Checkout
                </button>
              </div>
            </div>
          </footer>
        </slot>
      </div>
    </transition>
  </div>
</template>
<script>
  import ShoppingCartProductItem from "./ShoppingCartProductItem";

  export default {
    name: 'ShoppingCart',
    components: {
      ShoppingCartProductItem
    },
    data() {
      return {
        isCartBusy: false
      }
    },
    methods: {
      closeSidebarPanel() {
        this.$store.dispatch('cart/toggleCartVisibility');
      },
      checkout() {
        this.isCartBusy = true;

        this.$store.dispatch('cart/checkout')
        .then(() => {
          //Reload product list so real stocks from server are updated
          this.$store.dispatch('products/list')
        })
        .catch((reason) => console.log(reason))
        .finally(() => {
          this.isCartBusy = false;
        });
      }
    },
    computed: {
      isPanelOpen() { return this.$store.state.cart.isVisible },
      cartItems() { return this.$store.state.cart.cartContent },
      cartTotalPrice() { return this.$store.getters['cart/itemsTotalSum'] },
    },
    watch: {

    }
  }
</script>

<style lang="scss" scoped>
  .slide-enter-active,
  .slide-leave-active
  {
    transition: transform 0.2s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(100%);
    transition: all 150ms ease-in 0s
  }

  .cart-backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 2000; //High to override sticky navbar z-index
  }

  .cart-panel {
    overflow-y: auto;
    background-color: #FFF;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 2005; //High to override sticky navbar z-index
    padding: 2rem 20px 2rem 20px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    box-shadow: -2px 0 12px 0px #454545;

    @media(min-width: 1024px) {
      width: 50vw;
    }

    @media(min-width: 1280px) {
      width: 40vw;
    }
  }

  .close-cart-action {
    cursor: pointer;
  }

  .cart-product-items-container {
    overflow-y: auto;
    overflow-x: hidden;
    height: 80vh;
  }

  .cart-total-price {
    color: indianred;
  }
</style>
