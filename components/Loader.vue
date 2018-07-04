<template>
  <transition name="loader">
    <div class="loader" v-show="$store.state.loader" :style="background">
      <div class="loader-body">
        <div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
      </div> 
    </div>
  </transition>  
</template>

<script>
export default {
  computed: {
    background () {
      if (this.$route.name !== 'anunciar-acomodacao') {
        return 'background: rgba(255, 255, 255, .75)'
      } else {
        return 'background: #fff'
      }
    }
  },
}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.loader {
  position: fixed;
  z-index: 99999;
  top: 0;
  width: 100%;
  height: 100%;
  transition: var(--main-transition);
  & .loader-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    & .spinner {
    }
    & .spinner > div {
      width: 8px;
      height: 8px;
      background-color: #2a2a2a;
      border-radius: 100%;
      display: inline-flex;
      margin: 0 .18rem;
      animation: sk-bouncedelay 1s infinite ease-in-out both;
    }
    & .spinner .bounce1 {
      animation-delay: -0.34s;
    }
    & .spinner .bounce2 {
      animation-delay: -0.18s;
    }
  }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { transform: scale(0) } 
  40% { transform: scale(1.0) }
}

/* TRANSITIONS */
.loader-enter {
  opacity: 0;
}
.loader-leave-active {
  opacity: 1;
}
</style>