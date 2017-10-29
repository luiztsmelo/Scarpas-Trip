<template>
  <div class="loader" v-show="loader">
    <div class="loader-body">
      <div class="spinner"></div>
    </div> 
  </div>
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

<style scoped>
@import url('../assets/css/main.css');

.loader {
  position: fixed;
  z-index: 10;
  width:  100%;
  height: 100%;
  top: 3.3rem;
  background: white;
  transition: all .3s ease;
  & .loader-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
  }
}
.spinner {
  width: 40px;
  height: 40px;
  margin: 40px auto;
  background-color: #0D0D0D;
  border-radius: 100%;
  -webkit-animation: sk-pulseScaleOut 1s infinite ease-in-out;
          animation: sk-pulseScaleOut 1s infinite ease-in-out; }

@-webkit-keyframes sk-pulseScaleOut {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0); }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 0; } }

@keyframes sk-pulseScaleOut {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0); }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 0; } }
</style>