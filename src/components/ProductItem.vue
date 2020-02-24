<template>
  <div class="card">
    <v-lazy-image class="img-card-top" :src="image_url" :alt="name" />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text d-none d-lg-block">{{ description }}</p>
      <a href="#" class="btn btn-primary" :data-product-id="id">+ Add</a>
    </div>
  </div>
</template>

<script>
  export default {
    /**
     * The name of the component.
     */
    name: 'ProductItem',
    props: {
      id: {
        default: '0',
        type: String
      },
      image_url: {
        default: 'fallback_url',
        type: String
      },
      price: {
        default: '0',
        type: Number
      },
      name: {
        default: 'Product Name',
        type: String
      },
      description: {
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
  };
</script>

<style scoped>
  .img-card-top {
    max-height: 200px;
  }
</style>
