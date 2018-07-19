<template>
  <transition name="datepicker">
    <div class="datepicker-modal" v-if="$store.state.showDatePicker">

      <div class="datepicker-body">


        <img src="../assets/img/close-modal.svg" style="cursor:pointer;position:absolute;top:1.2rem;left:7%;width:1rem;height:auto" @click="$store.commit('m_showDatePicker', false)">



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
          tint-color="#3A6378"
          show-caps>
        </v-date-picker>


        <div class="footer">
          <div class="footer-body">

            <button type="button" class="__apagar-btn" @click="$store.state.reservaAcomod.periodoReserva = null">Apagar</button>

            <button type="button" class="__salvar-btn" :style="saveBtnStyle" @click="$store.commit('m_showDatePicker', false)">Salvar</button>

          </div>
        </div>
        

      </div>

    </div>
  </transition>
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
  computed: {
    minDate () {
      return dayjs(new Date()).add(2, 'day').toDate()
    },
    saveBtnStyle () {
      if (this.$store.state.reservaAcomod.periodoReserva !== null) {
        return 'background: #3A6378'
      }
    }
  },
  updated () {
    this.$store.commit('m_loader', false)
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.datepicker-modal {
  position: fixed;
  z-index: 99999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition);
  & .datepicker-body {
    position: relative;
    display: flex;
    flex-flow: column;
    height: 100%;
    padding-top: 4.2rem;
    & .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 999999;
      height: 4.4rem;
      width: 100%;
      background: white;
      padding: 0 7%;
      & .footer-body {
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
        & .__salvar-btn {
          cursor: pointer;
          padding: 0 1.2rem;
          font-size: 16px;
          font-weight: 600;
          background: rgb(212, 212, 212);
          color: white;
          line-height: 2.8rem;
          height: 2.9rem;
          border-radius: 5px;
          transition: all .2s ease;
        }
      }
    }
  }
}

/* TRANSITIONS */
.datepicker-enter {
  transform: translateY(100%);
}
.datepicker-leave-active {
  transform: translateY(100%);
}
</style>