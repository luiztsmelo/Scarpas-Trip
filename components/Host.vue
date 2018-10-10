<template>
  <transition name="host-animation">
    <div class="host-modal" v-if="$store.state.showHost">
      <div class="host-body">


        <img class="back-btn" src="../assets/img/back.svg" @click="backBtn" ref="backBtn">


        <div class="head">
          <img class="__host-img" :src="host.photoURL">
          <h1 class="__host-name">{{ host.fullName }}</h1>
          <h3 class="__subtitle">Entre em contato para negociarem os detalhes da reserva do passeio.</h3>
        </div>



      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    backBtn () {
      this.$store.commit('m_showHost', false)
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
        this.$store.commit('m_showHost', false)
      }
    }
  }
}
</script>

<style>

.host-modal {
  position: fixed;
  z-index: 9999;
  overflow-y: auto;
  width:  100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  transition: var(--main-transition);
  & .back-btn {
    margin: 1rem 7%;
    cursor: pointer;
    width: 1.27rem;
    height: auto;
  }
  & .host-body {
    display: flex;
    flex-flow: column;
    height: 100%;
    & .head {
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 1.5rem 7% 0;
      & .__host-img {
        width: 5.5rem;
        height: auto;
        border-radius: 50%;
        text-align: center;
      }
      & .__host-name {
        font-size: 31px;
        padding: 1rem 0;
        text-align: center;
      }
      & .__subtitle {
        text-align: center;
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
.host-animation-enter {
  transform: translateY(100%);
}
.host-animation-leave-active {
  transform: translateY(100%);
}
</style>