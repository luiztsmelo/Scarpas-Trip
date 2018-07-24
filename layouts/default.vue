<template>
  <div class="app">


    <div class="alert-box" v-if="$store.state.error">
      <h3 class="__text" v-if="$store.state.reservaPageError">Reserva não encontrada.</h3>
      <h3 class="__text" v-if="$store.state.acomodPageError">A acomodação {{ this.$store.state.acomodRef }} não está listada.</h3>
      <img src="../assets/img/exit.svg" class="__close" @click="$store.dispatch('a_resetError')">
    </div>


    <!-- Preload -->
    <img class="img" src="../assets/img/offline.svg" style="display:none">


    <div>
      <Loader/>

      <Share/>

      <Menuu/>
      
      <Navbar/>
      <nuxt keep-alive/>
      <Foobar/>

      <MapFull/>

      <SignIn/>

      <AskAcomod/>

      <Offline/>
    </div>


  </div>
</template>

<script>
import isMobile from 'ismobilejs'

import Navbar from '~/components/Navbar.vue'
import Foobar from '~/components/Foobar.vue'
import SignIn from '~/components/SignIn.vue'
import Menuu from '~/components/Menu.vue'
import Loader from '~/components/Loader.vue'
import Share from '~/components/Share.vue'
import MapFull from '~/components/MapFull.vue'
import AskAcomod from '~/components/reserva-acomod/AskAcomod'
import Offline from '~/components/Offline'

export default {
  components: { Navbar, Foobar, SignIn, Menuu, Loader, Share, MapFull, AskAcomod, Offline },
  beforeCreate () {
    /* Detect Device */
    isMobile.any ? this.$store.commit('m_isMobile', true) : this.$store.commit('m_isMobile', false)
    /* Desativate loader on refresh */
    performance.navigation.type == performance.navigation.TYPE_RELOAD ? this.$store.commit('m_loader', false) : ''
    /* Check network status */
    window.addEventListener('offline', event => {
      this.$store.commit('m_isOnline', false)
      this.$modal.show('offline-modal')
    })
    window.addEventListener('online', event => {
      this.$store.commit('m_isOnline', true)
      location.reload()
      this.$modal.hide('offline-modal')
    })
    /* Get last hash. Mobile back button purposes */
    window.addEventListener('hashchange', event => {
      this.$store.state.lastHash = this.$route.hash
    })
  }
}
</script>

<style>
.app {
  display: flex;
  flex-flow: column;
  & .alert-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7%;
    position: fixed;
    left:0;
    top:0;
    z-index: 999999;
    height: 3rem;
    width: 100%;
    background: #EC407A;
    color: white;
    & .__text {
      text-align: center;
      font-size: 15px;
      font-weight: 500;
      width: 100%;
    }
    & .__close {
      cursor: pointer;
      width: .85rem;
      height: auto;
      filter: grayscale(100%) brightness(500%);
    }
  }
}
</style>
