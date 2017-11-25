<template>
  <div class="product">
      <div class="product__image"></div>
      <div class="product__details">
        <div class="product__details-info">
          <div class="info__name">{{name}}</div>
          <div class="info__tags">
            <i class="tag tag__gender"></i>
            <i class="tag tag__age"></i>
            <i class="tag tag__type"></i>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    name () {
      return this.product.Name
    },
    description () {
      return this.product.Description
    },
    price () {
      return this.product.Price
    }
  }
}
</script>

<style>

</style>
