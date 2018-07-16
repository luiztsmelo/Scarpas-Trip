<template>
  <div class="login">

    <h1 class="__title">Acessar sua conta</h1>

    <div class="signin-btns">
      <button type="button" class="facebook-btn" @click="facebookSignIn()">Facebook</button>
      <button type="button" class="google-btn" @click="googleSignIn()">Google</button>
    </div>

  </div>
</template>

<script>
export default {
  transition: 'opacity',
  methods: {
    googleSignIn () {
      this.$store.dispatch('a_googleSignIn')
    },
    facebookSignIn () {
      this.$store.dispatch('a_facebookSignIn')
    }
  },
  computed: {
    userEmail () {
      return this.$store.state.user.email 
    }
  },
  watch: {
    userEmail (value) {
      if (value !== null) {
        let shortEmail = this.userEmail.substring(0, this.userEmail.indexOf("@"))
        return this.$router.push('/@' + shortEmail)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.user.email !== null) {
        vm.$router.push('/')
      }
    })
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.login {
  margin-top: 3.4rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  transition: var(--main-transition);
  & .__title {
    font-size: 31px;
    font-weight: 700;
    padding: 3rem 7% 1rem;
    text-align: center;
  }
  & .signin-btns {
    display: flex;
    flex-flow: column;
    padding: 2rem 7%;
    width: 100%;
  }
}
</style>