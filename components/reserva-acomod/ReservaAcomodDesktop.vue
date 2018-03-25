<template>
  <modal
    name="reserva-desktop-modal"
    class="reserva-desktop-modal"
    width="71%"
    height="auto"
    @closed="closedModal">

    <img src="../../assets/img/close-modal.svg" style="cursor:pointer;position:absolute;top:1rem;right:1rem;width:1rem;height:auto" @click="$modal.hide('reserva-desktop-modal')">


    <!-- ******* HEADER PROGRESS ******* -->
    <div class="header-progress">

      <h3 class="__item-progress" :style="etapaProgressed1" @click="backEtapa1">1. Revisar detalhes</h3>
      
      <img src="../../assets/img/arrow-right.svg" class="__arrow-right">

      <h3 class="__item-progress" :style="etapaProgressed2" @click="backEtapa2">2. Mensagem</h3>

      <img src="../../assets/img/arrow-right.svg" class="__arrow-right">

      <h3 class="__item-progress" :style="etapaProgressed3" @click="backEtapa3">3. Pagamento e Confirmação</h3>

    </div><!-- ******* HEADER PROGRESS ******* -->
    


    <!-- ******* ETAPA 1 ******* -->
    <div class="etapa-1" v-if="$store.state.reservaAcomodDesktop1 === true">

      <h1 class="__title">Revisar Detalhes da Viagem</h1>

      <div class="container">

        <!-- Left Container -->
        <div class="left-container">
          <h3>Testando com um texto aqui</h3>
          
        </div><!-- Left Container -->

        <!-- Right Container -->
        <div class="right-container">
          <div class="detalhes-reserva-header">
            <h1 class="__acomod-title">{{ acomod.title }}</h1>
            <progressive-img class="__acomod-img" :src="image1H(acomod)" :placeholder="acomod.imageL1" :aspect-ratio="0.66"/>
          </div>

          <div class="detalhes-reserva-data">
            <div class="detalhes-reserva-data_item">
              <img src="../../assets/img/guest.svg" class="__img">
              <h3>{{ $store.state.reservaAcomod.totalHospedes == '1'? $store.state.reservaAcomod.totalHospedes + ' hóspede' : $store.state.reservaAcomod.totalHospedes + ' hóspedes' }}</h3>
            </div>
            <div class="detalhes-reserva-data_item">
              <img src="../../assets/img/calendar.svg" class="__img" style="transform: scale(.86)">
              <h3>{{ $store.state.reservaAcomod.startDate }}</h3>
              <img src="../../assets/img/arrow-right.svg" class="__arrow-right-date">
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
                <img 
                  src="../../assets/img/info.svg"
                  style="width:.95rem;height:auto;margin-left:.3rem;cursor:pointer"
                  @click="serviceFeeDialog"
                >
                <v-dialog id="service-fee" style="z-index:10000"/>
              </div>
              <h3>R${{ $store.state.reservaAcomod.serviceFeeTotal.toLocaleString() }}</h3>
            </div>

            <div class="detalhes-reserva-valor_item-total" style="padding-top: 1rem">
              <h3>Total</h3>
              <h3>R${{ $store.state.reservaAcomod.valorReservaTotal.toLocaleString() }}</h3>
            </div>
          </div>
          
        </div>
      </div><!-- Right Container -->

      <button class="__next-btn" type="button" @click="nextBtn1">Continuar</button>
      
    </div><!-- ******* ETAPA 1 ******* -->


    <!-- ******* ETAPA 2 ******* -->
    <div class="etapa-2" v-if="$store.state.reservaAcomodDesktop2 === true">

      <h1 class="__title">Diga um oi para {{ acomod.proprietario.split(' ')[0] }}</h1>

      <div class="container">

        <textarea
          autofocus
          maxlength="2000" 
          v-model.lazy="$store.state.reservaAcomod.mensagem"
          :placeholder="'E ai ' +  acomod.proprietario.split(' ')[0] + '! Como vai? Achamos ' + tipoAcomodText + '...'">
        </textarea>

      </div>

      <button class="__next-btn" type="button" @click="nextBtn2">Continuar</button>
      
    </div><!-- ******* ETAPA 2 ******* -->



    <!-- ******* ETAPA 3 ******* -->
    <div class="etapa-3" v-if="$store.state.reservaAcomodDesktop3 === true">

      <h1 class="__title">Pagamento e Confirmação</h1>

      <div class="container">

      </div>

      <button class="__next-btn" type="button" @click="concluirReserva">Confirmar e Pagar</button>
      
    </div><!-- ******* ETAPA 3 ******* -->



  </modal>
</template>

<script>
import supportsWebP from 'supports-webp'

