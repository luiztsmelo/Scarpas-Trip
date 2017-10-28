<template>
  <transition name="foobar-animation">  
    <div class="foobar" v-show="showFoobar">
      <div class="foobar-body">
        
        

          <nuxt-link to="/estadia">
          <div class="foobar-box" @click="onFoobar1=false, onFoobar2=true, onFoobar3=true, onFoobar4=true, onFoobar5=true">
            <img src="../assets/img/estadia.svg" class="__foobar1-icon" :class="{ coloricon: onFoobar1 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar1 }">ESTADIA</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/eventos">
          <div class="foobar-box" @click="onFoobar1=true, onFoobar2=false, onFoobar3=true, onFoobar4=true, onFoobar5=true">
            <img src="../assets/img/eventos.svg" class="__foobar2-icon" :class="{ coloricon: onFoobar2 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar2 }">EVENTOS</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/atracoes">
          <div class="foobar-box" @click="onFoobar1=true, onFoobar2=true, onFoobar3=false, onFoobar4=true, onFoobar5=true">
            <img src="../assets/img/atracoes.svg" class="__foobar3-icon" :class="{ coloricon: onFoobar3 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar3 }">ATRAÇÕES</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/passeios">
          <div class="foobar-box" @click="onFoobar1=true, onFoobar2=true, onFoobar3=true, onFoobar4=false, onFoobar5=true">
            <img src="../assets/img/passeios.svg" class="__foobar4-icon" :class="{ coloricon: onFoobar4 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar4 }">PASSEIOS</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/comidas">
          <div class="foobar-box" @click="onFoobar1=true, onFoobar2=true, onFoobar3=true, onFoobar4=true, onFoobar5=false">
            <img src="../assets/img/comidas.svg" class="__foobar5-icon" :class="{ coloricon: onFoobar5 }">
            <h1 class="__foobar-title" :class="{ colortitle: onFoobar5 }">COMIDAS</h1>
          </div>
        </nuxt-link>
        

      </div>
    </div>
  </transition>
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
  },
  computed: {
    showFoobar () {
      return this.$store.state.showFoobar
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
  height: 3.3rem;
  width: 100%;
  background: white;
  transition: all .3s ease;
  box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.15);
  & .foobar-body {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    & .foobar-box {
      transform: translateY(1px);
      width: 3.5rem;
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      & .__foobar-title {
        font-size: 9px;
        font-weight: 500;
        color: rgb(33, 152, 243);
      }
      & .colortitle {
        color: rgb(51, 51, 51);
      }
      & img {
        margin-bottom: 8px;
        width: 1.3rem;
        height: auto;
      }
      & .coloricon {
        filter: grayscale(100%) brightness(80%);
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