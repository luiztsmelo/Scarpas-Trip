<template>
  <div class="reservar">
    

    <v-dialog style="z-index:10000"/>



    <!-- ******* TOPBAR ******* -->
    <div class="reserva-topbar">

      <nuxt-link to="/" class="brand">
        <img class="__brand-img" src="../../../static/brand.svg" draggable="false">
      </nuxt-link>

      <div class="progress">
        <h3 class="__item-progress" :style="etapaProgressed1" @click="backEtapa1">1. Revisar Regras {{ tipoAcomodTitle }}</h3>
        
        <img src="../../../assets/img/arrow-right.svg" class="__arrow-right">

        <h3 class="__item-progress" :style="etapaProgressed2" @click="backEtapa2">2. Mensagem</h3>

        <img src="../../../assets/img/arrow-right.svg" class="__arrow-right">

        <h3 class="__item-progress" :style="etapaProgressed3" @click="backEtapa3">3. Pagamento e Confirmação</h3>
      </div>

    </div><!-- ******* TOPBAR ******* -->



    <!-- ******* BODY ******* -->
    <div class="reservar-body">


      <!-- ******* FLEX LEFT ******* -->
      <div class="flex-left">

        <div class="title-div">
          <h1 class="__number">1</h1>
          <h1 class="__title">Revisar Regras {{ tipoAcomodTitle }}</h1>
        </div>

        <h3>Check in/out</h3>
        <h3>Se permitido Fumar, Pets, Festas ou Eventos</h3>
        <h3>Regras de Cancelamento</h3>

        
      </div><!-- ******* FLEX LEFT ******* -->



      <!-- ******* FLEX RIGHT ******* -->
      <div class="flex-right">

        <progressive-background  class="__acomod-image" :src="imageH" :placeholder="acomod.images[0].L" :aspect-ratio="2/3"/>

        <h1 class="__acomod-title">{{ acomod.title }}</h1>

        <div class="detalhes-reserva-data">
          <div class="detalhes-reserva-data_item">
            <img src="../../../assets/img/calendar.svg" class="__img" style="transform: scale(.9)">
            <h3>{{ $store.state.reservaAcomod.startDate }}</h3>
            <img src="../../../assets/img/arrow-right.svg" class="__arrow-right-date">
            <h3>{{ $store.state.reservaAcomod.endDate }}</h3>
          </div>
          <div class="detalhes-reserva-data_item">
            <img src="../../../assets/img/guests.svg" class="__img">
            <h3>{{ $store.state.reservaAcomod.totalHospedes == '1' ? $store.state.reservaAcomod.totalHospedes + ' hóspede' : $store.state.reservaAcomod.totalHospedes + ' hóspedes' }}</h3>
          </div>
        </div>

        <div class="detalhes-reserva-valor" v-if="$store.state.reservaAcomod.valorReservaTotal !== null">

          <div class="detalhes-reserva-valor_item" style="padding-bottom: .5rem">
            <h3>R${{ acomod.valorNoite.toLocaleString() }} x {{ $store.state.reservaAcomod.noites }} noites</h3>
            <h3 id="valor">R${{ $store.state.reservaAcomod.valorNoitesTotal.toLocaleString() }}</h3>
          </div>

          <div class="detalhes-reserva-valor_item" style="padding-bottom: .5rem" v-if="acomod.limpezaFee !== 0">
            <div style="display:flex;flex:row;align-items:center">
              <h3>Taxa de limpeza</h3>
              <img src="../../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="limpezaFeeDialog">
            </div>
            <h3>R${{ this.acomod.limpezaFee.toLocaleString() }}</h3>
          </div>

          <div class="detalhes-reserva-valor_item" style="padding-bottom: .8rem">
            <div style="display:flex;flex:row;align-items:center">
              <h3>Taxa de serviço</h3>
              <img src="../../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="serviceFeeDialog">
            </div>
            <h3>R${{ $store.state.reservaAcomod.serviceFeeTotal.toLocaleString() }}</h3>
          </div>

          <div class="detalhes-reserva-valor_item-total" style="padding-top: .8rem">
            <h3>Total</h3>
            <h3 class="__valor-total">R${{ $store.state.reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
          </div>
        </div>

      </div> <!-- ******* FLEX RIGHT ******* -->


    </div><!-- ******* BODY ******* -->
  </div>
</template>

<script>
import * as firebase from 'firebase'
require('firebase/firestore')
import supportsWebP from 'supports-webp'

export default {
  head () {
    return {
      title: 'Reservar: ' + this.acomod.title
    }
  },
  middleware: 'reservaValidate',
  transition: 'opacity',
  methods: {
    backEtapa1 () {
      if (this.$store.state.etapaReserva1ok === true) {
        this.$store.commit('m_reservaAcomodDesktop1', true), this.$store.commit('m_reservaAcomodDesktop2', false), this.$store.commit('m_reservaAcomodDesktop3', false)
      }
    },
    backEtapa2 () {
      if (this.$store.state.etapaReserva2ok === true) {
        this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', true), this.$store.commit('m_reservaAcomodDesktop3', false)
      }
    },
    backEtapa3 () {
      if (this.$store.state.etapaReserva3ok === true) {
        this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', false), this.$store.commit('m_reservaAcomodDesktop3', true)
      }
    },
    limpezaFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Limpeza',
        text: `Taxa cobrada pelo proprietário para arcar com os custos de limpeza ${this.tipoAcomodLimpeza}.`,
        buttons: [{ title: 'OK' }]
      })
    },
    serviceFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Serviço',
        text: `Taxa de ${Math.round(this.$store.state.serviceFeeAcomod * 100)}% cobrada com o intuito de garantir suporte e total segurança em sua estadia caso algum problema aconteça.`,
        buttons: [{ title: 'OK' }]
      })
    }
  },
  computed: {
    acomod () {
      return this.$store.state.acomod
    },
    etapaProgressed1 () {
      return this.$store.state.etapaReserva1ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    etapaProgressed2 () {
      return this.$store.state.etapaReserva2ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    etapaProgressed3 () {
      return this.$store.state.etapaReserva3ok === true ? 'font-weight: 600' : 'cursor: default'
    },
    imageH () {
      return supportsWebP ? this.acomod.images[0].HW : this.acomod.images[0].HJ
    },
    tipoAcomodTitle () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'da Casa' 
           : path === 'Apartamento' ? 'do Apartamento'
           : path === 'Rancho' ? 'do Rancho'
           : path === 'Chácara' ? 'da Chácara'
           : path === 'Pousada' ? 'da Pousada'
           : path === 'Camping' ? 'do Camping'
           : path === 'Sítio' ? 'do Sítio'
           : path === 'Fazenda' ? 'da Fazenda'
           : path === 'Hostel' ? 'do Hostel'
           : ''
    },
    tipoAcomodLimpeza () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'da casa' 
           : path === 'Apartamento' ? 'do apartamento'
           : path === 'Rancho' ? 'do rancho'
           : path === 'Chácara' ? 'da chácara'
           : path === 'Pousada' ? 'da pousada'
           : path === 'Camping' ? 'do camping'
           : path === 'Sítio' ? 'do sítio'
           : path === 'Fazenda' ? 'da fazenda'
           : path === 'Hostel' ? 'do hostel'
           : ''
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      firebase.firestore().collection('acomods').doc(vm.$store.state.acomod.acomodID).collection('visits').doc(vm.$store.state.visitID).update({ 
        wentToReservaPage: true
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('m_isReservar', false)
    this.$store.dispatch('a_resetReservaAcomod')
    next()
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.reservar {
  display: flex;
  flex-flow: column;
  transition: all .27s cubic-bezier(.15,.97,.43,.93);
  
  /* ******* TOPBAR ******* */
  & .reserva-topbar {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    height: 5rem;
    width: 100%;
    & .brand {
      position: absolute;
      left: 2%;
      & .__brand-img {
        cursor: pointer;
        width: 2.5rem;
        height: auto;
      }
    }
    & .progress {
      padding-left: 12%;
      display: flex;
      align-items: center;
      & .__item-progress {
        cursor: pointer;
        user-select: none;
        font-size: 15px;
        font-weight: 300;
      }
      & .__arrow-right {
        width: .8rem; 
        height: auto;
        margin: 0 1.4rem;
      }
    }
  }

  /* ******* BODY ******* */
  & .reservar-body {
    padding: 1rem 12% 4rem;
    display: flex;
    /* ******* FLEX LEFT ******* */
    & .flex-left {
      flex: 65%;
      & .title-div {
        display: flex;
        align-items: center;
        padding-bottom: 2rem;
        & .__number {
          width: 2rem;
          padding-right: .4rem;
          text-align: center;
          font-size: 38px;
          color: var(--colorAcomod);
        }
        & .__title {
          font-size: 32px;
        }
      }
    }
    /* ******* FLEX RIGHT ******* */
    & .flex-right {
      flex: 35%;
      max-width: 35%;
      border: 1px solid rgb(222,222,222);
      & .__acomod-image {
        width: 100%;
        height: auto;
      }
      & .__acomod-title {
        margin: 0 1.4rem;
        padding: 1.2rem 0;
        font-size: 19px;
        font-weight: 700;
        border-bottom: 1px solid rgb(222,222,222);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .detalhes-reserva-data {
        padding: .8rem 0;
        margin: 0 1.4rem;
        border-bottom: 1px solid rgb(222,222,222);
        & .detalhes-reserva-data_item {
          display: flex;
          align-items: center;
          padding: .3rem 0;
          & .__img {
            margin-right: .7rem;
            width: 1.65rem;
            height: auto;
          }
          & .__arrow-right-date {
            margin: 0 1rem;
            width: .8rem;
            height: auto;
          }
        }
      }
      & .detalhes-reserva-valor {
        padding: .8rem 0;
        margin: 0 1.4rem;
        & .detalhes-reserva-valor_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        & .detalhes-reserva-valor_item-total {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgb(222,222,222);
          & .__valor-total {
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
    }
  }
}

</style>