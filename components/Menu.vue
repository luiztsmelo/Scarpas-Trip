<template>
  <transition name="menu-animation">
    <div class="menu" v-if="showMenu">
      <div class="menu-body">

        <div style="border-bottom:1px solid #dedede;padding-bottom:.6rem" @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
          <div class="menu-item">
            <img src="../assets/img/social.svg" class="__item-img-color">
            <h3>Minha Conta</h3>
          </div>
        </div>

        <div style="padding-top:.6rem" @click="$store.commit('m_showMenu', false), $store.commit('m_showFoobar', false), $store.commit('m_menuIconAnime', false)">
          <nuxt-link to="/anunciar/acomodacao" class="menu-item">
            <img src="../assets/img/estadia.svg" class="__item-img-color">
            <h3>Anunciar Acomodação</h3>
          </nuxt-link>
        </div>

        <div style="padding-bottom:.6rem" @click="$store.commit('m_showMenu', false), $store.commit('m_showFoobar', false), $store.commit('m_menuIconAnime', false)">
          <nuxt-link to="/anunciar/passeio" class="menu-item">
            <img src="../assets/img/passeios.svg" class="__item-img-color">
            <h3>Anunciar Passeio</h3>
          </nuxt-link>
        </div>

        <!-- <div @click="$store.commit('m_showMenu', false), $store.commit('m_showFoobar', false), $store.commit('m_menuIconAnime', false)">
          <nuxt-link to="/anunciar/evento" class="menu-item">
            <img src="../assets/img/eventos.svg" class="__item-img-color">
            <h3>Anunciar Evento</h3>
          </nuxt-link>
        </div> -->

        <!-- <div @click="$store.commit('m_showMenu', false), $store.commit('m_showFoobar', false), $store.commit('m_menuIconAnime', false)">
          <nuxt-link to="/anunciar/restaurante" class="menu-item">
            <img src="../assets/img/restaurantes.svg" class="__item-img-color">
            <h3>Anunciar Restaurante</h3>
          </nuxt-link>
        </div> -->

        <!-- <div style="display:none">
          <nuxt-link to="/anunciar/atracao" class="menu-item">
            <img src="../assets/img/restaurantes.svg" class="__item-img-color">
            <h3>Anunciar Atração</h3>
          </nuxt-link>
        </div> -->

        <div style="padding-top:.6rem; border-top:1px solid #dedede" @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
          <nuxt-link to="/anunciar" class="menu-item">
            <img src="../assets/img/contato.svg" class="__item-img">
            <h3>Contato</h3>
          </nuxt-link>
        </div>

        <div @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', false)">
          <nuxt-link to="/anunciar" class="menu-item">
            <img src="../assets/img/sobre.svg" class="__item-img">
            <h3>Sobre</h3>
          </nuxt-link>
        </div>
 

        <!-- <span class="tmstudio">Desenvolvido por <strong>TMstudio</strong></span> -->


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

.menu {
  position: fixed;
  z-index: 9998;
  width:  100%;
  height: 100%;
  top: var(--navbarHeightMobile);
  background: white;
  overflow: hidden;
  transition: var(--main-transition);
  & .menu-body {
    display: flex;
    flex-flow: column;
    text-align: center;
    padding: 2rem 7% 2rem 7.5%;
    height: 100%;
    & .menu-item {
      display: flex;
      align-items: center;
      padding: .8rem 0;
      & .__item-img-color {
        width: 1.3rem;
        height: auto;
        margin-right: 1rem;
        filter: grayscale(100%) brightness(10%);
      }
      & .__item-img {
        width: 1.3rem;
        height: auto;
        margin-right: 1rem;
        filter: brightness(15%);
      }
    }
    & .tmstudio {
      position: absolute;
      bottom: 3.8rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      font-size: 11px;
      font-weight: 400;
      & strong {
        font-weight: 500;
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