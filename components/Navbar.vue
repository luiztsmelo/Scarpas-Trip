<template>
  <transition name="navbar-animation">
    <div class="navbar" v-show="showNavbar">
      <div class="navbar-body">

        <nuxt-link to="/">
          <span class="__brand-name" @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false)">Escarpas Trip</span>
        </nuxt-link>
        

        <nav class="nav">
          <div class="__menu" @click="$store.commit('m_showMenu', !showMenu), $store.commit('m_menuIconAnime', !menuIconAnime)">
            <div class="bar" :class="{ menuIconAnime1: menuIconAnime }"></div>
            <div class="bar" :class="{ menuIconAnime2: menuIconAnime }"></div>
            <div class="bar" :class="{ menuIconAnime3: menuIconAnime }"></div>
          </div>
        </nav>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    showNavbar () {
      return this.$store.state.showNavbar
    },
    showMenu () {
      return this.$store.state.showMenu
    },
    menuIconAnime () {
      return this.$store.state.menuIconAnime
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9997;
  height: 3.2rem;
  width:  100%;
  background: white;
  transition: all .3s ease;
  padding: 0 7%;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1);
  & .navbar-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    & .__brand-name {
      font-family: var(--brand-font);
      font-size: 26px;
      line-height: 0;
      user-select: none;
      font-weight: 400;
      color: var(--color01);
    }
    & .nav {
      display: flex;
      align-items: center;
      & .__menu {
        display: inline-block;
        cursor: pointer;
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

@media (min-width: 1281px) {
  .navbar {
    height: 3.7rem;
    padding: 0 13%;
    & .navbar-body {
      & .__brand-name {
        font-size: 29px;
      }
    }
  }
}
/* TRANSITIONS */

.navbar-animation-enter,
.navbar-animation-leave-active {
  transform: translateY(-100%);
}

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