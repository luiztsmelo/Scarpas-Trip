<template>
  <div class="app">

    <loader/>

    <menuu/>

    <navbar/>
    <nuxt/>
    <foobar/>

    <share/>

  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Foobar from '~/components/Foobar.vue'
import Menuu from '~/components/Menu.vue'
import Loader from '~/components/Loader.vue'
import Share from '~/components/Share.vue'

export default {
  components: { Navbar, Foobar, Menuu, Loader, Share }
}
</script>

<style>
.app {
}
</style>
