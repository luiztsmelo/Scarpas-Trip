<template>

    <div class="foobar">
      <div class="foobar-body">
        
        <nuxt-link to="/estadia">
          <div class="foobar-box" @click="onFoobar1=false, onFoobar2=true, onFoobar3=true, onFoobar4=true, onFoobar5=true">
            <img src="../assets/img/foobar1.svg" class="__foobar1-icon" :class="{ coloricon: onFoobar1 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar1 }">ESTADIA</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/eventos">
          <div class="foobar-box" @click="onFoobar1=true, onFoobar2=false, onFoobar3=true, onFoobar4=true, onFoobar5=true">
            <img src="../assets/img/foobar2.svg" class="__foobar2-icon" :class="{ coloricon: onFoobar2 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar2 }">EVENTOS</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/passeios">
          <div class="foobar-box" @click="onFoobar1=true, onFoobar2=true, onFoobar3=false, onFoobar4=true, onFoobar5=true">
            <img src="../assets/img/foobar3.svg" class="__foobar3-icon" :class="{ coloricon: onFoobar3 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar3 }">PASSEIOS</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/comidas">
          <div class="foobar-box" @click="onFoobar1=true, onFoobar2=true, onFoobar3=true, onFoobar4=false, onFoobar5=true">
            <img src="../assets/img/foobar4.svg" class="__foobar4-icon" :class="{ coloricon: onFoobar4 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar4 }">COMIDAS</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/atracoes">
          <div class="foobar-box" @click="onFoobar1=true, onFoobar2=true, onFoobar3=true, onFoobar4=true, onFoobar5=false">
            <img src="../assets/img/foobar5.svg" class="__foobar5-icon" :class="{ coloricon: onFoobar5 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar5 }">ATRAÇÕES</h1>
          </div>
        </nuxt-link>
        

      </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      onFoobar1: true,
      onFoobar2: true,
      onFoobar3: true,
      onFoobar4: true,
      onFoobar5: true
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
  left: 0;
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
    & .foobar-box {
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      & .__foobar-title {
        font-size: 9px;
        font-weight: 600;
        color: #FC5658;
      }
      & .colortitle {
        color: var(--color01);
      }
      & img {
        margin-bottom: 6px;
        width: 1.5rem;
        height: auto;
      }
      & .coloricon {
        filter: grayscale(100%) invert(10%);
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
}

/* TRANSITIONS */
.foobar-animation-enter,
.foobar-animation-leave-active {
  transform: translateY(100%);
}
</style>