<template>
  <div class="loader">
    <div class="loader-body">
      <div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
    </div> 
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
@import url('../assets/css/main.css');

.loader {
  position: fixed;
  z-index: 99999;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .75);
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

</style>