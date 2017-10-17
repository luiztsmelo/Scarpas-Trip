<template>
  <transition name="menu-animation">
    <div class="menu" v-show="showMenu">
      <div class="menu-body">

        <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
          <nuxt-link to="/anunciar" class="menu-item">
            <img src="../assets/img/anunciar.svg" alt="" class="__item-img">
            <span class="__item-text" >Anunciar</span>
          </nuxt-link>
        </div>

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
    & .menu-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      & .__item-img {
        width: 2.2rem;
        height: auto;
        margin-right: .8rem;
      }
      & .__item-text {
        font-size: 25px;
        font-weight: 400;
      }
    }
  }
}

/* TRANSITIONS */
.menu-animation-enter,
.menu-animation-leave-active {
  transform: translateY(100%);
}
</style>