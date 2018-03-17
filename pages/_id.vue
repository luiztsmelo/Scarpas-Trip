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
        <h1 class="__username">Olá, {{ user.firstName }}</h1>
        <h3 class="__edit">Editar perfil</h3>
      </div>
      <img class="__img" :src="user.photoURL">
    </div>
    
  
    <div class="anuncios-box">
      
      <h1 class="__title">Seus Anúncios</h1>

      <h3 v-if="filteredAcomods.length === 0 && filteredPasseios.length === 0 && filteredEventos.length === 0">Nenhum anúncio encontrado.</h3>

      <div class="card" v-for="acomod in filteredAcomods" v-if="filteredAcomods.length !== 0">
        <img class="__card-img" :src="image1H(acomod)">
        <h3 class="__card-title">{{ acomod.title }}</h3>
      </div>

      <div class="card" v-for="passeio in filteredPasseios" v-if="filteredPasseios.length !== 0">
        <img class="__card-img" :src="image1H(passeio)">
        <h3 class="__card-title">{{ passeio.title }}</h3>
      </div>

      <div class="card" v-for="evento in filteredEventos" v-if="filteredEventos.length !== 0">
        <img class="__card-img" :src="image1H(evento)">
        <h3 class="__card-title">{{ evento.title }}</h3>
      </div>

    </div>


    <div class="reservas-box">

      <h1 class="__title">Suas Reservas</h1>

      <h3>Nenhuma reserva encontrada.</h3>

    </div>

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
    image1H (passeio) {
      if (supportsWebP) {
        return passeio.imageH1W
      } else {
        return passeio.imageH1J
      }
    },
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    filteredAcomods () {
      let acomods = this.$store.state.acomods
      let acomodsValues = Object.values(acomods)
      let filteredAcomods = acomodsValues.filter(acomod => acomod.email === this.user.email)
      return filteredAcomods
    },
    filteredPasseios () {
      let passeios = this.$store.state.passeios
      let passeiosValues = Object.values(passeios)
      let filteredPasseios = passeiosValues.filter(passeio => passeio.email === this.user.email)
      return filteredPasseios
    },
    filteredEventos () {
      let eventos = this.$store.state.eventos
      let eventosValues = Object.values(eventos)
      let filteredEventos = eventosValues.filter(evento => evento.email === this.user.email)
      return filteredEventos
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
  margin: 3.2rem 0 5rem 0;
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
      width: 4rem;
      height: auto;
    }
  }

  & .__title {
    padding: 3rem 0 1rem 0;
    font-size: 24px;
  }

  /* ******* ANÚNCIOS BOX ******* */
  & .anuncios-box {
    display: flex;
    flex-flow: column;
    padding: 0 7%;
    & .card {
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
        padding-left: .9rem;
        line-height: 20px;
      }
    }
  }

  /* ******* RESERVAS BOX ******* */
  & .reservas-box {
    display: flex;
    flex-flow: column;
    padding: 0 7%;
  }
}

</style>