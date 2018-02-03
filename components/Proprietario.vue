<template>
  <transition name="proprietario-animation">
    <div class="proprietario-modal" v-if="$store.state.showProprietario">
      <div class="proprietario-body">

        <!-- BACK BUTTON -->
        <div class="back-box">
          <div class="back-body">
            <img class="__back-btn" src="../assets/img/back.svg" alt="voltar" @click="$store.state.showProprietario = false">
          </div>
        </div><!-- BACK BUTTON -->

        <img class="__img" :src="acomod.photoURL">
        <h1 class="__name">{{ acomod.proprietario }}</h1>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    acomod () {
      return this.$store.state.acomod
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.proprietario-modal {
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
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
  & .proprietario-body {
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;
    & .__img {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      margin-top: 4rem;
    }
    & .__name {
      font-size: 27px;
      padding: 1rem 0;
    }
  }
}

/* TRANSITIONS */
.proprietario-animation-enter {
  transform: translateY(100%);
}
.proprietario-animation-leave-active {
  transform: translateY(100%);
}
</style>