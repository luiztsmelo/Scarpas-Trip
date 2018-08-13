<template>
  <transition name="parcelas">

    <div class="parcelas-modal" v-if="$store.state.showParcelas">

      <div class="parcelas-body">


        <img class="back-btn" src="../assets/img/back.svg" @click="backBtn" ref="backBtn">

        <h1 class="__title">Quantas Parcelas?</h1>



      </div>

    </div>

  </transition>
</template>

<script>
export default {
  methods: {
    backBtn () {
      this.$store.commit('m_showParcelas', false)
      /* window.history.back(1) */
    }
  },
  computed: {
    hash () { return this.$route.hash }
  }, 
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showParcelas', false)
      }
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.parcelas-modal {
  position: fixed;
  z-index: 9999999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition);
  & .parcelas-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    & .back-btn {
      margin: 1rem 7%;
      cursor: pointer;
      width: 1.27rem;
      height: auto;
    }
    & .__title {
      padding: 0 7% 1.9rem;
      line-height: 35px;
      font-size: 29px;
      font-weight: 700;
      user-select: none;
    }
  }
}

/* TRANSITIONS */
.parcelas-enter, .parcelas-leave-active {
  transform: translateY(100%);
}
</style>