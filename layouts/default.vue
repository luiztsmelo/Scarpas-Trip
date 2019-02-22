<template>
  <div class="app">

    <div>

      <nuxt keep-alive/>
      
      <Navbar/>

      <no-ssr>
        <Foobar/>
        <SignIn/>
        <alert/>
        <Loader/>
        <Share/>
        <Menuu/>
        <MapFull/>
      </no-ssr>  

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
import Alert from '~/components/Alert'

export default {
  components: { Navbar, Foobar, SignIn, Menuu, Loader, Share, MapFull, Alert },
  async mounted () {
    this.$gmapApiPromiseLazy().then(() => { this.$store.state.markerSize = new google.maps.Size(42, 42) })
    if (process.browser) {
      /* Detect Device */
      isMobile.any ? this.$store.commit('m_isMobile', true) : this.$store.commit('m_isMobile', false)
      /* Desativate loader on refresh */
      if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        this.$store.commit('m_loader', false)
        this.$store.commit('hide_alert')
      }
      /* Get last hash. Back button purposes */
      window.addEventListener('hashchange', event => {
        this.$store.state.lastHash = this.$route.hash
      })
    }
  }
}
</script>

<style>
.app {
  display: flex;
  flex-flow: column;
}
</style>
