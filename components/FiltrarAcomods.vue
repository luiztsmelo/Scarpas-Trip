<template>
  <transition name="filtrar-acomods-animation">
    <div class="filtrar-acomods-modal" v-if="$store.state.showFiltrarAcomods">
      <div class="filtrar-acomods-body">

        <img src="../assets/img/close-mobile.svg" style="cursor:pointer;position:absolute;top:1.2rem;left:7%;width:1rem;height:auto" @click="closeBtn">


        <h1 class="__title">Filtrar acomodações por:</h1>
        
        <button class="__filtrar-btn">Filtrar</button>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    closeBtn () {
      this.$store.commit('m_showFiltrarAcomods', false)
      window.history.back(1)
    }
  },
  computed: {
    hash () { return this.$route.hash }
  }, 
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showFiltrarAcomods', false)
      }
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.filtrar-acomods-modal {
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition) !important;
  & .filtrar-acomods-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    padding: 4rem 7% 0;
    & .__title {
      line-height: 35px;
      font-size: 29px;
    }
    & .__filtrar-btn {
      position: fixed;
      left: 7%;
      bottom: 1rem;
      height: 3.1rem;
      width: 86%;
      background: var(--colorAcomod);
      color: white;
      font-weight: 600;
      border-radius: 5px;
    }
  }
}

/* TRANSITIONS */
.filtrar-acomods-animation-enter, .filtrar-acomods-animation-leave-active {
  transform: translateY(100%);
}

</style>