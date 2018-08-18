<template>
  <div class="perfil">



    <div class="sidebox">

      <img class="__userPhoto" :src="user.photoURL">

      <h1 class="__userName">{{ user.fullName }}</h1>

      <nav>
        <li>Reservas</li>
        <li>Anúncios</li>
        <li>Editar perfil</li>
        <li @click="$store.dispatch('a_signOut')">Sair</li>
      </nav>

    </div>




    <div class="perfil-body">

      <h1 class="__title">Suas reservas</h1>


      <div class="reservas">

        <nuxt-link :to="`/perfil/${reserva.reservaID}`" class="card" v-for="reserva in reservas.reservasAcomods" :key="reserva.reservaID">

          <img class="__card-img" :src="imageAcH(reserva)">
          
          <div class="card-info">
            <h1 class="__card-title">{{ reserva.acomod.title }}</h1>
            <h3>STATUS:</h3>
          </div>

        </nuxt-link> 

      </div>


    </div>




    <!-- <div class="reservas">

      <h1>Suas reservas</h1>


      <div class="cards-container" v-if="$store.state.reservas !== null">

        <div class="card" v-for="reserva in reservas.reservasAcomods" :key="reserva.reservaID">
          <nuxt-link :to="`/perfil/${reserva.reservaID}`">

            <progressive-background class="__card-img" :src="imageAcH(reserva)" :aspect-ratio="2/3"/>

            <h3>{{ reserva.acomod.title }}</h3>

            <h3>{{ reserva.reservaID }}</h3>

            
          </nuxt-link> 
        </div>

      </div>


    </div> -->
    


  </div>
</template>

<script>
import * as firebase from 'firebase'
require('firebase/firestore')
import supportsWebP from 'supports-webp'

export default {
  head () {
    return {
      title: `${this.user.firstName} ‒ Escarpas Trip`
    }
  },
  transition: 'opacity',
  middleware: 'perfilValidate',
  methods: {
    imageAcH (reserva) {
      return supportsWebP ? reserva.acomod.images[0].HW : reserva.acomod.images[0].HJ
    }
  },
  computed: {
    authUser () { return this.$store.state.authUser },
    user () { return this.$store.state.user },
    reservas () { return this.$store.state.reservas }
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
          const acomod = await firebase.firestore().collection('acomods').doc(reserva.acomodID).get()
          Object.assign(reserva, { acomod: acomod.data() })
        }

        vm.$store.commit('m_reservas', { reservasAcomods: reservasAcomods })

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
  transition: var(--main-transition);
  padding: 7rem 10% 4rem;
  & .sidebox {
    display: flex;
    flex-flow: column;
    flex: 20%;
    margin-right: 2.3rem;
    & .__userName {
      padding: 1rem;
      font-size: 16px;
      font-weight: 700;
      background: rgb(222,222,222);
      color: white;
      border-left: 1px solid rgb(232,232,232);
      border-right: 1px solid rgb(232,232,232);
    }
    & nav {
      border-left: 1px solid rgb(232,232,232);
      border-right: 1px solid rgb(232,232,232);
      border-bottom: 1px solid rgb(232,232,232);
      & li {
        cursor: pointer;
        padding: 1rem;
        transition: var(--main-transition);
      }
      & li:hover {
        background: rgb(247,247,247);
      }
    }
    & .__userPhoto {
      width: 100%;
      height: auto;
    }
  }
  & .perfil-body {
    flex: 80%;
    display: flex;
    flex-flow: column;
    & .__title {
      font-size: 36px;
      font-weight: 700;
      padding-bottom: 2.3rem;
    }
    & .reservas {
      & .card {
        display: flex;
        margin-bottom: 2rem;
        height: 11rem;
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
            font-size: 17px;
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
