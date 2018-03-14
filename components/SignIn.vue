<template>
  <modal
    name="sign-in-modal"
    class="sign-in-modal"
    width="36%"
    height="auto">

    <img src="../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('sign-in-modal')" @closed="closedModal">

    <div class="sign-in-body">
      <img class="__img" src="../static/brand.svg">

      <h1 class="__title">{{ titleSignIn }}</h1>

      <button type="button" class="facebook-btn" @click="facebookSignIn()">Cadastrar com Facebook</button>
      <button type="button" class="google-btn" @click="googleSignIn()">Cadastrar com Google</button>
      <button type="button" class="email-btn" @click="emailSignIn()">Cadastrar com E-mail</button>

      <h3 class="if-have-account">Já possui uma conta? <span class="underline">Entrar</span></h3>
      

      <nuxt-link to="#" class="terms-of-service">Termos de Serviço</nuxt-link>

    </div>
    
  </modal>
</template>

<script>
export default {
  methods: {
    googleSignIn () {
      this.$store.dispatch('a_googleSignIn')
    },
    facebookSignIn () {
      this.$store.dispatch('a_facebookSignIn')
    },
    closedModal (event) {
      console.log(event)
      this.$store.state.clickedAskAcomod = false
    }
  },
  computed: {
    user () {
      return this.$store.state.user.email
    },
    titleSignIn () {
      return this.$store.state.clickedAskAcomod === true ? 'Antes, você precisa criar uma conta:' : 'Entrar'
    }
  },
  watch: {
    user (value) {
      if (value !== null) {
        this.$modal.hide('sign-in-modal')
      }
      if (value !== null && this.$store.state.clickedAskAcomod === true && this.$route.name === 'acomodacoes-id') {
        this.$modal.hide('sign-in-modal')
        this.$modal.show('ask-acomod-modal')
      }
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.sign-in-modal {
  z-index: 10000;

  & .close-btn {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1rem;
    height: auto;
  }

  & .sign-in-body {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 3rem;
    & .__img {
      width: 5.4rem;
      height: auto;
    }
    & .__title {
      font-size: 34px;
      text-align: center;
      padding: 1.3rem 0;
    }
    & .facebook-btn {
      width: 18rem;
      margin: .5rem 0;
      height: 3rem;
      text-align: start;
      padding-left: 50px;
    }
    & .google-btn {
      width: 18rem;
      margin: .5rem 0;
      height: 3rem;
      text-align: start;
      padding-left: 50px;
    }
    & .email-btn {
      width: 18rem;
      margin: .5rem 0;
      height: 3rem;
      text-align: start;
      padding-left: 50px;
    }
    & .if-have-account {
      padding-top: .6rem;
      font-size: 15px;
      & .underline {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    & .terms-of-service {
      padding-top: .8rem;
      text-decoration: underline;
      font-size: 15px;
    }
  }
}
</style>