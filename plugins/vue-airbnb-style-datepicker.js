import Vue from 'vue'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'assets/css/vue-airbnb-style-datepicker.css'

Vue.use(AirbnbStyleDatepicker, {
  sundayFirst: false,
  dateLabelFormat: 'dddd, MMMM D, YYYY',
  days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
  daysShort: ['2ª', '3ª', '4ª', '5ª', '6ª', 'Sá', 'Do'],
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  colors: {
    selected: '#FFA04F',
    inRange: '#FFCA9D',
    selectedText: '#fff',
    text: '#161616',
    inRangeBorder: '#dedede',
    disabled: '#fff'
  },
  texts: {
    apply: 'Aplicar',
    cancel: 'Limpar'
  }
})
