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

<style>
@import url('../assets/css/main.css');

.loader {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: white;
  transition: all .3s ease;
  & .loader-body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    top: calc(50%);
    transform: translateY(-50%);
  }
}

.spinner {
  width: 3.3rem;
  height: 3.3rem;
  background-image: url('../static/brand.svg');
  background-repeat: no-repeat;
  background-size: cover;
  animation: spin 1s cubic-bezier(.08,.8,.78,.03) infinite;
  opacity: 1;
}

@keyframes spin { 
    from { 
        transform: rotate(0deg); 
    } to { 
        transform: rotate(360deg); 
    }
}

@media (min-width: 1024px) {
  .logo {
    width: 4.3rem;
    height: 4.3rem;
  }
}
</style>