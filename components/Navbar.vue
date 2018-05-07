<template>
  <transition name="navbar-animation">
    <div class="navbar" v-show="showNavbar">
      <div class="navbar-body">
        

        <nuxt-link to="/" class="brand" @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false)">
          <img class="__brand-img" src="../static/brand.svg">
          <span class="__brand-name">Escarpas Trip</span>
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
            <li class="__nav-item">Acomodações</li>
          </nuxt-link>
          <nuxt-link to="/passeios">
            <li class="__nav-item">Passeios</li>
          </nuxt-link>
          <nuxt-link to="/eventos">
            <li class="__nav-item">Eventos</li>
          </nuxt-link>
          <nuxt-link to="/atracoes">
            <li class="__nav-item">Atrações</li>
          </nuxt-link>
          <nuxt-link to="/restaurantes">
            <li class="__nav-item">Restaurantes</li>
          </nuxt-link>
          
          <nuxt-link to="/anunciar" v-if="$store.state.user.email === null">
            <li class="__nav-item">Anunciar</li>
          </nuxt-link>

          <li class="__sign-in" @click="$modal.show('sign-in-modal')" v-if="$store.state.user.email === null">Login</li>

          <li><img class="__user-img" :src="$store.state.user.photoURL" :alt="$store.state.user.fullName" @click="userBox = !userBox" v-if="$store.state.user.email !== null"></li>

        </nav>

        <div class="user-box" v-show="userBox === true" @click="userBox = !userBox">
          <div class="user-box-body">
            <ul>
              <li>Editar perfil</li>
              <li>Anunciar</li>
              <li>Meus anúncios</li>
              <li>Minhas reservas</li>
              <li @click="signOut()">Sair</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      userBox: false
    }
  },
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
    },
    signOut () {
      this.$store.dispatch('a_signOut')
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
  border-bottom: 1px solid rgb(232,232,232);
  & .navbar-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    & .brand {
      cursor: pointer;
      display: flex;
      align-items: center;
      & .__brand-img {
        width: 1.7rem;
        height: auto;
        margin-right: .5rem;
      }
      & .__brand-name {
        font-family: var(--main-font);
        font-size: 18px;
        font-weight: 500;
        line-height: 3.3rem;
        user-select: none;
      }
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
      display: inline-flex;
      align-items: stretch;
      transform: translateX(.6rem);
      align-items: center;
      & a {
        margin: 0 .8rem;
      }
      & a:hover {
        border-bottom: 1px solid var(--color01);
      }
      & .__nav-item {
        font-size: 14px;
        font-weight: 600;
        user-select: none;
      }
      & .__sign-in {
        margin: 0 .8rem;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        user-select: none;
      }
      & .__sign-in:hover {
        border-bottom: 1px solid var(--color01);
      }
      & .__user-img {
        cursor: pointer;
        margin: 0 .8rem;
        width: 2.1rem;
        height: auto;
        border-radius: 50%;
      }
    }
    & .user-box {
      position: fixed;
      z-index: 10000;
      top: 0;
      left: 0;
      width:  100%;
      height: 100%;
      background: transparent;
      & .user-box-body {
        position: fixed;
        top: 4rem;
        right: 7%;
        background: white;
        width: auto;
        height: auto;
        box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.2);
        & ul {
          padding: .6rem 1.3rem;
          & li {
            padding: .7rem 0;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            user-select: none;
          }
        }
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
    height: 4rem;
    padding: 0 7%;
    & .navbar-body {
      & .brand {
        & .__brand-img {
          width: 2.35rem;
          height: auto;
        }
        & .__brand-name {
          font-size: 21px;
          font-weight: 500;
          line-height: 4rem;
        }
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