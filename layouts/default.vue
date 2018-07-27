<template>
  <div class="app">

    <!-- Preload -->
    <img class="img" src="../assets/img/offline.svg" style="display:none">


    <div>
      <alert/>
      
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
import Alert from '~/components/Alert'

export default {
  components: { Navbar, Foobar, SignIn, Menuu, Loader, Share, MapFull, AskAcomod, Offline, Alert },
  beforeCreate () {
    /* Detect Device */
    isMobile.any ? this.$store.commit('m_isMobile', true) : this.$store.commit('m_isMobile', false)
    /* Desativate loader on refresh */
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      this.$store.commit('m_loader', false)
      this.$store.commit('hide_alert')
    }
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
    /* Get last hash. Back button purposes */
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
}
</style>
