<template>
  <modal
    name="datepicker"
    width="100%"
    height="100%"
    :adaptive="true"
    transition="datepicker"
    @opened="$store.commit('m_loader', false)">


    <img src="../assets/img/close-mobile.svg" style="cursor:pointer;position:absolute;top:1.2rem;left:7%;width:1rem;height:auto" @click="closeBtn">



    <div class="datepicker-body">


      <v-date-picker
        is-inline
        is-expanded
        mode="range"
        v-model="$store.state.reservaAcomod.periodoReserva"
        :min-date="minDate"
        :disabled-dates="$store.state.disabledDatesAcomod"
        :drag-attribute="attribute"
        :select-attribute="attribute"
        :disabled-attribute="disabledAttribute"
        :theme-styles="datePickerMobileStyle"
        tint-color="#FFA04F"
        show-caps>
      </v-date-picker>
    

    </div>


    <div class="buttons">
      <div class="buttons-body">
        <button type="button" class="__apagar-btn" @click="$store.state.reservaAcomod.periodoReserva = null">Apagar</button>
        <button type="button" class="__confirm-btn" :style="confirmBtnStyle" @click="confirmBtn">Confirmar</button>
      </div>
    </div>
    
  </modal>
</template>

<script>
import { stylesCalendar } from '~/mixins/stylesCalendar'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')

export default {
  mixins: [ stylesCalendar ],
  data() {
    return {
      attribute: {
        popover: {
          hideIndicator: true,
          visibility: 'none'
        }
      }
    }
  },
  methods: {
    closeBtn () {
      this.$modal.hide('datepicker')
      window.history.back(1)
    },
    confirmBtn () {
      if (this.$store.state.reservaAcomod.periodoReserva !== null) {
        this.$modal.hide('datepicker')
        window.history.back(1)
      }
    }
  },
  computed: {
    minDate () {
      return dayjs(new Date()).add(2, 'day').toDate()
    },
    confirmBtnStyle () {
      if (this.$store.state.reservaAcomod.periodoReserva !== null) {
        return 'background: #50CB9D'
      }
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.datepicker-body {
  padding-top: 4.2rem;
}

.buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999999;
  height: 4.5rem;
  width:  100%;
  background: white;
  padding: 0 7%;
  overflow: hidden;
  & .buttons-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    & .__apagar-btn {
      cursor: pointer;
      padding: 0;
      font-size: 16px;
      font-weight: 600;
      background: transparent;
      line-height: 2.8rem;
      height: 2.9rem;
    }
    & .__confirm-btn {
      cursor: pointer;
      padding: 0 1.2rem;
      font-size: 16px;
      font-weight: 600;
      background: rgb(212, 212, 212);
      color: white;
      line-height: 2.9rem;
      height: 3rem;
      border-radius: 5px;
    }
  }
}


/* TRANSITION */
.datepicker-enter {
  transform: translateY(100%);
}
.datepicker-leave-active {
  transform: translateY(100%);
}

</style>