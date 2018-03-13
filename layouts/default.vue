<template>
  <div class="app">

    <Loader/>

    <Share/>

    <Menuu/>
    
    <Navbar/>
    <nuxt keep-alive/>
    <Foobar/>

    <MapFull/>

    <SignIn/>

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

export default {
  components: { Navbar, Foobar, SignIn, Menuu, Loader, Share, MapFull },
  mounted () {
    /* 
    DETECT SCROLL POSITION
    */
    window.addEventListener('scroll', event => {
      this.$store.state.scrollY = event.path[1].scrollY
    })
  },
  beforeCreate () {
    /* 
    DETECT DEVICE
    */
    if (isMobile.any) {
      this.$store.commit('m_isMobile', true)
    } else {
      this.$store.commit('m_isMobile', false)
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
