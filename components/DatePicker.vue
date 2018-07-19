<template>
  <modal
    name="datepicker"
    width="100%"
    height="100%"
    :adaptive="true"
    transition="datepicker"
    @opened="$store.commit('m_loader', false)">


    <img src="../assets/img/close-modal.svg" style="cursor:pointer;position:absolute;top:1.2rem;left:7%;width:1.1rem;height:auto" @click="$modal.hide('datepicker')">



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
        tint-color="#3A6378"
        show-caps>
      </v-date-picker>
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
  computed: {
    minDate () {
      return dayjs(new Date()).add(2, 'day').toDate()
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.datepicker-body {
  margin-top: 4rem;
  & .__title {
    padding: 0 7% 1.7rem 7%;
    line-height: 31px;
    font-size: 26px;
    font-weight: 700;
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