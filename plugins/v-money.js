import Vue from 'vue'
import money from 'v-money'

Vue.use(money, {
  precision: 2,
  prefix: 'R$ ',
  decimal: ',',
  thousands: '.',
  masked: true
})
