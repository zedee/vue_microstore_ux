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
                  <ShoppingCartProductItem
                    :id="cartItem.id"
                    :image_url="cartItem.image_url"
                    :price="cartItem.price"
                    :name="cartItem.name"
                    :quantity="cartItem.quantity"
                  ></ShoppingCartProductItem>
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
                  Total amount: <span>{{ cartTotalPrice }} €</span>
                </h2>
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
    methods: {
      closeSidebarPanel() {
        this.$store.dispatch('cart/toggleCartVisibility');
      }
    },
    computed: {
      isPanelOpen() { return this.$store.state.cart.isVisible },
      cartItems() { return this.$store.state.cart.cartContent },
      cartTotalPrice() { return this.$store.getters['cart/itemsTotalSum'] },
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
  }

  .cart-panel {
    overflow-y: auto;
    background-color: #ebebeb;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 999;
    padding: 2rem 20px 2rem 20px;
    width: 100vw;
    display: flex;
    flex-direction: column;

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
    max-height: 80vh;
  }
</style>
