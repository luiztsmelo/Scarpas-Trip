<template>
  <transition name="host-animation">
    <div class="host-modal" v-if="$store.state.showHost">
      <div class="host-body">


        <img class="back-btn" src="../assets/img/back.svg" @click="backBtn" ref="backBtn">


        <div class="head">
          <img class="__host-img" :src="host.photoURL">

          <h1 class="__host-name">{{ host.fullName }}</h1>

          <p class="__host-member">Membro desde janeiro de 2018</p>

          <div class="rating">
            <star-rating
              :rating="4.8"
              :increment="0.1"
              :read-only="true"
              :show-rating="false"
              active-color="#161616"
              inactive-color="#dedede"
              :star-size="18"
              :padding="3">
            </star-rating>
            <p class="rating-number">4,8</p>
          </div>

          <h3 class="__subtitle">Entre em contato com {{ host.firstName }} para negociarem os detalhes da reserva.</h3>
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
      padding: 1rem 7% 0;
      & .__host-img {
        width: 5.8rem;
        height: auto;
        border-radius: 50%;
        text-align: center;
      }
      & .__host-name {
        font-size: 31px;
        padding: 1rem 0 .2rem;
        text-align: center;
      }
      & .__host-member {
        text-align: center;
        font-size: 15px;
      }
      & .rating {
        display: flex;
        align-items: center;
        margin: 1rem 0;
        & .rating-number {
          font-size: 16px;
          font-weight: 600;
          padding-left: 3px;
        }
      }
      & .__subtitle {
        text-align: center;
      }
    }
  }
}

/* TRANSITIONS */
.host-animation-enter {
  transform: translateX(100%);
}
.host-animation-leave-active {
  transform: translateX(100%);
}
</style>