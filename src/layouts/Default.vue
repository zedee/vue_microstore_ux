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
            :to="{ name: 'home.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">
              Home
            </a>
          </router-link>
          <router-link
            :to="{ name: 'account.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">
              Account
            </a>
          </router-link>
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
        </ul>
        <span class="navbar-text mr-3">
          <a
            class="btn btn-secondary"
            href="#"
            @click.prevent="showCart"
          >
            <i class="fa fa-shopping-cart"/>
            <template v-if="itemsInCart > 0">
              &nbsp; Products <span class="badge badge-light">{{ itemsInCart }}</span>
              <span class="sr-only"> products in cart</span>
            </template>
          </a>
        </span>
        <span class="navbar-text">
          <a
            class="btn btn-secondary"
            href="#"
            @click.prevent="logout"
          >
            <i class="fa fa-sign-out"/>
          </a>
        </span>
      </div>
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
      menuCollapsed: false,
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
      //TODO: Show cart template
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
