<template>
  <div class="app">

    <navbar/>
    <nuxt/>
    <foobar/>
    
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Foobar from '~/components/Foobar.vue'

export default {
  components: { Navbar, Foobar }
}
</script>

<style>
.app {
}
</style>
