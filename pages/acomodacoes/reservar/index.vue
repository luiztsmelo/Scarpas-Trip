<template>
  <div class="reservar">
    

    <!-- ******* FLEX LEFT ******* -->
    <div class="flex-left">

      <div class="title-box">
        <h1 class="__number">1</h1>
        <h1 class="__title">Regras {{ tipoAcomodTitle }}</h1>
      </div>
      
    </div><!-- ******* FLEX LEFT ******* -->



    <!-- ******* FLEX RIGHT ******* -->
    <div class="flex-right">

      <progressive-img class="__acomod-image" :src="image1H(acomod)" :placeholder="acomod.imageL1" :aspect-ratio="2/3"/>

      <h1 class="__acomod-title">{{ acomod.title }}</h1>

      <div class="detalhes-reserva-data">
        <div class="detalhes-reserva-data_item">
          <img src="../../../assets/img/guest.svg" class="__img">
          <h3>{{ $store.state.reservaAcomod.totalHospedes == '1'? $store.state.reservaAcomod.totalHospedes + ' hóspede' : $store.state.reservaAcomod.totalHospedes + ' hóspedes' }}</h3>
        </div>
        <div class="detalhes-reserva-data_item">
          <img src="../../../assets/img/calendar.svg" class="__img" style="transform: scale(.86)">
          <h3>{{ $store.state.reservaAcomod.startDate }}</h3>
          <img src="../../../assets/img/arrow-right.svg" class="__arrow-right-date">
          <h3>{{ $store.state.reservaAcomod.endDate }}</h3>
        </div>
      </div>

      <div class="detalhes-reserva-valor" v-if="$store.state.reservaAcomod.valorReservaTotal !== null">
        <div class="detalhes-reserva-valor_item">
          <h3>R${{ acomod.valorDiariaNormal.toLocaleString() }} x {{ $store.state.reservaAcomod.noites }} noites</h3>
          <h3 id="valor">R${{ $store.state.reservaAcomod.valorNoitesTotal.toLocaleString() }}</h3>
        </div>

        <div class="detalhes-reserva-valor_item" style="padding-bottom: 1rem">
          <div style="display:flex;flex:row;align-items:center">
            <h3>Taxa de serviço</h3>
            <img src="../../../assets/img/info.svg" style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer" @click="serviceFeeDialog">
            <v-dialog id="service-fee" style="z-index:10000"/>
          </div>
          <h3>R${{ $store.state.reservaAcomod.serviceFeeTotal.toLocaleString() }}</h3>
        </div>

        <div class="detalhes-reserva-valor_item-total" style="padding-top: 1rem">
          <h3>Total</h3>
          <h3 class="__valor-total">R${{ $store.state.reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
        </div>
      </div>

    </div> <!-- ******* FLEX RIGHT ******* -->


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
    image1H (acomod) {
      return supportsWebP ? acomod.imageH1W : acomod.imageH1J
    },
    image2H (acomod) {
      return supportsWebP ? acomod.imageH2W : acomod.imageH2J
    },
    image3H (acomod) {
      return supportsWebP ? acomod.imageH3W : acomod.imageH3J
    },
    serviceFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Serviço',
        text: 'Taxa de ' + Math.round(this.$store.state.serviceFeeAcomod * 100) + '% cobrada com o intuito de garantir suporte e total segurança em sua estadia caso algum problema aconteça.',
        buttons: [{ title: 'OK' }]
      })
    }
  },
  computed: {
    acomod () {
      return this.$store.state.acomod
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
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      firebase.firestore().collection('acomods').doc(vm.$store.state.acomod.acomodID).collection('visited').doc(vm.$store.state.visitedID).update({ 
        wentToReservaPage: true
      })
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('m_isReservar', false)
    if (to.params.id !== this.acomod.acomodID) {
      this.$store.dispatch('a_resetReservaAcomod')
      next()
    } else {
      next()
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.reservar {
  display: flex;
  padding: 8rem 12% 4rem;

  /* ******* FLEX LEFT ******* */
  & .flex-left {
    flex: 65%;
    & .title-box {
      display: flex;
      align-items: center;
      & .__number {
        font-size: 37px;
        padding-right: .8rem;
        color: rgb(200,200,200);
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
          width: 1.8rem;
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
        padding: .23rem 0;
      }
      & .detalhes-reserva-valor_item-total {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgb(222,222,222);
        & .__valor-total {
          font-size: 19px;
          font-weight: 600;
        }
      }
    }
  }
}

</style>