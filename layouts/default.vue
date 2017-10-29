<template>
  <div class="app">

    <loader/>

    <navbar/>
    <nuxt/>
    <foobar/>

    <menuu/>
    
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Foobar from '~/components/Foobar.vue'
import Menuu from '~/components/Menu.vue'
import Loader from '~/components/Loader.vue'

export default {
  components: { Navbar, Foobar, Menuu, Loader }
}
</script>

<style>
.app {
}
</style>
