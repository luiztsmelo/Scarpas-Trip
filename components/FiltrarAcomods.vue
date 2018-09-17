<template>
  <transition name="filtrar-acomods-animation">
    <div class="filtrar-acomods-modal" v-if="$store.state.showFiltrarAcomods">
      <div class="filtrar-acomods-body">

        <img class="back-btn" src="../assets/img/back.svg" @click="backBtn">


        <h1 class="__title">Filtrar por:</h1>
        


      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    backBtn () {
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
  & .back-btn {
    margin: 1rem 0;
    cursor: pointer;
    width: 1.27rem;
    height: auto;
  }
  & .filtrar-acomods-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    padding: 0 7%;
    & .__title {
      padding: 2rem 0;
      font-size: 27px;
    }
  }
}

/* TRANSITIONS */
.filtrar-acomods-animation-enter, .filtrar-acomods-animation-leave-active {
  transform: translateY(100%);
}

</style>