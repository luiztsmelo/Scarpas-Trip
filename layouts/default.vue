<template>
  <div class="app">


    <div class="alert-box" v-if="$store.state.error">
      <h3 class="__text" v-if="$store.state.reservaPageError">Reserva não encontrada.</h3>
      <h3 class="__text" v-if="$store.state.acomodPageError">A acomodação {{ this.$store.state.acomodRef }} não está listada.</h3>
      <img src="../assets/img/exit.svg" class="__close" @click="$store.dispatch('a_resetError')">
    </div>


    <div>
      <Loader/>

      <Share/>

      <Menuu/>
      
      <Navbar/>
      <nuxt keep-alive/>
      <Foobar/>

      <MapFull/>

      <SignIn/>

      <ask-acomod/>
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

export default {
  components: { Navbar, Foobar, SignIn, Menuu, Loader, Share, MapFull, AskAcomod },
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
  & .alert-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7%;
    position: fixed;
    left:0;
    top:0;
    z-index: 999999;
    height: 3rem;
    width: 100%;
    background: #EC407A;
    color: white;
    & .__text {
      text-align: center;
      font-size: 15px;
      font-weight: 500;
      width: 100%;
    }
    & .__close {
      cursor: pointer;
      width: .85rem;
      height: auto;
      filter: grayscale(100%) brightness(500%);
    }
  }
}
</style>
