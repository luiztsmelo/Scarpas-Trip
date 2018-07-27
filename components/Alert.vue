<template>
  <transition name="alert">
    <div class="alert-modal" :style="bgColor" v-if="message !== ''">

      <div class="alert-body" :style="bodyPosition">
        
        
        <div class="alert-text">

          <p class="__message" :style="textColor">
            <span class="__type" :style="textColor" v-if="title !== ''">{{ title }}</span>
            {{ message }}
          </p>

        </div>

        <img class="__close-img" :style="closeBtnColor" src="../assets/img/close-mobile.svg" @click="$store.commit('hide_alert')" v-if="alert.persist">


      </div>

    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    alert () { return this.$store.state.alert },
    title () { return this.alert.title },
    message () { return this.alert.message },
    isError () { return this.alert.type === 'error' },
    isWarning () { return this.alert.type === 'warning' },
    isInfo () { return this.alert.type === 'info' },
    isMobile () { return this.$store.state.isMobile },
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
      return this.isInfo && this.isMobile ? '' : 'position: absolute'
    },
    textColor () {
      return this.isInfo ? 'color: #2a2a2a' : 'color: #fff'
    },
    closeBtnColor () {
      return this.isInfo ? 'filter: invert(80%)' : 'filter: invert(100%) brightness(200%)'
    }
  },
  watch: {
    message (value) {
      if (value !== '') {
        if (!this.alert.persist) {
          setTimeout(() => { this.$store.commit('hide_alert') }, 3300)
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
    width: 100%;
    padding: 1.4rem 7%;
    & .alert-text {
      & .__message {
        font-size: 15px;
        font-weight: 500;
        line-height: 1.25;
        user-select: none;
        & .__type {
          padding-right: 2px;
          font-size: 15px;
          font-weight: 700;
          user-select: none;
        }
      }
    }
    & .__close-img {
      align-self: flex-start;
      margin-left: 1.6rem;
      width: .95rem;
      height: auto;
      filter: invert(70%);
    }
  }
}


@media (min-width: 1024px) {
  .alert-modal {
    min-height: 5.7rem;
    & .alert-body {
      justify-content: center;
      padding: 0 22%;
      & .alert-text {
        & .__message {
          font-size: 16px;
          & .__type {
            padding-right: 2px;
            font-size: 16px;
          }
        }
      }
      & .__close-img {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 7.5%;
        margin: auto;
        cursor: pointer;
        align-self: center;
        margin-left: 2rem;
        width: 1.1rem;
      }
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