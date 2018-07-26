<template>
  <transition name="alert">
    <div class="alert-modal" :style="bgColor" v-if="alertMobile.show">

      <div class="alert-body">
        
        
        <div class="alert-text">

          <p class="__message">
            <span class="__type" v-if="this.isError">Erro</span>
            {{ alertMobile.message }}
          </p>

        </div>

        <!-- <img class="__close-img" src="../assets/img/close-mobile.svg" @click="$store.commit('m_hideAlertMobile')"> -->


      </div>

    </div>
  </transition>
</template>

<script>
export default {
  updated () {
    setTimeout(() => {
      this.$store.commit('m_hideAlertMobile')
    }, 3300)
  },
  computed: {
    alertMobile () { return this.$store.state.alertMobile },
    isError () { return this.$store.state.alertMobile.type === 'error' },
    isWarning () { return this.$store.state.alertMobile.type === 'warning' },
    bgColor () {
      return this.isError ? 'background: #FF0134' : 'background: #FFA04F'
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.alert-modal {
  position: fixed;
  z-index: 99999999;
  overflow-y: auto;
  width:  100%;
  height: 4.6rem;
  bottom: 0;
  left: 0;
  box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
  transition: var(--main-transition);
  & .alert-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 1.2rem 7%;
    & .alert-text {
      & .__message {
        font-size: 14px;
        font-weight: 500;
        color: white;
        & .__type {
          padding-right: 2px;
          font-size: 14px;
          font-weight: 700;
          color: white;
        }
      }
      & .__action-btn {
        padding: 2px 0 0 0;
        font-size: 14px;
        font-weight: 600;
        background: white;
        color: var(--colorAcomod);
        text-align: left;
      }
    }
    & .__close-img {
      align-self: flex-start;
      margin-left: 1rem;
      width: .95rem;
      height: auto;
      filter: invert(80%);
    }
  }
}

/* TRANSITIONS */
.alert-enter {
  transform: translateY(100%);
}
.alert-leave-active {
  transform: translateY(100%);
}
</style>