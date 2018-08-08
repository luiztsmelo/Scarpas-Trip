<template>

  <div class="loader" v-if="$store.state.miniLoader">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div> 
    </div>
    
  </div>

</template>

<script>
export default {}
</script>

<style scoped>
@import url('~/assets/css/main.css');

.loader {
  & .spinner > div {
    width: 6px;
    height: 6px;
    background-color: #fff;
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
</style>