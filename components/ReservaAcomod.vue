<template>
  <transition name="reserva-animation">
    <div class="reserva-acomod" v-if="showReservaAcomod">

      <!-- BACK BUTTON -->
      <div class="back-box">
        <div class="back-body">
          <img class="__back-btn" src="../assets/img/back.svg" alt="voltar" @click="$store.commit('m_showReservaAcomod', false)">
        </div>
      </div><!-- BACK BUTTON -->


      <div class="reserva-acomod-body">
        <h1 class="__title">Qual será o período da reserva?</h1>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    showReservaAcomod () {
      return this.$store.state.showReservaAcomod
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.reserva-acomod {
  position: fixed;
  z-index: 9999;
  overflow: hidden;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--menus-transition);
  & .back-box {
    position: fixed;
    background: white;
    width:  100%;
    & .back-body {
      display: flex;
      height: 3rem;
      & .__back-btn {
        align-items: center;
        transform: translateY(2px);/* A imagem ta errada */
        cursor: pointer;
        width: 1.05rem;
        height: auto;
        filter: invert(75%);
        margin-left: 7%;
      }
    }
  }
  & .reserva-acomod-body {
    display: flex;
    flex-flow: column;
    padding: 5rem 7% 0 7%;
    height: 100%;
    & .__title {
      line-height: 35px;
      font-size: 29px;
      font-weight: 600;
    }
  }
}


/* TRANSITIONS */
.reserva-animation-enter {
  transform: translateX(100%);
}
.reserva-animation-leave-active {
  transform: translateX(100%);
}
</style>