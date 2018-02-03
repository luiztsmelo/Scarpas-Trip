<template>
  <div class="app">

    <loader/>

    <share/>

    <menuu/>
    
    <navbar/>
    <nuxt keep-alive/>
    <foobar/>

    <map-full/>

    <proprietario/>

  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Foobar from '~/components/Foobar.vue'
import Menuu from '~/components/Menu.vue'
import Loader from '~/components/Loader.vue'
import Share from '~/components/Share.vue'
import MapFull from '~/components/MapFull.vue'
import Proprietario from '~/components/Proprietario.vue'

export default {
  components: { Navbar, Foobar, Menuu, Loader, Share, MapFull, Proprietario },
  created () {
    /* let lastScrollTop = 0 */
    window.addEventListener('scroll', event => {
      this.$store.state.scrollY = event.path[1].scrollY
      /* lastScrollTop > this.$store.state.scrollY ? this.$store.state.scrollUp = true : this.$store.state.scrollUp = false
      lastScrollTop = this.$store.state.scrollY */
    })
  }
}
</script>

<style>
.app {
}
</style>