export default {
  methods: {
    closedModal () {
      this.$store.state.clickedReservaAcomod = false
    },
    image1H (acomod) {
      return supportsWebP ? acomod.imageH1W : acomod.imageH1J
    },
    serviceFeeDialog () {
      this.$modal.show('dialog', {
        title: 'Taxa de Serviço',
        text: 'Taxa de ' + this.$store.state.serviceFeeAcomod * 100 + '% cobrada com o intuito de garantir suporte e total segurança em sua reserva caso algum problema aconteça.',
        buttons: [{ title: 'Fechar' }]
      })
    },
    nextBtn1 () {
      this.$store.state.etapaReserva2ok = true, this.$store.commit('m_reservaAcomodDesktop1', false), this.$store.commit('m_reservaAcomodDesktop2', true)
    },
    nextBtn2 () {
      this.$store.state.etapaReserva3ok = true, this.$store.commit('m_reservaAcomodDesktop2', false), this.$store.commit('m_reservaAcomodDesktop3', true)
    },
    concluirReserva () {
      this.$store.dispatch('a_newReservaAcomod')
    },
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
    }
  },
  computed: {
    acomod () {
      return this.$store.state.acomod
    },
    etapaProgressed1 () {
      return this.$store.state.etapaReserva1ok === true ? 'font-weight: 500' : 'cursor: default'
    },
    etapaProgressed2 () {
      return this.$store.state.etapaReserva2ok === true ? 'font-weight: 500' : 'cursor: default'
    },
    etapaProgressed3 () {
      return this.$store.state.etapaReserva3ok === true ? 'font-weight: 500' : 'cursor: default'
    },
    tipoAcomodText () {
      const path = this.acomod.tipoAcomod
      return path === 'Casa' ? 'linda a sua casa' 
           : path === 'Apartamento' ? 'lindo o seu apartamento'
           : path === 'Rancho' ? 'lindo o seu rancho'
           : path === 'Chácara' ? 'linda a sua chácara'
           : path === 'Pousada' ? 'linda a sua pousada'
           : path === 'Camping' ? 'lindo o seu camping'
           : path === 'Sítio' ? 'lindo o seu sítio'
           : path === 'Fazenda' ? 'linda a sua fazenda'
           : path === 'Hostel' ? 'lindo o seu hostel'
           : ''
    },
  }
}
</script>

<style scoped>
@import url('../../assets/css/main.css');


.reserva-desktop-modal {
  z-index: 10000;

  /* ******* HEADER PROGRESS ******* */
  & .header-progress {
    display: flex;
    align-items: center;
    margin: 0 3.5rem;

    & .__item-progress {
      cursor: pointer;
      user-select: none;
      padding: 1.7rem 0 1rem 0;
      font-size: 15px;
      font-weight: 300;
    }
    & .__arrow-right {
      padding: 1.7rem 0 1rem 0;
      width: .8rem; 
      height: auto;
      margin: 0 1.5rem;
    }
  }

  /* ******* ETAPA 1 ******* */
  & .etapa-1 {
    margin: .7rem 3.5rem 4.6rem 3.5rem;
    height: 100%;
    & .__title {
      font-size: 33px;
    }
    & .container {
      margin: 1.9rem 0 1.3rem 0;
      display: flex;
      height: 345px;

      /* Left Container */
      & .left-container {
        flex-basis: 58%;
        border-right: 1px solid rgb(232,232,232);
        padding-right: 1.5rem;
        
      }

      /* Right Container */
      & .right-container {
        flex-basis: 42%;
        padding-left: 1.5rem;
        & .detalhes-reserva-header {
          display: flex;
          align-items: center;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid rgb(232,232,232);
          & .__acomod-img {
            width: 11rem;
            height: auto;
            margin-left: 1rem;
          }
          & .__acomod-title {
            font-size: 16px;
          }
        }
        & .detalhes-reserva-data {
          padding: .8rem 0;
          border-bottom: 1px solid rgb(232,232,232);
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
          & .detalhes-reserva-valor_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .25rem 0;
          }
          & .detalhes-reserva-valor_item-total {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid rgb(232,232,232);
            & h3 {
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  /* ******* ETAPA 2 ******* */
  & .etapa-2 {
    margin: .7rem 3.5rem 4.6rem 3.5rem;
    height: 100%;
    & .__title {
      font-size: 33px;
    }
    & .container {
      margin: 1.9rem 0 1.3rem 0;
      display: flex;
      height: 345px;
      & textarea {
        width: 100%;
        border: none;
        outline: none;
        font-size: 17px;
        font-weight: 400;
        line-height: 32px;
        resize: none;
      }
      & textarea::-webkit-input-placeholder {color: rgb(162, 162, 162)}
      & textarea::-moz-placeholder {color: rgb(162, 162, 162)}
      & textarea:-ms-input-placeholder {color: rgb(162, 162, 162)}
      & textarea:-moz-placeholder {color: rgb(162, 162, 162)}
    }
  }

  /* ******* ETAPA 3 ******* */
  & .etapa-3 {
    margin: .7rem 3.5rem 4.6rem 3.5rem;
    height: 100%;
    & .__title {
      font-size: 33px;
    }
    & .container {
      margin: 1.9rem 0 1.3rem 0;
      display: flex;
      height: 345px;
    }
  }
}


.__next-btn {
  float: right;
  padding: 0 2.1rem;
  font-size: 17px;
  font-weight: 600;
  background: #00D8C7;
  color: white;
  border-radius: 5px;
  height: 2.9rem;
  line-height: 2.8rem;
}

</style>