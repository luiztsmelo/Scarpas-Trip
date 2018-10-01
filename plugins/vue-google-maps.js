import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCMgSOhCFZQguemNVK9vMWkuj1YiIIqCEw',
    libraries: 'places'
  }
})
