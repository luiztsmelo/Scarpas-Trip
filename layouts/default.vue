<template>
  <div class="app">

    <loader/>

    <share/>

    <menuu/>
    
    <navbar/>
    <nuxt keep-alive/>
    <foobar/>

    <map-full/>

  </div>
</template>

<script>
import isMobile from 'ismobilejs'
import Navbar from '~/components/Navbar.vue'
import Foobar from '~/components/Foobar.vue'
import Menuu from '~/components/Menu.vue'
import Loader from '~/components/Loader.vue'
import Share from '~/components/Share.vue'
import MapFull from '~/components/MapFull.vue'

export default {
  components: { Navbar, Foobar, Menuu, Loader, Share, MapFull },
  methods: {
    scrollY () {
      this.$store.state.scrollY = scrollY
    }
  },
  mounted () {
    /* 
    DETECT SCROLL POSITION
    */
    let lastScrollPosition = 0
    let ticking = false
    window.addEventListener('scroll', e => {
      lastScrollPosition = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.scrollY(lastScrollPosition)
          ticking = false
        })
        ticking = true
      }
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
