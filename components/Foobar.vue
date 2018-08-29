<template>
  <transition name="foobar-animation">  
    <div class="foobar" v-if="showFoobar">
      <div class="foobar-body">

          <nuxt-link to="/acomodacoes">
          <div class="foobar-box" @click="$store.state.offFoobar1=false, $store.state.offFoobar2=true, $store.state.offFoobar3=true, $store.state.offFoobar4=true, $store.state.offFoobar5=true">
            <img src="../assets/img/estadia.svg" class="__foobar1-icon" :class="{ coloricon: offFoobar1 }">
            <h1 class="__foobar-title" :class="{ colortitle: offFoobar1 }">Acomodações</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/eventos">
          <div class="foobar-box" @click="$store.state.offFoobar1=true, $store.state.offFoobar2=false, $store.state.offFoobar3=true, $store.state.offFoobar4=true, $store.state.offFoobar5=true">
            <img src="../assets/img/eventos.svg" class="__foobar2-icon" :class="{ coloricon: offFoobar2 }">
            <h1 class="__foobar-title" :class="{ colortitle: offFoobar2 }">Eventos</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/atracoes">
          <div class="foobar-box" @click="$store.state.offFoobar1=true, $store.state.offFoobar2=true, $store.state.offFoobar3=false, $store.state.offFoobar4=true, $store.state.offFoobar5=true">
            <img src="../assets/img/atracoes.svg" class="__foobar3-icon" :class="{ coloricon: offFoobar3 }">
            <h1 class="__foobar-title" :class="{ colortitle: offFoobar3 }">Atrações</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/passeios">
          <div class="foobar-box" @click="$store.state.offFoobar1=true, $store.state.offFoobar2=true, $store.state.offFoobar3=true, $store.state.offFoobar4=false, $store.state.offFoobar5=true">
            <img src="../assets/img/passeios.svg" class="__foobar4-icon" :class="{ coloricon: offFoobar4 }">
            <h1 class="__foobar-title" :class="{ colortitle: offFoobar4 }">Passeios</h1>
          </div>
        </nuxt-link>

        <nuxt-link to="/restaurantes">
          <div class="foobar-box" @click="$store.state.offFoobar1=true, $store.state.offFoobar2=true, $store.state.offFoobar3=true, $store.state.offFoobar4=true, $store.state.offFoobar5=false">
            <img src="../assets/img/restaurantes.svg" class="__foobar5-icon" :class="{ coloricon: offFoobar5 }">
            <h1 class="__foobar-title" :class="{ colortitle: offFoobar5 }">Restaurantes</h1>
          </div>
        </nuxt-link>
        

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    showFoobar () {
      return this.$store.state.showFoobar
    },
    offFoobar1 () {
      return this.$store.state.offFoobar1
    },
    offFoobar2 () {
      return this.$store.state.offFoobar2
    },
    offFoobar3 () {
      return this.$store.state.offFoobar3
    },
    offFoobar4 () {
      return this.$store.state.offFoobar4
    },
    offFoobar5 () {
      return this.$store.state.offFoobar5
    }
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.foobar {
  position: fixed;
  z-index: 9997;
  bottom: 0;
  left: 0;
  height: 3.4rem;
  width: 100%;
  background: white;
  transition: var(--main-transition);
  border-top: 1px solid #dedede;
  & .foobar-body {
    padding: 0 .5rem;
    height: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    & a {
      height: 100%;
      width: 45%;
    }
    & .foobar-box {
      margin-top: 3px;
      border-radius: 40%;
      height: 100%;
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      & .__foobar-title {
        font-size: 10px;
        font-weight: 500;
        color: #ff5858;
      }
      & .colortitle {
        color: var(--color01);
      }
      & img {
        margin-bottom: 5px;
        width: 1.31rem;
        height: auto;
      }
      & .coloricon {
        filter: grayscale(100%) brightness(10%);
      }
    }
  }
}

@media (min-width: 1024px) {
  .foobar {
    display: none;
  }
}

/* TRANSITIONS */
.foobar-animation-enter,
.foobar-animation-leave-active {
  transform: translateY(100%);
}
</style>