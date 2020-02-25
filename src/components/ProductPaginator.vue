<template>
  <nav aria-label="Product page navigation">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          {{ currentPage }} / {{ totalPages }}
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click="nextPage">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'ProductPaginator',
    methods: {
      nextPage() {
        this.$store.dispatch('products/nextPage');
      },
      prevPage() {
        this.$store.dispatch('products/prevPage');
      },
    },
    computed: {
      currentPage() { return this.$store.state.products.currentPage + 1 },
      totalPages() { return this.$store.state.products.totalPages },
      itemsPerPage() { return this.$store.state.products.totalPages },
    }
  }
</script>
