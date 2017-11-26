<template>
  <div :class="productClasses">
      <div class="product__image" @click="clicked">
        <img  :src=image @click="onImageClick">
        <input v-show="isSelected" :id="'fileInput' + product.Id" class="image__input" type="file" @change="onFileChange">
      </div>
      <div class="product__details">
        <div class="product__details-info">
          <div v-if="!isSelected" class="info__name" @click="clicked">{{name}}</div>
          <input v-if="isSelected" 
            class="info__name"
            name="Name" 
            placeholder="name"
            v-model="name"/>
          <div v-if="!isSelected" class="info__category" @click="clicked">{{category}}</div>
          <select v-if="isSelected" 
            class="info__category"
            name="Category" 
            v-model="product.Category">
            <option value="-1">category</option>
            <option value="0">Tshirt</option>
            <option value="1">Shirt</option>
            <option value="2">Trousers</option>
            <option value="3">Hat</option>
            <option value="4">Tuxedo</option>
            <option value="5">Dress</option>
          </select>
          <div v-if="!isSelected" class="info__price" @click="clicked">{{price}}</div>
          <input v-if="isSelected" 
            class="info__price"
            type="number"
            name="Price" 
            placeholder="price"
            v-model="price"/>
          <div class="info__tags">
            <i v-if="product.Gender > -1" :class="genderIcon" :title="gender.description"></i>
            <i v-if="product.AgeRange > -1" :class="ageRangeIcon" :title="ageRange.description"></i>
            <i v-if="product.Type > -1" :class="typeIcon" :title="type.description"></i>
          </div>
        </div>
      </div>
      <div class="product__stats">
        <canvas v-show="product.Id > 0" v-chart id="myChart" width="100%" height="100%"></canvas>
      </div>
      <div class="product__buttons">
        <button v-if="isSelected" @click="submit" class="button button__delete">SAVE <i v-if="isLoading" class="loading fa fa-refresh fa-spin"></i></button>
        <button v-if="product.Id > 0" @click="deleteProduct" type="button" class="button button__delete">DELETE</button>
      </div>
  </div>
</template>

<script>
// import Views from './Views'
import categories from '../../mixins/categories'
import genders from '../../mixins/genders'
import ageRanges from '../../mixins/ageRanges'
import types from '../../mixins/types'
import Chart from 'chart.js'

export default {
  name: 'Product',
  // components: {
  //   Views
  // },
  mixins: [categories, genders, ageRanges, types],
  props: {
    product: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      chart: {},
      isLoading: false,
      uploadedSource: '',
      viewsData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      viewsOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  directives: {
    chart: {
      inserted: function (el) {
        let ctx = el.getContext('2d')
        ctx.height = 190
        var gradient = ctx.createLinearGradient(0, 0, 0, 188)
        gradient.addColorStop(0, '#4C2E90')
        gradient.addColorStop(1, '#E5E5E5')

        let chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
              radius: 0,
              backgroundColor: gradient,
              borderColor: '#4C2E90',
              data: [0, getRandomArbitrary(4, 13), getRandomArbitrary(2, 17), getRandomArbitrary(3, 14), getRandomArbitrary(0, 20), getRandomArbitrary(3, 18), getRandomArbitrary(10, 20)]
            }]
          },

          // Configuration options go here
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [{ gridLines: { display: false, drawBorder: false } }],
              yAxes: [{ gridLines: { display: false, drawBorder: false }, ticks: { display: false } }]
            },
            legend: { display: false, labels: { display: false } }
          }
        })
        this.chart = chart

        function getRandomArbitrary (min, max) {
          return Math.random() * (max - min) + min
        }
      }
    }
  },
  computed: {
    productClasses () {
      let classes = 'product'
      if (this.isSelected) classes += ' product--selected'
      return classes
    },
    name: {
      get () {
        return this.product.Name
      },
      set (value) {
        this.product.Name = value
      }
    },
    description: {
      get: () => this.product.Description,
      set (value) {
        this.product.Description = value
      }
    },
    price: {
      get () {
        return this.product.Price
      },
      set (value) {
        this.product.Price = value
      }
    },
    category: {
      get () {
        return this.getCategory(this.product.Category).description
      },
      set (value) {
        this.product.Category = value
      }
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
      var test = this.uploadedSource || this.product.ImagePath || '/Content/img//NoImageAvailable.png'
      return test
    }
  },
  methods: {
    clicked () {
      this.$emit('click')
    },
    deleteProduct () {
      let obj = {
        Id: this.product.Id
      }
      this.$http.post('/home/DeleteProduct', obj)
      .then((result) => {
        this.$emit('deleted', this.index)
      }, (err) => {
        console.log(err)
        this.$emit('deleted', this.index)
      })
    },
    submit () {
      this.isLoading = true
      this.$http.post('/home/AddProduct', this.product)
      .then((result) => {
        this.isLoading = false
        this.uploadedSource = ''
        this.$emit('unselected', result.body, this.index)
      }, (err) => {
        this.isLoading = false
        console.log(err)
        this.$emit('unselected', this.product, this.index)
      })
    },
    onImageClick () {
      document.getElementById('fileInput' + this.product.Id).click()
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      var reader = new FileReader()

      reader.onload = (e) => {
        this.uploadedSource = e.target.result
        this.product.ImageSrc = e.target.result
        this.product.ImagePath = e.target.fileName
      }
      reader.readAsDataURL(file)
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
  margin-bottom: 35px;
}

.product--selected {
  /* height: 100%; */
}

.product__image {
  height: 100%;
  width: 200px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
}

.product__image img {
  cursor: pointer;
  width: 200px;
  height: 200px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  object-fit: contain;
}

.image__input {
  display: none;
}

.product__details-info {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding-left: 5px;
}

.info__price,
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

.info__price,
.info__category {
  font-size: 18px;
  color: #BA3139;
  padding-left: 0;
}

.info__category {
  align-self: flex-start;
}

.info__tags {
  display: flex;
  margin-top: 5px;
}

.loading {
  font-size: 18px;
  background: linear-gradient(119.21deg, #BA3139, rgba(255, 255, 255, 0)), #4C2E90;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tag {
  align-self: flex-start;
  margin-right: 5px;
  font-size: 22px !important;
  background: linear-gradient(119.21deg, #BA3139, rgba(255, 255, 255, 0)), #4C2E90;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product__stats {
  width: 400px;
  padding-top: 38px;
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
