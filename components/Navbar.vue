<template>
  <transition name="navbar-animation">

    <div class="navbar" v-if="showNavbar">
      
      <div class="navbar-body">
        

        <nuxt-link to="/" class="brand" @click="$store.commit('m_showMenu', false), $store.commit('m_menuIconAnime', false)">
          <img class="__brand-img" src="../static/brand.svg" draggable="false">
          <span class="__brand-name">Escarpas Trip</span>
        </nuxt-link>
        

        <nav class="nav-mobile">
          <div class="__menu" @click="showMenu()">
            <div class="__bar1" :class="{ menuIconAnime1: menuIconAnime }"></div>
            <div class="__bar2" :class="{ menuIconAnime2: menuIconAnime }"></div>
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
          <!-- <nuxt-link to="/atracoes">
            <li class="__nav-item">Atrações</li>
          </nuxt-link> -->
          <nuxt-link to="/restaurantes">
            <li class="__nav-item">Restaurantes</li>
          </nuxt-link>
          
          <li class="__nav-item-no-a" @click="anuncioDropdown = !anuncioDropdown">Anunciar</li>

          <li class="__nav-item-no-a" @click="$modal.show('sign-in-modal')" v-if="!authUser">Login</li>

          <nuxt-link to="/" style="padding-left:0">
            <li>
              <img class="__user-img" :src="userPhoto" @click="userBox = !userBox" v-if="authUser">
            </li>
          </nuxt-link>

        </nav>


        <div class="dropdown" v-if="anuncioDropdown" @click="anuncioDropdown = !anuncioDropdown">
          <div class="dropdown-body" style="right: 10%">
            <ul>
              <nuxt-link to="/anunciar/acomodacao">
                <li class="__nav-item">Acomodação</li>
              </nuxt-link>
              <nuxt-link to="/anunciar/passeio">
                <li class="__nav-item">Passeio</li>
              </nuxt-link>
              <!-- <nuxt-link to="/anunciar/evento">
                <li class="__nav-item">Evento</li>
              </nuxt-link> -->
              <!-- <nuxt-link to="/anunciar/restaurante">
                <li class="__nav-item">Restaurante</li>
              </nuxt-link> -->
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
      userBox: false,
      anuncioDropdown: false
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
        this.$store.commit('m_menuIconAnime', false)
        window.history.back(1)
      }
    }
  },
  computed: {
    hash () { return this.$route.hash },
    authUser () { return this.$store.state.authUser },
    showNavbar () { return this.$store.state.showNavbar },
    menuIconAnime () { return this.$store.state.menuIconAnime },
    userPhoto () {
      if (this.$store.state.user.photoURL !== '') {
        return this.$store.state.user.photoURL
      } else {
        return require('@/assets/img/user.svg')
      }
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

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9997;
  height: var(--navbarHeightMobile);
  width:  100%;
  background: white;
  transition: var(--main-transition);
  padding: 0 7%;
  border-bottom: 1px solid #dedede;
  & .navbar-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    & .brand {
      user-select: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      & .__brand-img {
        width: 1.95rem;
        height: auto;
        margin-right: .55rem;
      }
      & .__brand-name {
        font-family: var(--main-font);
        font-weight: 500;
        font-size: 18px;
        line-height: var(--navbarHeightMobile);
        user-select: none;
      }
    }
    & .nav-mobile {
      display: flex;
      align-items: center;
      & .__menu {
        display: inline-block;
        cursor: pointer;
        & .__bar1 {
          transition: all .3s ease;
          width: 25px;
          height: 2px;
          background-color: var(--color01);
          margin: 5px 0;
          transform: translateX(-6px);
        }
        & .__bar2 {
          transition: all .3s ease;
          width: 25px;
          height: 2px;
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
        padding: 0 .9rem;
      }
      & a:hover {
        color: rgb(152, 152, 152);
      }
      & .__nav-item {
        font-size: 15px;
        font-weight: 500;
        user-select: none;
      }
      & .__nav-item-no-a {
        padding: 0 .9rem;
        cursor: pointer;
        font-size: 15px;
        font-weight: 500;
        user-select: none;
      }
      & .__nav-item-no-a:hover {
        color: rgb(152, 152, 152);
      }
      & .__user-img {
        cursor: pointer;
        margin-left: .8rem;
        width: 1.9rem;
        height: auto;
        border-radius: 50%;
      }
    }
    & .dropdown {
      position: fixed;
      z-index: 10000;
      top: 0;
      left: 0;
      width:  100%;
      height: 100%;
      background: transparent;
      & .dropdown-body {
        position: fixed;
        top: var(--navbarHeightDesktop);
        background: white;
        width: auto;
        height: auto;
        box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.2);
        & ul {
          padding: .7rem 2.2rem .7rem 1.2rem;
          & li {
            padding: .85rem 0;
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
            user-select: none;
          }
          & li:hover {
            color: rgb(152, 152, 152);
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
    height: var(--navbarHeightDesktop);
    padding: 0 7%;
    & .navbar-body {
      & .brand {
        & .__brand-img {
          width: 2.4rem;
          height: auto;
        }
        & .__brand-name {
          font-size: 20px;
          line-height: var(--navbarHeightDesktop);
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
  opacity: 0;
}

.menuIconAnime1 {
  transform: rotate(-45deg) translate(4px, 5px) !important;
}
.menuIconAnime2 {
  transform: rotate(45deg) translate(0px, -9px) !important;
}
</style>