<template>
  <v-layout>
    <div class="container-fluid">
      <span slot="header"><h1>Product list</h1></span>
      <div slot="body">
        <div class="row row-cols-2 row-cols-md-4">
          <div class="col mb-4" v-for="product in productList">
            <product-item :id="product.id"
                          :image_url="product.image_url"
                          :price="product.price"
                          :name="product.productName"
                          :description="product.productDescription"
                          :stock="product.stock"
                          :favorite="product.favorite"
            ></product-item>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </div>
  </v-layout>
</template>

<script>
/* ============
 * Products Index Page
 * ============
 *
 * The products index page.
 */

  import VLayout from '@/layouts/Default.vue';
  import VCard from '@/components/Card.vue';
  import ProductItem from '@/components/ProductItem.vue';

  export default {
    /**
     * The name of the page.
     */
    name: 'ProductsIndex',

    /**
     * The components that the page can use.
     */
    components: {
      ProductItem,
      VLayout,
      VCard,
    },
    mounted() {
      this.$store.dispatch('products/list');
    },
    computed: {
      productList() { return this.$store.state.products.productList }
    }
  };
</script>
