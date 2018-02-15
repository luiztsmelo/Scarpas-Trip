<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-if="showReservaAcomod">

      <!-- BACK BUTTON -->
      <div class="back-bar">
        <div class="back-box" @click="backBtn">
          <img class="__back-btn" src="../assets/img/back.svg" alt="voltar">
        </div>
      </div><!-- BACK BUTTON -->


      <div class="reserva-acomod-body">
        


        <!-- ########## DICAS INICIAIS PG.0 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod0">

          <h3 class="etapas">1 de 5 etapas</h3>

          <h1 class="__title">Antes de continuar, algumas informações importantes:</h1>


          <div class="info-box">
            
            <div class="info-item">
              <span class="__info-number">1</span>
              <h3 class="__info-text">A Escarpas Trip somente faz a reserva. O pagamento deverá ser feito diretamente com o proprietário.</h3>
            </div>
        
            <div class="info-item">
              <span class="__info-number">2</span>
              <h3 class="__info-text">Caso haja alguma dúvida sobre a reserva, entre em contato com o proprietário, <a class="highlight" @click="$store.commit('m_showProprietario', true), hashProprietario()">{{ acomod.proprietario }}</a>.</h3>
            </div>

          </div>
          

          <button type="button" class="__next-btn" @click="nextBtn0">Continuar</button>
      
        </div><!-- ########## DICAS INICIAIS PG.0 ########## -->



        <!-- ########## HÓSPEDES PG.1 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod1">

          <h3 class="etapas">2 de 5 etapas</h3>

          <h1 class="__title">Quantas pessoas irão se hospedar?</h1>


          <div class="__item">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option v-for="n in totalHospedesArray">{{ n }}</option>
            </select>
          </div>


          <button type="button" class="__next-btn" @click="nextBtn1">Continuar</button>

          <!-- <button type="button" class="__next-btn" v-else>
            <div class="spinner"></div>
          </button> -->

        </div><!-- ########## HÓSPEDES PG.1 ########## -->
        


        <!-- ########## DATA PG.2 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod2">

          <h3 class="etapas">3 de 5 etapas</h3>

          <h1 class="__title">Qual será o período da reserva?</h1>


          <v-date-picker
            is-inline
            is-required
            mode='range'
            v-model='$store.state.reservaAcomod.periodoReserva'
            :min-date='today'
            :disabled-dates='disabledDates'
            :drag-attribute='myAttribute'
            :select-attribute='myAttribute'
            :disabled-attribute='disabledAttribute'
            :month-labels='monthLabels'
            :weekday-labels='weekdayLabels'
            :theme-styles='themeStyles'
            tint-color='#00D8C7'
            show-caps
            >
          </v-date-picker>


          <button type="button" class="__next-btn" @click="nextBtn2">Continuar</button>

        </div><!-- ########## DATA PG.2 ########## -->



        <!-- ########## IDENTIFICAÇÃO PG.3 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod3">

          <h3 class="etapas">4 de 5 etapas</h3>

          <h1 class="__title">Sua identificação</h1>

          <h3 style="padding: 0 7% .5rem 7%" v-if="this.$store.state.reservaAcomod.reservante === null">Obter dados com:</h3>

          <div class="signin-btns" v-if="$store.state.reservaAcomod.reservante === null">
            <button type="button" class="facebook-btn" @click="facebookSignIn()">Facebook</button>
            <button type="button" class="google-btn" @click="googleSignIn()">Google</button>
          </div>

          <h3 style="padding: 1rem 7% 0 7%" v-if="this.$store.state.reservaAcomod.reservante === null">Não se preocupe, somente obteremos seu nome e e-mail.</h3>

          <h3 style="padding: 0 7% 0 7%" v-if="$store.state.reservaAcomod.reservante !== null">Só mais algumas informações importantes:</h3>

          <div v-if="$store.state.reservaAcomod.reservante !== null">
            <div class="item-form">
              <label>Celular</label>
              <masked-input
                type="tel"
                v-model="$store.state.reservaAcomod.celular"
                :mask="['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                :guide="true"
                placeholder="(__) _____-____"
                placeholderChar="_">
              </masked-input>
            </div>
          </div>


          <button type="button" class="__next-btn" @click="nextBtn3">Continuar</button>

        </div><!-- ########## IDENTIFICAÇÃO PG.3 ########## -->



        <!-- ########## FINALIZAR PG.4 ########## -->
        <div class="etapa-reserva-box" v-if="$store.state.reservaAcomod4">

          <h3 class="etapas">5 de 5 etapas</h3>

          <h1 class="__title">Excelente escolha {{ firstName }}! Veja se está tudo certo:</h1>

        


          <button type="button" class="__next-btn" @click="concluirReserva">Fechar Reserva</button>

        </div><!-- ########## FINALIZAR PG.4 ########## -->



      </div>

    </div>
  </transition>
