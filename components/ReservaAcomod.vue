<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-if="showReservaAcomod">

      <!-- BACK BUTTON -->
      <div class="back-box">
        <div class="back-body">
          <img class="__back-btn" src="../assets/img/back.svg" alt="voltar" @click="$store.commit('m_showReservaAcomod', false)">
        </div>
      </div><!-- BACK BUTTON -->


      <div class="reserva-acomod-body">

        <h1 class="__title">Quantas pessoas irão se hospedar?</h1>

        <div class="__item">
          <select v-model="$store.state.reservaAcomod.totalHospedes">
            <option v-for="n in 20">{{ n }}</option>
            <option>Mais de 20</option>
          </select>
        </div>
        

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
          color: 'rgb(52, 52, 52)',
          border: '0',
          padding: '6px 9px 0 9px',
          background: 'white',
          width: '100%'
        },
        header: {
          padding: '0 9px',
        },
        headerArrows: {
          fontSize: '1.4rem',
        },
        headerTitle: {
          fontSize: '18px',
          fontWeight: '300'
        },
        weekdays: {
          color: 'rgb(52, 52, 52)',
          fontWeight: '600',
          padding: '20px 5px 10px 5px',
        },
        dayContent: {
          fontWeight: '300',
          fontSize: '16px',
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
    margin: 1.5rem 0 6rem 0;
    height: 100%;
    & .__title {
      padding: 3.5rem 7% 1.5rem 7%;
      line-height: 35px;
      font-size: 29px;
      font-weight: 600;
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