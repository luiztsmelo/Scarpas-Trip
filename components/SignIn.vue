<template>
  <modal
    name="sign-in-modal"
    class="sign-in-modal"
    :width="$store.state.isMobile ? '100%' : '32%'"
    :height="$store.state.isMobile ? '100%' : 'auto'"
    @closed="closedModal">

    <img src="../assets/img/close-modal.svg" class="close-btn" @click="$modal.hide('sign-in-modal')">


    <!-- SIGN IN -->
    <div class="sign-in-up" v-if="$store.state.isSignIn">
      <div class="sign-in-body">
        <img class="__img" src="../static/brand.svg">

        <h1 class="__title">Acessar sua conta</h1>
        <h3 class="__subtitle">Acesse sua conta para acompanhar suas reservas ou gerenciar seus anúncios</h3>

        <button type="button" class="facebook-btn" @click="$store.dispatch('a_facebookSignIn')">Continuar com Facebook</button>
        <button type="button" class="google-btn" @click="$store.dispatch('a_googleSignIn')">Continuar com Google</button>
        
        
        <h3 class="if-have-account">Não possui uma conta? <span class="underline" @click="$store.state.isSignIn = false">Cadastrar</span></h3>

        <div class="terms-of-service" @click="$modal.hide('sign-in-modal')">
          <nuxt-link to="/termos">Termos de Serviço</nuxt-link>
          <h3 @click.stop>&nbsp|&nbsp</h3>
          <nuxt-link to="/termos#politica_privacidade">Política de Privacidade</nuxt-link>
        </div>

      </div>
    </div><!-- SIGN IN -->



     <!-- SIGN UP -->
    <div class="sign-in-up" v-else>
      <div class="sign-in-body">
        <img class="__img" src="../static/brand.svg">

        <h1 class="__title">Cadastrar</h1>
        <h3 class="__subtitle"></h3>

        <button type="button" class="facebook-btn" @click="$store.dispatch('a_facebookSignIn')">Cadastrar com Facebook</button>
        <button type="button" class="google-btn" @click="$store.dispatch('a_googleSignIn')">Cadastrar com Google</button>
        

        <h3 class="if-have-account">Já possui uma conta? <span class="underline" @click="$store.state.isSignIn = true">Entrar</span></h3>
        
        <div class="terms-of-service" @click="$modal.hide('sign-in-modal')">
          <nuxt-link to="/termos">Termos de Serviço</nuxt-link>
          <h3 @click.stop>&nbsp|&nbsp</h3>
          <nuxt-link to="/termos#politica_privacidade">Política de Privacidade</nuxt-link>
        </div>

      </div>
    </div> <!-- SIGN UP -->
    

  </modal>
</template>

<script>

export default {
  methods: {
    closedModal () {
      this.$store.state.isSignIn = true
    }
  },
  computed: {
    authUser () { return this.$store.state.authUser }
  },
  watch: {
    authUser (status) {
      status === true ? this.$modal.hide('sign-in-modal') : ''
    }
  }
}
</script>

<style>

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
      padding: 3.6rem 4rem;
      & .__img {
        width: 54px;
        height: auto;
      }
      & .__title {
        font-size: 31px;
        text-align: center;
        padding: .7rem 0 .3rem 0;
      }
      & .__subtitle {
        font-size: 15px;
        text-align: center;
        padding: 0 0 1.3rem 0;
        line-height: 22px;
      }
      & .facebook-btn {
        width: 15.6rem;
        margin: .6rem 0;
        height: 3rem;
        text-align: start;
        padding-left: 50px;
      }
      & .google-btn {
        width: 15.6rem;
        margin: .6rem 0;
        height: 3rem;
        text-align: start;
        padding-left: 50px;
      }
      & .if-have-account {
        text-align: center;
        padding-top: 1.1rem;
        font-size: 15px;
        user-select: none;
        & .underline {
          cursor: pointer;
        }
        & .underline:hover {
          text-decoration: underline;
        }
      }
      & .terms-of-service {
        display: flex;
        align-items: center;
        padding-top: .8rem;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        user-select: none;
        & a:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .sign-in-modal {
    & .sign-in-up {
      & .sign-in-body {
        padding: 4rem 7%;
      }
    }
  }
}
</style>