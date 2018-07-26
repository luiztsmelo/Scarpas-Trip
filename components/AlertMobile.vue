<template>
  <transition name="alert">
    <div class="alert-modal" :style="bgColor" v-if="alertMobile.message !== ''">

      <div class="alert-body" :style="bodyPosition">
        
        
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
  computed: {
    alertMobile () { return this.$store.state.alertMobile },
    message () { return this.$store.state.alertMobile.message },
    isError () { return this.$store.state.alertMobile.type === 'error' },
    isWarning () { return this.$store.state.alertMobile.type === 'warning' },
    isInfo () { return this.$store.state.alertMobile.type === 'info' },
    bgColor () {
      if (this.isError) {
        return 'background: #FF0134'
      } else if (this.isWarning) {
        return 'background: #FFA04F'
      } else if (this.isInfo) {
        return 'background: #FFF'
      }
    },
    bodyPosition () {
      return this.isInfo ? '' : 'position: absolute'
    },
    textColor () {
      return this.isInfo ? 'color: #2a2a2a' : 'color: #fff'
    }
  },
  watch: {
    message (value) {
      if (value !== '') {
        if (!this.isInfo) {
          setTimeout(() => { this.$store.commit('m_hideAlertMobile') }, 3200)
        }
      }
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
  min-height: 4.6rem;
  width: 100%;
  bottom: 0;
  box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.1);
  transition: var(--main-transition);
  & .alert-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    height: 100%;
    padding: 1.3rem 7%;
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
      margin-left: 1.6rem;
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