</template>

<script>
import PopoverReservaAcomod from '~/components/PopoverReservaAcomod.vue'
import MaskedInput from 'vue-text-mask'

export default {
  components: { 
    MaskedInput
  },
  data() {
    return {
      loadingBtns: {
        loader1: false,
        loader2: false,
        loader3: false,
        loader4: false,
      },
      myAttribute: {
        popover: {
          hideIndicator: true,
          component: PopoverReservaAcomod
        }
      },
      disabledAttribute: {
        contentStyle: {
          textDecoration: 'line-through',
          color: '#DADADA'
        },
        // We need to override the default `dayContentHover` theme style set by `v-date-picker`
        contentHoverStyle: {
          cursor: 'default',
          backgroundColor: 'transparent',
        },
      },
      monthLabels: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      weekdayLabels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      themeStyles: {
        wrapper: {
          color: 'rgb(62, 62, 62)',
          border: '0',
          padding: '6px 9px 0 9px',
          background: 'white',
          width: '100%',
          minHeight: '300px'
        },
        header: {
          padding: '0 9px',
        },
        headerArrows: {
          fontSize: '1.4rem',
        },
        headerTitle: {
          fontSize: '16px',
          fontWeight: '400'
        },
        weekdays: {
          color: 'rgb(62, 62, 62)',
          fontWeight: '700',
          padding: '15px 5px 8px 5px',
        },
        dayCell: {
          height: '30px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '15px',
        },
        dayCellNotInMonth: {
          color: '#DADADA'
        },
        dayPopoverContent: {
          background: '#00D8C7',
          color: 'white',
          border: 'none'
        },
      } 
    }
  },
  methods: {
    googleSignIn () {
      this.$store.dispatch('a_googleSignIn')
    },
    facebookSignIn () {
      this.$store.dispatch('a_facebookSignIn')
    },
    hashProprietario () {
       window.location.hash = "contato"
    },
    backBtn () {
      if (this.$store.state.reservaAcomod0 === true) {
        window.history.back(1)
        this.$store.commit('m_showReservaAcomod', false)
      }
      if (this.$store.state.reservaAcomod1 === true) {
        window.history.back(1)
        window.location.hash = "reserva1"
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod0', true)
      }
      if (this.$store.state.reservaAcomod2 === true) {
        window.history.back(1)
        window.location.hash = "reserva2"
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod1', true)
      }
      if (this.$store.state.reservaAcomod3 === true) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod2', true)
      }
      if (this.$store.state.reservaAcomod4 === true) {
        window.history.back(1)
        this.$store.commit('m_reservaAcomod4', false)
        this.$store.commit('m_reservaAcomod3', true)
      }
    },
    nextBtn0 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod0', false), this.$store.commit('m_reservaAcomod1', true), window.location.hash = "reserva2"
      }
    },
    nextBtn1 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod1', false), this.$store.commit('m_reservaAcomod2', true), window.location.hash = "reserva3"
      }
    },
    nextBtn2 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod2', false), this.$store.commit('m_reservaAcomod3', true), window.location.hash = "reserva4"
      }
    },
    nextBtn3 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod3', false), this.$store.commit('m_reservaAcomod4', true), window.location.hash = "reserva5"
      }
    },
    concluirReserva () {

    }
  },
  computed: {
    acomod () {
      return this.$store.state.acomod
    },
    showReservaAcomod () {
      return this.$store.state.showReservaAcomod
    },
    firstName () {
      let fullName = this.$store.state.reservaAcomod.reservante.split(' ')
      let firstName = fullName[0]
      return firstName
    },
    totalHospedesArray () {
      return Array.from({length: this.acomod.totalHospedes}, (v, k) => k+1)
    },
    hash () {
      return this.$route.hash
    },
    today () {
      return new Date().getTime()
    },
    disabledDates () {
      return 
    }
  },
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showReservaAcomod', false)
        this.$store.commit('m_reservaAcomod0', false)
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
      } 
      if (value === '#reserva1') {
        this.$store.commit('m_showProprietario', false)
        this.$store.commit('m_reservaAcomod0', true)
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
      } 
      if (value === '#reserva2') {
        this.$store.commit('m_reservaAcomod0', false)
        this.$store.commit('m_reservaAcomod1', true)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
      } 
      if (value === '#reserva3') {
        this.$store.commit('m_reservaAcomod0', false)
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', true)
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod4', false)
      } 
      if (value === '#reserva4') {
        this.$store.commit('m_reservaAcomod0', false)
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod3', true)
        this.$store.commit('m_reservaAcomod4', false)
      } 
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.reserva-acomod {
  position: fixed;
  z-index: 9999;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--menus-transition);
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
  & .reserva-acomod-body {
    display: flex;
    flex-flow: column;
    margin: 1rem 0 0 0;
    height: 100%;
    & .etapa-reserva-box {
      & .etapas {
        padding: 2.8rem 7% 0.2rem 7%;
        font-size: 13px;
        font-weight: 600;
        color: rgb(140, 140, 140);
      }
      & .__title {
        padding: 0 7% 2rem 7%;
        line-height: 35px;
        font-size: 27px;
        font-weight: 700;
      }
      & .info-box {
        display: flex;
        flex-flow: column;
        padding: 0 7%;
        & .info-item {
          display: flex;
          margin-bottom: 1.5rem;
          & .__info-number {
            font-size: 27px;
            font-weight: 600;
            line-height: 28px;
            color: #00D8C7;
            margin-right: .6rem;
          }
          & .__info-text {
          }
          & .highlight {
            color: #00BAAC;
          }
        }
      }
      
      & .__item {
        padding: 0 7%;
        & select {
          width: 100%;
          font-size: 17px;
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: .5rem 0 .6rem 0;
          border: none;
          border-bottom: 1px solid rgb(222, 222, 222);
          outline: none;
        }
      }

      & .item-form {
      padding: 0 7%;
      display: flex;
      flex-flow: column;
      margin: 1.7rem 0;
        & label {
          font-weight: 700;
          font-size: 15px;
        }
        & input {
          width: 100%;
          font-size: var(--fontSizeAnuncioText);
          font-weight: 400;
          background: white;
          color: var(--color01);
          padding: .6rem 0 .4rem 0;
          border: none;
          border-bottom: 1px solid rgb(222, 222, 222);
          outline: none;
        }
      }

      & .signin-btns {
        display: flex;
        padding: 0 7%;
      }

      & .__next-btn {
        position: fixed;
        bottom: 1.3rem;
        right: 7%;
        font-size: 16px;
        font-weight: 600;
        background: #08C8C1;
        color: white;
        height: 2.5rem;
        width:  9rem;
        border-radius: 4px;
      }
    }
  }
}



@keyframes spin { 
  from { 
    transform: rotate(0deg); 
  } to { 
    transform: rotate(360deg); 
  }
}
/* TRANSITIONS */
.reserva-animation-enter {
  transform: translateX(100%);
}
.reserva-animation-leave-active {
  transform: translateX(100%);
}
</style>