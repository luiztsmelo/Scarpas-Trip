<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-if="$store.state.showReservaAcomod">


      <div class="reserva-acomod-body">

        <img class="back-btn" src="../../assets/img/back.svg" @click="backBtn" ref="backBtn">



      </div>

    </div>
  </transition>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import MaskedInput from 'vue-text-mask'
import DatePicker from '@/components/DatePicker'
import { tipoAcomod } from '@/mixins/tipoAcomod'
import scrollIntoView from 'scroll-into-view'

export default {
  components: { MaskedInput, DatePicker },
  mixins: [ tipoAcomod ],
  data () {
    return {
    }
  },
  methods: {
    scrollTop () {
      scrollIntoView(this.$refs.backBtn, {time: 0})
    }
  },
  computed: {
    hash () { return this.$route.hash }
  }
}
</script>

<style scoped>

.reserva-acomod {
  position: fixed;
  z-index: 9998;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  overflow-y: auto;
  transition: var(--main-transition);
  & .reserva-acomod-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    & .back-btn {
      margin: 1rem 7%;
      cursor: pointer;
      width: 1.27rem;
      height: auto;
    }
  }
}


/* TRANSITIONS */
.reserva-animation-enter, .reserva-animation-leave-active {
  transform: translateX(100%);
}


.has-error-label {
  color: #F31431 !important;
}
.has-error {
  color: #F31431 !important;
  border-bottom: 1px solid #F31431 !important;
}
</style>