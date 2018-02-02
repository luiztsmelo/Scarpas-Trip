<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-if="showReservaAcomod">

      <!-- BACK BUTTON -->
      <div class="back-box">
        <div class="back-body">
          <img class="__back-btn" src="../assets/img/back.svg" alt="voltar" @click="backBtn">
        </div>
      </div><!-- BACK BUTTON -->


      <div class="reserva-acomod-body">
        


        <!-- ########## DICAS INICIAIS PG.0 ########## -->
        <div class="etapa-reserva-box" v-show="$store.state.reservaAcomod0">

          <h1 class="__title">Antes de continuar, algumas informações importantes:</h1>

          <button type="button" class="__next-btn" @click="nextBtn0">Continuar</button>
      
        </div><!-- ########## DICAS INICIAIS PG.0 ########## -->



        <!-- ########## HÓSPEDES PG.1 ########## -->
        <div class="etapa-reserva-box" v-show="$store.state.reservaAcomod1">
          <h1 class="__title">Quantas pessoas irão se hospedar?</h1>

          <div class="__item">
            <select v-model="$store.state.reservaAcomod.totalHospedes">
              <option v-for="n in 20">{{ n }}</option>
              <option>Mais de 20</option>
            </select>
          </div>

          <button type="button" class="__next-btn" @click="nextBtn1">Continuar</button>

        </div><!-- ########## HÓSPEDES PG.1 ########## -->
        


        <!-- ########## DATA PG.2 ########## -->
        <div class="etapa-reserva-box" v-show="$store.state.reservaAcomod2">
          <h1 class="__title">Qual será o período da reserva?</h1>

          <v-date-picker
            is-inline
            mode='range'
            v-model='dataReservaAcomod'
            :drag-attribute='myAttribute'
            :select-attribute='myAttribute'
            :available-dates='{start: new Date(), end: null}'
            :month-labels='monthLabels'
            :weekday-labels='weekdayLabels'
            :theme-styles='themeStyles'
            select-color='#00D8C7'
            show-caps
            drag-color='#00D8C7'
            >
          </v-date-picker>

          <button type="button" class="__next-btn" @click="nextBtn2">Continuar</button>

        </div><!-- ########## DATA PG.2 ########## -->



      </div>

    </div>
  </transition>
</template>

<script>
import PopoverReservaAcomod from '~/components/PopoverReservaAcomod.vue'

export default {
  data() {
    return {
      dataReservaAcomod: null,
      myAttribute: {
        popover: {
          hideIndicator: true,
          component: PopoverReservaAcomod
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
        dayPopoverContent: {
          background: '#00D8C7',
          color: 'white',
          border: 'none'
        },
      } 
    }
  },
  methods: {
    backBtn () {
      if (this.$store.state.reservaAcomod0 === true) {
        this.$store.commit('m_showReservaAcomod', false)
      }
      if (this.$store.state.reservaAcomod1 === true) {
        this.$store.commit('m_reservaAcomod1', false)
        this.$store.commit('m_reservaAcomod0', true)
      }
      if (this.$store.state.reservaAcomod2 === true) {
        this.$store.commit('m_reservaAcomod2', false)
        this.$store.commit('m_reservaAcomod1', true)
      }
      if (this.$store.state.reservaAcomod3 === true) {
        this.$store.commit('m_reservaAcomod3', false)
        this.$store.commit('m_reservaAcomod2', true)
      }
    },
    nextBtn0 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod0', false), this.$store.commit('m_reservaAcomod1', true)
      }
    },
    nextBtn1 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod1', false), this.$store.commit('m_reservaAcomod2', true)
      }
    },
    nextBtn2 () {
      if (1<2) {
        this.$store.commit('m_reservaAcomod2', false), this.$store.commit('m_reservaAcomod3', true)
      }
    },
  },
  computed: {
    showReservaAcomod () {
      return this.$store.state.showReservaAcomod
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.reserva-acomod {
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--menus-transition);
  & .back-box {
    position: fixed;
    background: white;
    width:  100%;
    & .back-body {
      display: flex;
      height: 3rem;
      & .__back-btn {
        align-items: center;
        transform: translateY(2px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.05rem;
        height: auto;
        filter: invert(75%);
        margin-left: 7%;
      }
    }
  }
  & .reserva-acomod-body {
    display: flex;
    flex-flow: column;
    margin: 1rem 0 0 0;
    height: 100%;
    & .etapa-reserva-box {
        & .__title {
        padding: 4rem 7% 2rem 7%;
        line-height: 35px;
        font-size: 27px;
        font-weight: 700;
      }
      & .__item {
        padding: 0 7%;
        & select {
          width: 100%;
          font-size: 18px;
          font-weight: 300;
          background: white;
          color: var(--color01);
          padding: .5rem 0 .6rem 0;
          border: none;
          border-bottom: 1px solid rgb(222, 222, 222);
          outline: none;
        }
      }
      & .__next-btn {
        position: fixed;
        bottom: 1.3rem;
        right: 7%;
        font-size: 16px;
        font-weight: 600;
        background: #08C8C1;
        color: white;
        padding: .7rem 0;
        width:  9rem;
        border-radius: 4px;
      }
    }
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