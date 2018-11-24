import Vue from 'vue'

Vue.directive('scroll', {
  inserted: function (el, binding) {
    if (process.browser) {
      let f = function (evt) {
        if (binding.value(evt, el)) {
          window.removeEventListener('scroll', f)
        }
      }
      window.addEventListener('scroll', f)
    }
  }
})
