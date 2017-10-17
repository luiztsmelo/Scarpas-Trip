<template>
  <div class="app">

    <navbar/>
    <nuxt/>
    <foobar/>

    <menubar/> <!-- O nome Menu não funciona! -->
    
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Foobar from '~/components/Foobar.vue'
import Menubar from '~/components/Menu.vue'

export default {
  components: { Navbar, Foobar, Menubar }
}
</script>

<style>
.app {
}
</style>
