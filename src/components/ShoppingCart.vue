<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
    <transition name="slide">
      <div v-if="isPanelOpen"
           class="sidebar-panel">
        <slot>
          <h1 class="mb-4">My Cart</h1>
          <template v-if="cartItems.length">
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
          </template>
          <template v-else>
            <h1>There're no items in your cart</h1>
          </template>
        </slot>
        <slot>
          <div class="row">
            <div class="col-12">
              Total: {{ cartTotalPrice }} €
            </div>
          </div>
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

<style>
  .slide-enter-active,
  .slide-leave-active
  {
    transition: transform 0.2s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
  }

  .sidebar-backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .sidebar-panel {
    overflow-y: auto;
    background-color: #ebebeb;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 2rem 20px 2rem 20px;
    width: 640px;
  }
</style>
