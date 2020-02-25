<template>
  <div class="card">
    <v-lazy-image class="img-fluid img-card-top" :src="image_url" :alt="name" />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text d-none d-lg-block"></p>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle="'product-description-' + id" variant="info">Toggle description</b-button>
        </b-card-header>
        <b-collapse :id="'product-description-' + id" accordion="product-description" role="tabpanel">
          <b-card-body>
            <b-card-text>{{ description }}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
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

  }
</style>
