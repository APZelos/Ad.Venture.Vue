<template>
    <div class="dashboard">
        <div class="dashboard__row">
            <div class="dashboard__profile-pic">
                <img src="../../assets/profile.jpg" 
                    alt="profile-picture">
            </div>
        </div>

        <div class="dashboard__content dashboard__options">
            <div class="dashboard__order-by">
                <div class="order-by__label">order by</div>
                <select class="order-by__dropdown">
                    <option value="Name">NAME</option>
                    <option value="Price">PRICE</option>
                </select>
            </div>
            <button class="dashboard__add">ADD</button>
        </div>

        <div class="dashboard__content dashboard__products">
            <Product v-for="product in products"
                :key="product.Id"
                :product="product" />
        </div>
    </div>
</template>

<script>
import Product from './Product'
import 'font-awesome/css/font-awesome.css'

export default {
  name: 'Dashboard',
  components: {
    Product
  },
  data () {
    return {
      products: [{
        Id: 1,
        Name: 'NIKE JUVENATE',
        Description: '',
        Price: 200,
        Category: 1,
        Gender: 2,
        AgeRange: 1,
        Type: 1,
        ImagePath: ''
      }],
      orderBy: 'title',
      selectedProduct: 0
    }
  }
}
</script>

<style>

.dashboard {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(119.21deg, #BA3139 -34.38%, rgba(255, 255, 255, 0) 139.49%), #4C2E90;
}

.dashboard__row {
    align-self: stretch;
    display: flex;
    flex-direction: column;
}

.dashboard__profile-pic {
    align-self: flex-end;
    margin-top: 20px;
    margin-right: 100px;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    overflow: hidden;
}

.dashboard__profile-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.dashboard__content {
    align-self: center;
    width: 1070px;
}

.dashboard__options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 20px;
    color: white;
    padding: 0 10px;
}

.dashboard__add:active {
    background: white;
    color: black;
}

.dashboard__order-by {
    align-self: flex-start;
}

.order-by__label,
.order-by__dropdown {
    align-self: flex-start;
    display: inline;
}

.order-by__label {
    font-size: 14px;
}

.dashboard__add,
.order-by__dropdown {
    -webkit-appearance:none;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 25px;
    margin-left: 5px;
    padding: 5px 20px;
    color: white;
    font-size: 18px;
    font-weight: lighter;
}

.dashboard__add {
    cursor: pointer;
    align-self: flex-end;
    font-weight: lighter;
    padding-left: 30px;
    padding-right: 30px;
}

</style>
