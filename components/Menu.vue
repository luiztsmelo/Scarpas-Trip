<template>
  <transition name="menu-animation">
    <div class="menu" v-show="showMenu">
      <div class="menu-body">

        <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
          <nuxt-link to="/anunciar" class="menu-item">
            <img src="../assets/img/estadia.svg" alt="" class="__item-img">
            <span class="__item-text" >Anunciar Estadia</span>
          </nuxt-link>
        </div>
        <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
          <nuxt-link to="/anunciar" class="menu-item">
            <img src="../assets/img/eventos.svg" alt="" class="__item-img">
            <span class="__item-text" >Anunciar Evento</span>
          </nuxt-link>
        </div>
        <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
          <nuxt-link to="/anunciar" class="menu-item">
            <img src="../assets/img/passeios.svg" alt="" class="__item-img">
            <span class="__item-text" >Anunciar Passeio</span>
          </nuxt-link>
        </div>
        <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
          <nuxt-link to="/anunciar" class="menu-item">
            <img src="../assets/img/comidas.svg" alt="" class="__item-img">
            <span class="__item-text" >Anunciar Restaurante</span>
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
    text-align: center;
    padding: 3rem 7%;
    & .menu-item {
      display: flex;
      align-items: center;
      padding-bottom: 1.4rem;
      & .__item-img {
        width: 1.7rem;
        height: auto;
        margin-right: .8rem;
        filter: grayscale(100%) brightness(70%);
      }
      & .__item-text {
        font-size: 18px;
        font-weight: 300;
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