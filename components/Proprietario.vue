<template>
  <transition name="proprietario-animation">
    <div class="proprietario-modal" v-if="$store.state.showProprietario">
      <div class="proprietario-body">

        <!-- BACK BUTTON -->
        <div class="back-bar">
          <div class="back-box" @click="backBtn">
            <img class="__back-btn" src="../assets/img/back.svg" alt="voltar">
          </div>
        </div><!-- BACK BUTTON -->


        <div class="info-header">
          <img class="__img" :src="host.photoURL">
          <h1 class="__name">{{ host.fullName }}</h1>
        </div>


      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    backBtn () {
      this.$store.commit('m_showProprietario', false)
      window.history.back(1)
    }
  },
  computed: {
    hash () { return this.$route.hash },
    acomod () { return this.$store.state.acomod },
    host () { return this.$store.state.host },
  }, 
  watch: {
    hash (value) {
      if (value === '') {
        this.$store.commit('m_showProprietario', false)
      }
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.proprietario-modal {
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition);
  & .back-bar {
    position: fixed;
    top: 0;
    left: 0;
    width:  100%;
    height: 3.2rem;
    background: white;
    & .back-box {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 7%;
      & .__back-btn {
        cursor: pointer;
        width: 1.27rem;
        height: auto;
      }
    }
  }
  & .proprietario-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    & .info-header {
      display: flex;
      flex-flow: column;
      align-items: center;
      & .__img {
        width: 6rem;
        height: auto;
        border-radius: 50%;
        margin-top: 3.6rem;
        text-align: center;
      }
      & .__name {
        font-size: 30px;
        padding: 1rem 0 1.8rem 0;
      }
    }
    & .info-contato {
      padding: 0 7%;
      display: flex;
      flex-flow: column;
      align-items: center;
      & .info-title {
        font-size: 15px;
        padding: 1.5rem 0 .1rem 0;
      }
      & .__email {
        font-size: 17px;
        color: #00BAAC;
        user-select: none;
      }
      & .__celular {
        font-size: 16px;
        color: #00BAAC;
        user-select: none;
      }
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