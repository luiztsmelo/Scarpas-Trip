<template>
  <div class="perfil">


    <div class="perfil-body">





      <!-- ________________________________________ SIDEBAR ________________________________________ -->
      <div class="sidebar">

        <img class="__user-photo" :src="user.photoURL">

        <h1 class="__user-name">{{ user.fullName }}</h1>

        <nav>
          <li @click="openReservas" :class="[ perfil.showReservas ? 'li-active' : '' ]">Reservas</li>
          <li @click="openAnuncios" :class="[ perfil.showAnuncios ? 'li-active' : '' ]">Anúncios</li>
          <li @click="openMessages" :class="[ perfil.showMessages ? 'li-active' : '' ]">Mensagens</li>
          <li @click="openEdit" :class="[ perfil.showEdit ? 'li-active' : '' ]">Editar perfil</li>
          <li @click="$store.dispatch('a_signOut')">Sair</li>
        </nav>

      </div><!-- ________________________________________ SIDEBAR ________________________________________ -->







      <!-- ________________________________________ RESERVAS ________________________________________ -->
      <div class="category-box" v-if="perfil.showReservas">

        <h1 class="__title">Suas reservas</h1>


        <!-- Card -->
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
              <h3 class="__item-text">R${{ reserva.valorReservaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</h3>
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

        </div><!-- Card -->


      </div><!-- ________________________________________ RESERVAS ________________________________________ -->







      <!-- ________________________________________ ANÚNCIOS ________________________________________ -->
      <div class="category-box" v-if="perfil.showAnuncios">

        <h1 class="__title">Seus anúncios</h1>


      </div><!-- ________________________________________ ANÚNCIOS ________________________________________ -->







      <!-- ________________________________________ MESSAGES ________________________________________ -->
      <div class="category-box" v-if="perfil.showMessages">

        <h1 class="__title">Suas mensagens</h1>


      </div><!-- ________________________________________ MESSAGES ________________________________________ -->







      <!-- ________________________________________ EDITAR PERFIL ________________________________________ -->
      <div class="category-box" v-if="perfil.showEdit">

        <h1 class="__title">Editar perfil</h1>


      </div><!-- ________________________________________ EDITAR PERFIL ________________________________________ -->





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
    perfil () { return this.$store.state.perfil }
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
  transition: var(--pages-transition);
  & .perfil-body {
    display: flex;
    padding: 6.5rem 10% 4rem;
    & .sidebar {
      display: flex;
      flex-flow: column;
      flex: 0 0 20%;
      margin-right: 2.3rem;
      & .__user-photo {
        width: 100%;
        height: auto;
        border-radius: 7px 7px 0 0;
      }
      & .__user-name {
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
          font-size: 15px;
          font-weight: 500;
          padding: 1rem;
        }
        & li:hover {
          font-weight: 600;
        }
        & .li-active {
          font-weight: 700;
        }
      }
    }
    & .category-box {
      flex: 80%;
      display: flex;
      flex-flow: column;
      & .__title {
        font-size: 37px;
        font-weight: 300;
        padding-bottom: 2.4rem;
      }
      & .card {
        display: flex;
        margin-bottom: 2rem;
        height: 13rem;
        width: 100%;
        & .__card-img {
          height: 100%;
          width: 26%;
          object-fit: cover;
          border-radius: 7px 0 0 7px;
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
          border-radius: 0 7px 7px 0;
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
              font-weight: 400;
            }
            & .__item-text {
              font-size: 15px;
              font-weight: 500;
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
            & .__btn:hover {
              font-weight: 600;
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
