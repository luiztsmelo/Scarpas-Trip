<template>
  <transition name="loader">  
    <div class="loader" v-show="loader">
      <div class="loader-body">
        <div class="spinner"></div>
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
  }
}

.spinner {
  width: 3.5rem;
  height: 3.5rem;
  background-image: url('../static/brand.svg');
  background-repeat: no-repeat;
  background-size: cover;
  animation: spin 4.5s cubic-bezier(.28,1.91,.3,.39) infinite;
  opacity: .8;
}

@keyframes spin { 
  from { 
    transform: rotate(0deg);
  } to { 
    transform: rotate(720deg);
  }
}

@media (min-width: 1024px) {
  .loader {
    top: 4rem;
    & .loader-body {
      top: calc(50% - 4rem);
    }
  }
  .spinner {
    width: 4rem;
    height: 4rem;
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