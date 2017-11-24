<template>
  <div class="app" @scroll="handleScroll">

    <loader/>

    <menuu/>

    <navbar/>
    <nuxt/>
    <foobar/>

    <map-full/>

    <share/>

  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Foobar from '~/components/Foobar.vue'
import Menuu from '~/components/Menu.vue'
import Loader from '~/components/Loader.vue'
import Share from '~/components/Share.vue'
import MapFull from '~/components/MapFull.vue'

export default {
  components: { Navbar, Foobar, Menuu, Loader, Share, MapFull },
   methods: {
    handleScroll (event) {
      this.$store.state.scrollTop = event.path[1].scrollY
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
.app {
}
</style>
