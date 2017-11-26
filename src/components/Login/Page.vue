<template>
  <div class="login">
      <div class="login__card">
          <h1>Sign In</h1>
          <form action="/api/account/login">
            <input class="login__username"
                name="username"
                placeholder="Username"
                type="text" />
            <input class="login__password"
                name="password"
                placeholder="Password"
                type="password" />
            <input class="login__submit"
                value="Sign In"
                type="button"
                @click="click" />
            <div class="login__fyp">Forgot your password?</div>
          </form>
      </div>
      <!-- <div class="login__back-card"></div> -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Hello'
    }
  },
  methods: {
    click () {
      this.$router.push('/Dashboard')
    }
  }
}
</script>

<style>

.login {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-image: url('../../assets/background.jpg');
    background-size: cover;
}

.login h1 {
    margin-top: 0;
    font-weight: lighter;
    text-align: left;
    padding-left: 25px;
    font-size: 48px;
}

.login input {
    display: block;
    border: 1px solid #D9D9D9;
    border-radius: 50px;
    padding: 15px 25px;
    margin-bottom: 20px;
    width: 100%;
    font-size: 36px;
    font-weight: lighter;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #E5E5E5;
}
::-moz-placeholder { /* Firefox 19+ */
    color: #E5E5E5;
}
:-ms-input-placeholder { /* IE 10+ */
    color: #E5E5E5;
}
:-moz-placeholder { /* Firefox 18- */
    color: #E5E5E5;
}

.login input[type="button"] {
    cursor: pointer;    
    background: linear-gradient(90deg, #BA3139 -41.14%, rgba(255, 255, 255, 0) 100%), #4C2E90;
    margin-top: 40px;
    margin-bottom: 10px;
    padding: 20px;
    color: white;
    font-size: 24px;
}

.login__card {
    border: none;
    align-self: center;
    background-color: white;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
    margin: 0 auto;
    padding: 80px 40px;
    width: 400px;
}

.login__fyp {
    cursor: pointer;
    padding-right: 25px;
    width: 100%;
    text-align: right;
    color: #D9D9D9;
    font-size: 14px;
}

.login__back-card {
    position: absolute;
    width: 600px;
    height: 400px;
    background-color: white;
    margin-top: calc(50vh - 400px);
}

</style>
