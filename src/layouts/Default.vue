<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link
        :to="{ name: 'home.index' }"
        class="navbar-brand"
      >
        Microstore Demo
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
      >
        <span class="navbar-toggler-icon"/>
      </button>

      <div
        :class="{ show : menuCollapsed}"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav mr-auto">
          <router-link
            :to="{ name: 'products.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">
              Products
            </a>
          </router-link>
          <router-link
            :to="{ name: 'favorites.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">
              Favorites
            </a>
          </router-link>
        </ul>
      </div>
    </nav>

    <nav class="action-buttons-bar navbar sticky-top d-flex justify-content-center justify-content-md-end py-3">
      <ul class="list-unstyled list-inline mb-0">
        <li class="list-inline-item">
            <a
              class="btn btn-secondary"
              href="#"
              title="My Cart"
              @click.prevent="showCart"
            >
              <i class="fa fa-shopping-cart"/>
              <template v-if="itemsInCart > 0">
                &nbsp; Products <span class="badge badge-light">{{ itemsInCart }}</span>
                <span class="sr-only"> products in cart</span>
              </template>
            </a>
        </li>
        <!-- Disable logout button as is not needed in this project
        <li class="list-inline-item">
          <span class="navbar-text">
            <a
              class="btn btn-secondary"
              href="#"
              @click.prevent="logout"
            >
              <i class="fa fa-sign-out"/>
            </a>
          </span>
        </li>
        -->
      </ul>
    </nav>

    <div class="container-fluid pt-4">
      <div class="row">
        <div class="col col-12">
          <!-- Content will be placed here -->
          <slot/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/* ============
 * Default Layout
 * ============
 *
 * Used for the home and account pages.
 *
 * Layouts are used to store a lot of shared code.
 * This way the app stays clean.
 */

export default {
  /**
   * The name of the layout.
   */
  name: 'DefaultLayout',

  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      menuCollapsed: false
    };
  },

  /**
   * The methods that the layout can use.
   */
  methods: {
    /**
     * Will log the user out.
     */
    logout() {
      this.$store.dispatch('auth/logout');
    },
    showCart() {
      this.$store.dispatch('cart/toggleCartVisibility');
    },

    /**
     * Will toggle the menu.
     */
    toggleMenu() {
      this.menuCollapsed = !this.menuCollapsed;
    },
  },
  computed: {
    itemsInCart() { return this.$store.getters['cart/itemsInCart'] }
  }
};
</script>

<style>
  .action-buttons-bar {
    background-color: white;
    box-shadow: 0px 1px 6px 1px #676767;
  }
</style>
