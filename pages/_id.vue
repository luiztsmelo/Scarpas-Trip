<template>
  <div class="profile" v-if="user.email !== null">

    <!-- BACK BUTTON -->
    <div class="back-bar">
      <div class="back-box" @click="backBtn">
        <img class="__back-btn" src="../assets/img/back.svg" alt="voltar">
      </div>
    </div><!-- BACK BUTTON -->

    <div class="user-box">
      <div class="welcome">
        <h1 class="__username">Olá, {{ firstName }}</h1>
        <h3 class="__edit">Editar perfil</h3>
      </div>
      <img class="__img" :src="user.photoURL">
    </div>
    
    <h1 class="__title">Seus Anúncios</h1>

    <div class="anuncios-box">

      <h3 v-if="filteredAcomods.length === 0">Nenhum anúncio encontrado. Deseja anunciar?</h3>

      <div class="acomod-card" v-for="acomod in filteredAcomods" v-if="filteredAcomods.length !== 0">
        <img class="__card-img" :src="image1H(acomod)">
        <h3 class="__card-title">{{ acomod.title }}</h3>
      </div>

    </div>

    <h1 class="__title">Seus Roteiros</h1>
    
    

  </div>
</template>

<script>
import supportsWebP from 'supports-webp'

export default {
  transition: 'opacity',
  head () {
    return {
      title: this.user.username + ' ‒ ' + 'Escarpas Trip',
    }
  },
  methods: {
    backBtn () {
      window.history.back(1)
    },
    image1H (acomod) {
      if (supportsWebP) {
        return acomod.imageH1W
      } else {
        return acomod.imageH1J
      }
    },
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    firstName () {
      let fullName = this.user.username.split(' ')
      let firstName = fullName[0]
      return firstName
    },
    filteredAcomods () {
      let acomods = this.$store.state.acomods
      let acomodsValues = Object.values(acomods)
      let filteredAcomods = acomodsValues.filter(acomod => acomod.email === this.user.email)
      return filteredAcomods
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.showNavbar === true) {
        vm.$store.commit('m_showNavbar', false)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.showNavbar === false) {
      this.$store.commit('m_showNavbar', true)
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.profile {
  margin-top: 3.2rem;
  display: flex;
  flex-flow: column;
  transition: var(--main-transition);

  & .back-bar {
    position: fixed;
    top: 0;
    left: 0;
    width:  100%;
    height: 3rem;
    background: white;
    & .back-box {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 7%;
      & .__back-btn {
        cursor: pointer;
        width: 1.07rem;
        height: auto;
        filter: invert(75%);
      }
    }
  }

  /* ******* USER BOX ******* */
  & .user-box {
    display: flex;
    align-items: center;
    padding: 2rem 7% 0 7%;
    justify-content: space-between;
    & .welcome {
      display: flex;
      flex-flow: column;
      & .__username {
        font-size: 28px;
      }
      & .__edit {
        color: #00BAAC;
      }
    }
    & .__img {
      border-radius: 50%;
      width: 3.8rem;
      height: auto;
    }
  }

  & .__title {
    padding: 3rem 7% 1rem 7%;
    font-size: 25px;
  }

  /* ******* ANÚNCIOS BOX ******* */
  & .anuncios-box {
    display: flex;
    flex-flow: column;
    padding: 0 7%;
    & .acomod-card {
      display: inline-flex;
      align-items: center;
      margin: .5rem 0;
      user-select: none;
      & .__card-img {
        width: auto;
        height: 4rem;
        border-radius: 2px;
      }
      & .__card-title {
        padding-left: 1rem;
        line-height: 20px;
      }
    }
  }
}

</style>