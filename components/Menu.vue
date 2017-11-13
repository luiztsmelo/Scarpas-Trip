<template>
  <transition name="menu-animation">
    <div class="menu" v-show="showMenu">
      <div class="menu-body">

        <div class="anuncio-box">
          
          <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
            <nuxt-link to="/anunciar/estadia" class="menu-item">
              <img src="../assets/img/estadia.svg" alt="" class="__item-img-color">
              <span class="__item-text" >Anunciar Casa</span>
            </nuxt-link>
          </div>

          <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
            <nuxt-link to="/anunciar/evento" class="menu-item">
              <img src="../assets/img/eventos.svg" alt="" class="__item-img-color">
              <span class="__item-text" >Anunciar Evento</span>
            </nuxt-link>
          </div>
          
          <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
            <nuxt-link to="/anunciar/passeio" class="menu-item">
              <img src="../assets/img/passeios.svg" alt="" class="__item-img-color">
              <span class="__item-text" >Anunciar Passeio</span>
            </nuxt-link>
          </div>

          <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
            <nuxt-link to="/anunciar/restaurante" class="menu-item">
              <img src="../assets/img/comidas.svg" alt="" class="__item-img-color">
              <span class="__item-text" >Anunciar Restaurante</span>
            </nuxt-link>
          </div>

        </div>

        <div class="info-box">
          <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
            <nuxt-link to="/anunciar" class="menu-item">
              <img src="../assets/img/contato.svg" alt="" class="__item-img">
              <span class="__item-text">Contato</span>
            </nuxt-link>
          </div>

          <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
            <nuxt-link to="/anunciar" class="menu-item">
              <img src="../assets/img/sobre.svg" alt="" class="__item-img">
              <span class="__item-text">Sobre</span>
            </nuxt-link>
          </div>
        </div>

        <span class="tmstudio">Desenvolvido por <strong>TMstudio</strong></span>

      </div> 
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    showMenu () {
      return this.$store.state.showMenu
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.menu {
  position: fixed;
  z-index: 9999;
  width:  100%;
  height: 100%;
  top: 3.2rem;
  background: white;
  overflow: hidden;
  transition: all .3s ease;
  & .menu-body {
    display: flex;
    flex-flow: column;
    text-align: center;
    padding: 2rem 7%;
    height: 100%;
    & .menu-item {
      display: flex;
      align-items: center;
      padding: 1.1rem 0;
      & .__item-img-color {
        width: 1.4rem;
        height: auto;
        margin-right: 1rem;
        filter: grayscale(100%) brightness(90%);
      }
      & .__item-img {
        width: 1.4rem;
        height: auto;
        margin-right: 1rem;
        filter: brightness(80%);
      }
      & .__item-text {
        font-size: 19px;
        font-weight: 300;
      }
    }
    & .anuncio-box {
      padding-bottom: 1.1rem;
      border-bottom: 1px solid rgb(222, 222, 222);
    }
    & .info-box {
      padding: 1.1rem 0;
    }
    & .tmstudio {
      position: absolute;
      bottom: 3.7rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      font-size: 13px;
      font-weight: 300;
      & strong {
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