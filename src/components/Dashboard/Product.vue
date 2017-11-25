<template>
  <div class="product">
      <div class="product__image"></div>
      <div class="product__details">
        <div class="product__details-info">
          <div class="info__name">{{name}}</div>
          <div class="info__category">{{category}}</div>
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
import categories from '../../mixins/categories'

export default {
  name: 'Product',
  mixins: [categories],
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
    },
    category () {
      return this.getCategory(this.product.Category).description
    },
    image () {
      return this.product.ImagePath
    }
  }
}
</script>

<style>

.product {
  display: flex;
  align-self: stretch;
  border-radius: 25px;
  background-color: #E5E5E5;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  height: 200px;
}

.product__image {
  height: 100%;
  width: 200px;
}

.product__details-info {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.info__category, 
.info__name {
  text-transform: uppercase;
  text-align: left;
}

.info__name {
  font-size: 36px;
  color: #4C2E90;
}

.info__category {
  font-size: 18px;
  color: #BA3139;
}

</style>
