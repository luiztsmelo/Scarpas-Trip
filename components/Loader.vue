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
  z-index: 9999;
  width:  100%;
  height: 100%;
  top: 3.2rem;
  background: white;
  transition: all .3s ease;
  & .loader-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    top: calc(50% -3.2rem);
    transform: translateY(-50%);
  }
}
.spinner {
    width: 4.2rem;
    height: 4.2rem;
    background-image: url('../static/brand3.svg');
    background-repeat: no-repeat;
    background-size: cover;
    animation-name: spin;
    animation-duration: 2.3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    opacity: .2;
  }
  @keyframes spin { 
      from { 
          transform: rotate(0deg); 
      } to { 
          transform: rotate(360deg); 
      }
  }
</style>