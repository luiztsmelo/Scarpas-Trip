import Vue from 'vue'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

Vue.use(VCalendar, {
  locale: 'pt-BR',
  firstDayOfWeek: 1
})
