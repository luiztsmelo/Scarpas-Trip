<template>
  <transition name="menu-animation">
    <div class="menu" v-show="showMenu">

      <div class="menu-body">
        <nuxt-link to="/anunciar" class="__menu-item"><span @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false)">Anunciar</span></nuxt-link>
      </div>
      
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    showMenu () {
      return this.$store.getters.showMenu
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/main.css');

.menu {
  position: fixed;
  z-index: 4;
  width:  100%;
  height: 100%;
  top: 3.5rem;
  background: white;
  overflow: hidden;
  transition: all .3s ease;
  & .menu-body {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 3rem 7%;
    & .__menu-item {
      padding-bottom: .5rem;
      font-size: 25px;
      font-weight: 600;
    }
  }
}

/* TRANSITIONS */
.menu-animation-enter,
.menu-animation-leave-active {
  transform: translateY(100%);
}
</style>