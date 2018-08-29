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
        @input="inputDate"
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
        <button type="button" class="__apagar-btn" @click="$store.state.reservaAcomod.periodoReserva = null">Limpar</button>
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
    inputDate () { /* Em caso de alterações, lembrar também de alterar _id */
      this.periodoReserva.start = Date.parse(this.periodoReserva.start)
      this.periodoReserva.end = Date.parse(this.periodoReserva.end)

      const startDate = dayjs(this.periodoReserva.start)
      const endDate = dayjs(this.periodoReserva.end)

      const noites = endDate.diff(startDate, 'day')
      this.$store.commit('m_noites', noites)

      const valorNoitesTotal = Math.round(this.acomod.valorNoite * noites)
      this.$store.commit('m_valorNoitesTotal', valorNoitesTotal)

      const serviceFeeTotal = Math.round(valorNoitesTotal * this.$store.state.serviceFeeAcomod)
      this.$store.commit('m_serviceFeeTotal', serviceFeeTotal)

      const valorReservaTotal = valorNoitesTotal + this.acomod.limpezaFee + serviceFeeTotal
      this.$store.commit('m_valorReservaTotal', valorReservaTotal)

      this.$store.state.reservaAcomod.limpezaFee = this.acomod.limpezaFee

      const parcelas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => {
        return {
          id: n,
          valorParcela: Number( (valorReservaTotal/n).toFixed(2) )
        }
      })
      this.$store.commit('m_parcelas', parcelas)
    },
    confirmBtn () {
      if (this.$store.state.reservaAcomod.periodoReserva !== null) {
        this.$modal.hide('datepicker')
        window.history.back(1)
      } else {
        this.$store.commit('show_alert', {
          type: 'warning',
          title: 'Ops',
          message: 'Adicione as datas de sua viagem.',
        })
      }
    }
  },
  computed: {
    acomod () { return this.$store.state.acomod },
    periodoReserva () {return this.$store.state.reservaAcomod.periodoReserva },
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
  height: 4.7rem;
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
      padding: 0;
      font-size: 16px;
      font-weight: 600;
      background: transparent;
      height: 3.2rem;
    }
    & .__confirm-btn {
      font-size: 16px;
      font-weight: 600;
      background:rgb(237, 237, 237);
      color: white;
      width: 8.3rem;
      height: 3.2rem;
      border-radius: 5px;
      transition: var(--main-transition);
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