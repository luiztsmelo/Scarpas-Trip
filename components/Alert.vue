<template>
  <transition name="alert">
    <div class="alert-modal" v-if="message !== ''">

      <div class="alert-body" :style="bodyPosition">
        
        
        <div class="alert-text">

          <p class="__message">
            <span class="__title" :style="titleColor" v-if="title !== ''">{{ title }}</span>
            {{ message }}
          </p>

        </div>

        <img class="__close-img" src="../assets/img/close-mobile.svg" @click="$store.commit('hide_alert')" v-if="alert.persist">


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
    isWarning () { return this.alert.type === 'warning' },
    isInfo () { return this.alert.type === 'info' },
    isMobile () { return this.$store.state.isMobile },
    bodyPosition () {
      return this.isInfo && this.isMobile ? '' : 'position: absolute'
    },
    titleColor () {
       return this.isWarning ? 'color: #F31431' : ''
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

.alert-modal {
  position: fixed;
  z-index: 99999999;
  overflow-y: auto;
  min-height: 4.7rem;
  width: 100%;
  bottom: 0;
  background: #fff;
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
        line-height: 1.35;
        user-select: none;
        & .__title {
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
      filter: invert(50%);
    }
  }
}


@media (min-width: 1024px) {
  .alert-modal {
    min-height: 5.2rem;
    & .alert-body {
      justify-content: center;
      padding: 0 22%;
      & .alert-text {
        & .__message {
          font-size: 16px;
          & .__title {
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