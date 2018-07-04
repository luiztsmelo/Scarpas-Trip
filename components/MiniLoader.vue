<template>
  <transition name="loader">  
    <div class="loader">
      <div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.loader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  transition: var(--main-transition);
  & .spinner {
  }
  & .spinner > div {
    width: 10px;
    height: 10px;
    background-color: #2a2a2a;
    border-radius: 100%;
    display: inline-flex;
    margin: 0 .16rem;
    animation: sk-bouncedelay 1.2s infinite ease-in-out both;
  }
  & .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  & .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
}


@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
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