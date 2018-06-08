<template>
  <modal
    name="sign-in-modal"
    class="sign-in-modal"
    width="36%"
    height="auto"
    @closed="closedModal">

    <img src="../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('sign-in-modal')">


    <!-- SIGN IN -->
    <div class="sign-in-up" v-if="$store.state.isSignIn === true">
      <div class="sign-in-body">
        <img class="__img" src="../static/brand.svg">

        <h1 class="__title">Acessar sua conta</h1>
        <h3 class="__subtitle">Acesse sua conta para acompanhar suas reservas ou gerenciar seus anúncios</h3>

        <button type="button" class="facebook-btn" @click="facebookSignIn()">Continuar com Facebook</button>
        <button type="button" class="google-btn" @click="googleSignIn()">Continuar com Google</button>
        <button type="button" class="email-btn" @click="emailSignIn()">Continuar com E-mail</button>

        <h3 class="if-have-account">Ainda não possui uma conta? <span class="underline" @click="$store.state.isSignIn = false">Cadastrar</span></h3>

        <nuxt-link to="#" class="terms-of-service">Termos de Serviço</nuxt-link>

      </div>
    </div><!-- SIGN IN -->



     <!-- SIGN UP -->
    <div class="sign-in-up" v-else>
      <div class="sign-in-body">
        <img class="__img" src="../static/brand.svg">

        <h1 class="__title">{{ $store.state.clickedAskAcomod === true || $store.state.clickedReservaAcomod === true ? 'Antes, você precisa se cadastrar' : 'Cadastrar' }}</h1>
        <h3 class="__subtitle">{{ $store.state.clickedAskAcomod === true || $store.state.clickedReservaAcomod === true ? '' : 'Cadastre-se para fazer reservas ou anunciar na Escarpas Trip' }}</h3>

        <button type="button" class="facebook-btn" @click="facebookSignIn()">Cadastrar com Facebook</button>
        <button type="button" class="google-btn" @click="googleSignIn()">Cadastrar com Google</button>
        <button type="button" class="email-btn" @click="emailSignIn()">Cadastrar com E-mail</button>

        <h3 class="if-have-account">Já possui uma conta? <span class="underline" @click="$store.state.isSignIn = true">Entrar</span></h3>
        
        <nuxt-link to="#" class="terms-of-service">Termos de Serviço</nuxt-link>

      </div>
    </div> <!-- SIGN UP -->
    

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
    closedModal () {
      this.$store.state.clickedReservaAcomod = false
      this.$store.state.clickedAskAcomod = false
      this.$store.state.isSignIn = true
    }
  },
  computed: {
    user () {
      return this.$store.state.user.email
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
      if (value !== null && this.$store.state.clickedReservaAcomod === true && this.$route.name === 'acomodacoes-id') {
        this.$modal.hide('sign-in-modal')
        this.$store.commit('m_isReservar', true)
        this.$router.push('/acomodacoes/reservar')
        this.$store.commit('m_showNavbar', false)
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
  & .sign-in-up {
    & .sign-in-body {
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 2.8rem 4rem 2.8rem 4rem;
      & .__img {
        width: 5.4rem;
        height: auto;
      }
      & .__title {
        font-size: 33px;
        text-align: center;
        padding: 1.3rem 0 .3rem 0;
      }
      & .__subtitle {
        font-size: 15px;
        text-align: center;
        padding: 0 0 1.1rem 0;
        line-height: 22px;
      }
      & .facebook-btn {
        width: 18rem;
        margin: .6rem 0;
        height: 2.9rem;
        text-align: start;
        padding-left: 50px;
      }
      & .google-btn {
        width: 18rem;
        margin: .6rem 0;
        height: 2.9rem;
        text-align: start;
        padding-left: 50px;
      }
      & .email-btn {
        width: 18rem;
        margin: .6rem 0;
        height: 2.9rem;
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
}
</style>