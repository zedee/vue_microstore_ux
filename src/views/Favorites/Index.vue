<template>
  <v-layout>
    <div>
      <div slot="header" class="d-flex flex-column flex-md-row align-items-center align-items-md-betweeen flex-wrap">
        <h1 class="mx-auto mx-md-0 mr-md-auto">Favorite list</h1>
        <product-paginator></product-paginator>
      </div>
      <div slot="body">
        <div class="row">
          <div class="col-6 col-xl-3 mb-4" v-for="product in favoriteList">
            <product-item :id="product.id"
                          :image_url="product.image_url"
                          :price="product.price"
                          :name="product.productName"
                          :description="product.productDescription"
                          :stock="product.stock"
                          :favorite="product.favorite == true"
            ></product-item>
          </div>
        </div>
        <div slot="shopping-cart">
          <aside>
            <shopping-cart></shopping-cart>
          </aside>
        </div>
      </div>
      <div slot="footer"></div>
    </div>
  </v-layout>
</template>

<script>
  /* ============
   * Favorites Index Page
   * ============
   *
   * The favorite products index page.
   */

  import VLayout from '@/layouts/Default.vue';
  import VCard from '@/components/Card.vue';
  import ProductItem from '@/components/ProductItem.vue';
  import ProductPaginator from '@/components/ProductPaginator.vue';
  import ShoppingCart from '@/components/ShoppingCart.vue';

  export default {
    /**
     * The name of the page.
     */
    name: 'FavoritesIndex',

    /**
     * The components that the page can use.
     */
    components: {
      ProductItem,
      ProductPaginator,
      ShoppingCart,
      VLayout,
      VCard,
    },
    data() {
      return {}
    },
    mounted() {
        this.$store.dispatch('products/favoriteList');
    },
    methods: {
      setPage(input) { console.log(input); }
    },
    computed: {
      favoriteList() { return this.$store.state.products.currentPageList },
    }
  };
</script>
