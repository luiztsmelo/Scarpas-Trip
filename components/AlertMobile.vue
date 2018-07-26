<template>
  <transition name="alert">
    <div class="alert-modal" :style="modalStyle" v-if="alertMobile.show">

      <div class="alert-body">
        
        
        <div class="alert-text">

          <p class="__message" :style="textColor">
            <span class="__type" :style="textColor" v-if="this.isError || this.isInfo">{{ alertMobile.title }}</span>
            {{ alertMobile.message }}
          </p>

        </div>

        <img class="__close-img" src="../assets/img/close-mobile.svg" @click="$store.commit('m_hideAlertMobile')" v-if="this.isInfo">


      </div>

    </div>
  </transition>
</template>

<script>
export default {
  updated () {
    if (!this.isInfo) {
      setTimeout(() => {
        this.$store.commit('m_hideAlertMobile')
      }, 3300)
    }
  },
  computed: {
    alertMobile () { return this.$store.state.alertMobile },
    isError () { return this.$store.state.alertMobile.type === 'error' },
    isWarning () { return this.$store.state.alertMobile.type === 'warning' },
    isInfo () { return this.$store.state.alertMobile.type === 'info' },
    modalStyle () {
      if (this.isError) {
        return 'background: #FF0134; height: 4.6rem'
      } else if (this.isWarning) {
        return 'background: #FFA04F; height: 4.6rem'
      } else if (this.isInfo) {
        return 'background: #FFF; height: 7rem'
      }
    },
    textColor () {
      return this.isInfo ? 'color: #2a2a2a' : 'color: #fff'
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
        font-size: 15px;
        font-weight: 500;
        line-height: 1.2;
        & .__type {
          padding-right: 2px;
          font-size: 15px;
          font-weight: 700;
        }
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