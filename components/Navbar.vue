<template>
  <transition name="navbar-animation">
    <div class="navbar" v-show="showNavbar">
      <div class="navbar-body">
      
        <nuxt-link to="/">
          <span class="__brand-name" @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false)">Escarpas Trip</span>
        </nuxt-link>
        

        <nav class="nav-mobile">
          <div class="__menu" @click="showMenu()">
            <div class="__bar" :class="{ menuIconAnime1: menuIconAnime }"></div>
            <div class="__bar" :class="{ menuIconAnime2: menuIconAnime }"></div>
            <div class="__bar" :class="{ menuIconAnime3: menuIconAnime }"></div>
          </div>
        </nav>

        <nav class="nav-desktop">
          <nuxt-link to="/acomodacoes">
            <span class="__nav-item">Acomodações</span>
          </nuxt-link>
          <nuxt-link to="/eventos">
            <span class="__nav-item">Eventos</span>
          </nuxt-link>
          <nuxt-link to="/passeios">
            <span class="__nav-item">Passeios</span>
          </nuxt-link>
          <nuxt-link to="/atracoes">
            <span class="__nav-item">Atrações</span>
          </nuxt-link>
          <nuxt-link to="/restaurantes">
            <span class="__nav-item">Restaurantes</span>
          </nuxt-link>
          <nuxt-link to="/acomodacoes">
            <span class="__nav-item">Anunciar</span>
          </nuxt-link>
        </nav>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    showMenu () {
      if (this.$store.state.showMenu === false) {
        this.$store.commit('m_showMenu', true)
        window.location.hash = 'menu'
        this.$store.commit('m_menuIconAnime', true)
      } else {
        this.$store.commit('m_showMenu', false)
        window.history.back(1)
        this.$store.commit('m_menuIconAnime', false)
      }
    }
  },
  computed: {
    hash () {
      return this.$route.hash
    },
    showNavbar () {
      return this.$store.state.showNavbar
    },
    menuIconAnime () {
      return this.$store.state.menuIconAnime
    }
  },
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showMenu', false)
        this.$store.commit('m_menuIconAnime', false)
      }
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
  transition: var(--main-transition);
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
      font-size: 25px;
      line-height: 3.3rem;
      user-select: none;
    }
    & .nav-mobile {
      display: flex;
      align-items: center;
      & .__menu {
        display: inline-block;
        cursor: pointer;
        & .__bar {
          transition: all .3s ease;
          width: 24px;
          height: 1px;
          background-color: var(--color01);
          margin: 5px 0;
        }
      }
    }
    & .nav-desktop {
      display: flex;
      align-items: center;
      height: 100%;
      transform: translateX(.7rem);
      & .__nav-item {
        margin: 0 .7rem;
        line-height: 3.7rem;
        font-size: 14px;
        font-weight: 600;
        user-select: none;
      }
    }
  }
}
@media (max-width: 1023px) {
  .navbar {
    & .navbar-body {
      & .nav-desktop {
        display: none;
      }
    }
  }
}
@media (min-width: 1024px) {
  .navbar {
    height: 3.6rem;
    padding: 0 9%;
    & .navbar-body {
      & .__brand-name {
        font-size: 30px;
        line-height: 3.7rem;
      }
      & .nav-mobile {
        display: none;
        & .__menu {
          & .__bar {
          }
        }
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