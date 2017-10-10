<template>

    <div class="foobar">
      <div class="foobar-body">
        
        <img src="../assets/img/foobar1a.svg" 
        class="__foobar1-icon" 
        :class="{ activeFoobar: onFoobar1 }" 
        @click="onFoobar1=true, onFoobar2=false, onFoobar3=false, onFoobar4=false">
        
        <img src="../assets/img/foobar2.svg" 
        class="__foobar2-icon" 
        :class="{ activeFoobar: onFoobar2 }"
        @click="onFoobar1=false, onFoobar2=true, onFoobar3=false, onFoobar4=false">
        
        <img src="../assets/img/foobar3.svg" 
        class="__foobar3-icon" 
        :class="{ activeFoobar: onFoobar3 }"
        @click="onFoobar1=false, onFoobar2=false, onFoobar3=true, onFoobar4=false">
        
        <img src="../assets/img/foobar4.svg" 
        class="__foobar4-icon" 
        :class="{ activeFoobar: onFoobar4 }"
        @click="onFoobar1=false, onFoobar2=false, onFoobar3=false, onFoobar4=true">

      </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      onFoobar1: true,
      onFoobar2: false,
      onFoobar3: false,
      onFoobar4: false
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/main.css');

.foobar {
  position: fixed;
  z-index: 3;
  bottom: 0;
  height: 3.5rem;
  width: 100%;
  background: white;
  transition: all .3s ease;
  box-shadow: 0px -1px 4px 0px rgba(0,0,0,0.07);
  & .foobar-body {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    & img {
      filter: invert(10%);
      width: 2.0rem;
      height: auto;
    }
    & .activeFoobar {
      filter: invert(0%);
    }
    & .__foobar1-icon {
      transform: scale(1);
    }
    & .__foobar2-icon {
      transform: scale(1);
    }
    & .__foobar3-icon {
      transform: scale(1);
    }
    & .__foobar4-icon {
      transform: scale(1);
    }
  }
}

/* TRANSITIONS */
.foobar-animation-enter,
.foobar-animation-leave-active {
  transform: translateY(100%);
}
</style>