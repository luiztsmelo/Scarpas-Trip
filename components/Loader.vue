<template>
  <transition name="loader">  
    <div class="loader" v-show="loader">
      <div class="loader-body">
        <div class="lds-ripple"><div></div><div></div></div>
      </div> 
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    loader () {
      return this.$store.state.loader
    }
  }
}
</script>

<style>
@import url('../assets/css/main.css');

.loader {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: white;
  transition: var(--main-transition);
  & .loader-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    & .lds-ripple {
      display: inline-block;
      position: relative;
      width: 64px;
      height: 64px;
    }
    & .lds-ripple div {
      position: absolute;
      border: 2px solid rgb(142, 142, 142);
      opacity: .25;
      border-radius: 50%;
      animation: lds-ripple 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    & .lds-ripple div:nth-child(2) {
      animation-delay: -0.4s;
    }
  }
}

@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: .25;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

@media (min-width: 1024px) {
  .loader {
    top: var(--navbarHeightDesktop);
    & .loader-body {
      top: calc(50% - var(--navbarHeightDesktop));
    }
  }
}

/* TRANSITIONS */
.loader-enter {
  opacity: 0;
}
.loader-leave-active {
  opacity: 1;
}
</style>