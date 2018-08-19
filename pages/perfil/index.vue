<template>
  <div class="perfil">


    <div class="perfil-body">



      <div class="side-box">

        <img class="__userPhoto" :src="user.photoURL">

        <h1 class="__userName">{{ user.fullName }}</h1>

        <nav>
          <li @click="openReservas" :style="liStyleReservas">Reservas</li>
          <li @click="openAnuncios" :style="liStyleAnuncios">Anúncios</li>
          <li @click="openMessages" :style="liStyleMessages">Mensagens</li>
          <li @click="openEdit" :style="liStyleEdit">Editar perfil</li>
          <li @click="$store.dispatch('a_signOut')">Sair</li>
        </nav>

      </div>




      <div class="category-box" v-if="perfil.showReservas">

        <h1 class="__title">Suas reservas</h1>


        <nuxt-link :to="`/perfil/${reserva.reservaID}`" class="card" v-for="reserva in perfil.reservas.acomods" :key="reserva.reservaID" v-if="perfil.reservas.acomods !== null">

          <img class="__card-img" :src="imageAcH(reserva)">
          
          <div class="card-info">

            <h1 class="__card-title">{{ reserva.acomod.title }}</h1><!-- nome grande fica zuado. corrigir width -->

            <h3 class="__card-subtitle">Período:
              <span style="font-weight: 400">{{ periodoReserva(reserva) }}</span>
            </h3>

            <h3 class="__card-subtitle">Código da reserva:
              <span style="font-weight: 400">{{ reserva.reservaID }}</span>
            </h3>

            <h3 class="__card-subtitle">Condição:
              <span style="font-weight: 400">{{ reserva.status }}</span>
            </h3>

          </div>

        </nuxt-link> 

      </div>



      <div class="category-box" v-if="perfil.showAnuncios">

        <h1 class="__title">Seus anúncios</h1>

      </div>



      <div class="category-box" v-if="perfil.showMessages">

        <h1 class="__title">Suas mensagens</h1>

      </div>



      <div class="category-box" v-if="perfil.showEdit">

        <h1 class="__title">Editar perfil</h1>

      </div>



    </div>


    <Footer/>

  </div>
</template>

<script>
import * as firebase from 'firebase'
require('firebase/firestore')
import supportsWebP from 'supports-webp'
import Footer from '~/components/Footer'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  components: { Footer },
  head () {
    return {
      title: `${this.user.firstName} ‒ Escarpas Trip`
    }
  },
  transition: 'opacity',
  middleware: 'perfilValidate',
  methods: {
    openReservas () {
      this.$store.commit('m_perfilShowReservas', true)
      this.$store.commit('m_perfilShowAnuncios', false)
      this.$store.commit('m_perfilShowMessages', false)
      this.$store.commit('m_perfilShowEdit', false)
    },
    openAnuncios () {
      this.$store.commit('m_perfilShowReservas', false)
      this.$store.commit('m_perfilShowAnuncios', true)
      this.$store.commit('m_perfilShowMessages', false)
      this.$store.commit('m_perfilShowEdit', false)
    },
    openMessages () {
      this.$store.commit('m_perfilShowReservas', false)
      this.$store.commit('m_perfilShowAnuncios', false)
      this.$store.commit('m_perfilShowMessages', true)
      this.$store.commit('m_perfilShowEdit', false)
    },
    openEdit () {
      this.$store.commit('m_perfilShowReservas', false)
      this.$store.commit('m_perfilShowAnuncios', false)
      this.$store.commit('m_perfilShowMessages', false)
      this.$store.commit('m_perfilShowEdit', true)
    },
    imageAcH (reserva) {
      return supportsWebP ? reserva.acomod.images[0].HW : reserva.acomod.images[0].HJ
    },
    periodoReserva (reserva) {
      return dayjs(reserva.periodoReserva.start).format('DD/MM/YYYY') + ' - ' + dayjs(reserva.periodoReserva.end).format('DD/MM/YYYY')
    }
  },
  computed: {
    authUser () { return this.$store.state.authUser },
    user () { return this.$store.state.user },
    perfil () { return this.$store.state.perfil },
    liStyleReservas () {
      return this.perfil.showReservas ? 'border-left: 3px solid #FFA04F' : ''
    },
    liStyleAnuncios () {
      return this.perfil.showAnuncios ? 'border-left: 3px solid #FFA04F' : ''
    },
    liStyleMessages () {
      return this.perfil.showMessages ? 'border-left: 3px solid #FFA04F' : ''
    },
    liStyleEdit () {
      return this.perfil.showEdit ? 'border-left: 3px solid #FFA04F' : ''
    }
  },
  watch: {
    authUser (value) {
      !value ? this.$router.push('/') : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        const reservasAcomodsSnap = await firebase.firestore().collection('reservasAcomods').where('guestID', '==', vm.$store.state.user.userID).get()

        const reservasAcomods = reservasAcomodsSnap.docs.map(reserva => reserva.data())

        for (let reserva of reservasAcomods) {
          const acomod = await firebase.firestore().doc(`acomods/${reserva.acomodID}`).get()
          Object.assign(reserva, { acomod: acomod.data() })
        }
        
        vm.$store.commit('m_perfilReservasAcomods', reservasAcomods)

      } catch (err) {
        console.log(err)
      }
    })
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.perfil {
  display: flex;
  flex-flow: column;
  transition: var(--main-transition);
  & .perfil-body {
    display: flex;
    padding: 6.5rem 10% 4rem;
    & .side-box {
      display: flex;
      flex-flow: column;
      flex: 0 0 20%;
      margin-right: 2.3rem;
      & .__userPhoto {
        width: 100%;
        height: auto;
      }
      & .__userName {
        padding: 1rem;
        font-size: 19px;
        font-weight: 600;
        text-align: center;
        border-left: 1px solid rgb(232,232,232);
        border-right: 1px solid rgb(232,232,232);
        border-bottom: 1px solid rgb(232,232,232);
      }
      & nav {
        margin-top: .8rem;
        border: 1px solid rgb(232,232,232);
        & li {
          cursor: pointer;
          user-select: none;
          font-size: 15px;
          font-weight: 500;
          padding: 1rem;
        }
        & li:hover {
          border-left: 3px solid rgb(242,242,242);
        }
      }
    }
    & .category-box {
      flex: 80%;
      display: flex;
      flex-flow: column;
      & .__title {
        font-size: 32px;
        font-weight: 700;
        padding-bottom: 2.3rem;
      }
      & .card {
        display: flex;
        margin-bottom: 2rem;
        height: 10rem;
        width: 100%;
        & .__card-img {
          height: 100%;
          width: auto;
        }
        & .card-info {
          display: flex;
          flex-flow: column;
          width: 100%;
          padding: 1rem;
          border-top: 1px solid rgb(232,232,232);
          border-right: 1px solid rgb(232,232,232);
          border-bottom: 1px solid rgb(232,232,232);
          & .__card-title {
            padding-bottom: .2rem;
            font-size: 16px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          & .__card-subtitle {
            padding: .1rem 0;
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .perfil {
  }
}
</style>
