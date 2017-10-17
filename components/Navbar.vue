<template>
  <div class="navbar">
    <div class="navbar-body">

      <nuxt-link to="/" class="__brand-name"><span @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false), $store.commit('m_showFoobar', true)">Escarpas Trip</span></nuxt-link>
      

      <nav class="nav">
        <div class="__menu" @click="$store.commit('m_showMenu', !showMenu), $store.commit('m_menuIconAnime', !menuIconAnime)">
          <div class="bar" :class="{ menuIconAnime1: menuIconAnime }"></div>
          <div class="bar" :class="{ menuIconAnime2: menuIconAnime }"></div>
          <div class="bar" :class="{ menuIconAnime3: menuIconAnime }"></div>
        </div>
      </nav>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showMenu () {
      return this.$store.getters.showMenu
    },
    menuIconAnime () {
      return this.$store.getters.menuIconAnime
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/main.css');

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 3.5rem;
  width:  100%;
  background: white;
  transition: all .222s ease;
  padding: 0 7%;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.15);
  & .navbar-body {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .__brand-name {
      font-family: var(--brand-font);
      font-size: 26px;
      line-height: 0;
      user-select: none;
      font-weight: 400;
      color: rgb(42, 42, 42);
      transition: all .222s ease;
    }
    & .__anunciar {
      padding: 1rem 0;
      font-size: 11px;
      font-weight: 600;
    }
    & .nav {
      display: flex;
      align-items: center;
      & .__menu {
        display: inline-block;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(255, 255, 45, 0);
        & .bar {
          transition: all .3s ease;
          width: 24px;
          height: 1px;
          background-color: var(--color01);
          margin: 5px 0;
        }
      }
    }
  }
}

/* TRANSITIONS */


.menuIconAnime1 {
  transform: rotate(-45deg) translate(-4px, 4px);
}
.menuIconAnime2 {
  opacity: 0;
  transform: scale(0);
}
.menuIconAnime3 {
  transform: rotate(45deg) translate(-4px, -4px);
}
</style>