<template>
  <v-layout>
    <div class="container-fluid">
      <span slot="header"><h1>Product list</h1></span>
      <div slot="body"></div>
      <div slot="footer"></div>
    </div>
  </v-layout>
</template>

<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

  import VLayout from '@/layouts/Default.vue';
  import VCard from '@/components/Card.vue';

  export default {
    /**
     * The name of the page.
     */
    name: 'HomeIndex',

    /**
     * The components that the page can use.
     */
    components: {
      VLayout,
      VCard,
    },
  };
</script>
