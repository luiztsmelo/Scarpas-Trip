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


        <!-- CARD -->
        <div class="card" v-for="reserva in perfil.reservas.acomods" :key="reserva.reservaID" v-if="perfil.reservas.acomods !== null">

          <img class="__card-img" :src="imageAcH(reserva)">
          

          <div class="card-info">

            <h1 class="__card-title">{{ reserva.acomod.title }}</h1><!-- nome grande fica zuado. corrigir width -->

            <div class="item">
              <h3 class="__item-title">Datas:&nbsp;</h3> 
              <h3 class="__item-text">{{ periodoReserva(reserva) }}</h3>
            </div>
            <div class="item">
              <h3 class="__item-title">Valor total:&nbsp;</h3> 
              <h3 class="__item-text">{{ reserva.valorReservaTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2}) }}</h3>
            </div>

            <div class="item">
              <h3 class="__item-title">Situação:&nbsp;</h3> 
              <h3 class="__item-text">{{ status(reserva) }}</h3>
              <img class="__item-info" src="../../assets/img/info.svg">
            </div>

            <div class="buttons">
              <button class="__btn">Enviar mensagem</button>
              <button class="__btn">Cancelar pedido</button>
            </div>

          </div>

        </div><!-- CARD -->

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
import firebase from 'firebase/app'
import 'firebase/firestore'
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
    },
    status (reserva) {
      const status = reserva.status
      return status === 'pending' ? 'Aguardando confirmação' 
           : status === 'awaiting-payment' ? 'Aguardando pagamento'
           : status === 'expired' ? 'Pedido expirado'
           : ''
    }
  },
  computed: {
    authUser () { return this.$store.state.authUser },
    user () { return this.$store.state.user },
    perfil () { return this.$store.state.perfil },
    liStyleReservas () {
      return this.perfil.showReservas ? 'font-weight:600' : ''
    },
    liStyleAnuncios () {
      return this.perfil.showAnuncios ? 'font-weight:600' : ''
    },
    liStyleMessages () {
      return this.perfil.showMessages ? 'font-weight:600' : ''
    },
    liStyleEdit () {
      return this.perfil.showEdit ? 'font-weight:600' : ''
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
        vm.$store.commit('m_showNavbar', true)

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

.perfil {
  transition: var(--main-transition);
  & .perfil-body {
    display: flex;
    padding: 6.5rem 10% 4rem;
    & .side-box {
      display: flex;
      flex-flow: column;
      flex: 0 0 19%;
      margin-right: 2.3rem;
      & .__userPhoto {
        width: 100%;
        height: auto;
      }
      & .__userName {
        padding: 1rem;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        border-left: 1px solid #dedede;
        border-right: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
      }
      & nav {
        margin-top: .8rem;
        border: 1px solid #dedede;
        & li {
          cursor: pointer;
          user-select: none;
          font-size: 16px;
          font-weight: 400;
          padding: 1rem;
        }
        & li:hover {
          font-weight: 500;
        }
      }
    }
    & .category-box {
      flex: 81%;
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
        height: 13rem;
        width: 100%;
        & .__card-img {
          height: 100%;
          width: 25%;
          object-fit: cover;
        }
        & .card-info {
          display: flex;
          flex-flow: column;
          position: relative;
          width: 100%;
          padding: 1rem;
          border-top: 1px solid #dedede;
          border-right: 1px solid #dedede;
          border-bottom: 1px solid #dedede;
          & .__card-title {
            padding-bottom: .4rem;
            font-size: 16px;
            font-weight: 700;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          & .item {
            padding: .1rem 0;
            display: flex;
            align-items: center;
            & .__item-title {
              font-size: 15px;
              font-weight: 500;
            }
            & .__item-text {
              font-size: 15px;
            }
            & .__item-info {
              width: .9rem;
              height: auto;
              margin-left: .3rem;
              cursor: pointer;
            }
          }
          & .buttons {
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #dedede;
            width: 94.5%;
            padding: 1rem 0;
            & .__btn {
              padding: 0 1.2rem 0 0;
              font-size: 15px;
              font-weight: 500;
              background: transparent;
            }
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
