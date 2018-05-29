import Vue from 'vue'
import money from 'v-money'

Vue.use(money, {
  precision: 0,
  prefix: 'R$ ',
  decimal: ',',
  thousands: '.',
  masked: false
})
