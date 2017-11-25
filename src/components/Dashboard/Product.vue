<template>
  <div :class="productClasses">
      <div class="product__image" @click="clicked">
        <img v-if="!isSelected" src="" alt="">
      </div>
      <div class="product__details">
        <div class="product__details-info">
          <div v-if="!isSelected" class="info__name" @click="clicked">{{name}}</div>
          <input v-if="isSelected" 
            class="info__name"
            name="Name" 
            v-model="name"/>
          <div v-if="!isSelected" class="info__category" @click="clicked">{{category}}</div>
          <select v-if="isSelected" 
            class="info__category"
            name="Category" 
            v-model="this.product.Category">
            <option value="1">test</option>
          </select>
          <div class="info__tags">
            <i :class="genderIcon" :title="gender.description"></i>
            <i :class="ageRangeIcon" :title="ageRange.description"></i>
            <i :class="typeIcon" :title="type.description"></i>
          </div>
        </div>
      </div>
      <div class="product__stats"></div>
      <div class="product__buttons">
        <button v-if="isSelected" @click="submit" class="button button__delete">SAVE</button>
        <button type="button" class="button button__delete">DELETE</button>
      </div>
  </div>
</template>

<script>
import categories from '../../mixins/categories'
import genders from '../../mixins/genders'
import ageRanges from '../../mixins/ageRanges'
import types from '../../mixins/types'

export default {
  name: 'Product',
  mixins: [categories, genders, ageRanges, types],
  props: {
    product: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    productClasses () {
      let classes = 'product'
      if (this.isSelected) classes += ' product--selected'
      return classes
    },
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
    gender () {
      const genderId = this.product.Gender
      const gender = this.getGender(genderId)
      return gender
    },
    genderIcon () {
      const className = `tag tag__gender fa ${this.gender.icon}`
      return className
    },
    ageRange () {
      const ageRangeId = this.product.AgeRange
      const ageRange = this.getAgeRange(ageRangeId)
      return ageRange
    },
    ageRangeIcon () {
      const className = `tag tag__age fa ${this.ageRange.icon}`
      return className
    },
    type () {
      const typeId = this.product.Type
      const type = this.getType(typeId)
      return type
    },
    typeIcon () {
      const className = `tag tag__type fa ${this.type.icon}`
      return className
    },
    image () {
      return this.product.ImagePath
    }
  },
  methods: {
    clicked () {
      this.$emit('click')
    },
    submit () {
      
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

.product--selected {
  /* height: 100%; */
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
  background: transparent;
  border: none;
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
  padding-left: 0;
}

.info__tags {
  display: flex;
  margin-top: 5px;
}

.tag {
  align-self: flex-start;
  margin-right: 5px;
  font-size: 18px;
  background: linear-gradient(119.21deg, #BA3139, rgba(255, 255, 255, 0)), #4C2E90;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product__stats {
  width: 400px;
}

.product__buttons {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.button {
  cursor: pointer;
  align-self: flex-end;
  margin-right: 15px;
  margin-top: 5px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(119.21deg, #BA3139, rgba(255, 255, 255, 0)), #4C2E90;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  font-weight: lighter;
}

</style>
