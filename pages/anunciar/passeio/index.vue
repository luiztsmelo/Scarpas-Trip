<template>
  <div class="anunciar-passeio">

    <!-- PLANO PASSEIO -->
    <div class="plano-passeio" v-show="$store.state.cadastroEvento0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-passeio.svg">

      <h1 class="__title">Amplie seus ganhos anunciando seu passeio com a gente!</h1>

      <div class="pricing-box">
        <h2 class="__pricing-box-title">Selecione seu plano:</h2>

        <!-- Plano Casual -->
        <div class="plano-row casual" @click="planoCasualExpanded = !planoCasualExpanded">
          <span class="__plano-valor">R$50</span>
          <span class="__plano-valor-mes">/mês</span>
          <span class="__plano-title">AVANÇADO</span>
          <div class="__arrow-down-black"></div>
        </div>

        <transition name="plano-row-expanded-animation">
          <div class="plano-row-expanded casual" v-show="planoCasualExpanded">
            <ul>
              <li class="__item">Máximo 3 imagens</li>
              <li class="__item">Benefício 2</li>
            </ul>
          </div>
        </transition><!-- Plano Casual -->


        <!-- Plano Pro -->
        <div class="plano-row profissional" @click="planoProExpanded = !planoProExpanded">
          <span class="__plano-valor">R$100</span>
          <span class="__plano-valor-mes">/mês</span>
          <span class="__plano-title">PROFISSIONAL</span>
          <div class="__arrow-down-white"></div>
        </div>

        <transition name="plano-row-expanded-animation">
          <div class="plano-row-expanded profissional" v-show="planoProExpanded" style="background:rgb(32,32,32)">
            <ul>
              <li class="__item">Ganhe um maior destaque</li>
              <li class="__item">Venda seu ingresso conosco</li>
            </ul>
          </div>
        </transition><!-- Plano Pro -->


      </div>
    </div><!-- PLANO PASSEIO -->


  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Passeio em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data() {
    return {
      planoCasualExpanded: false,
      planoProExpanded: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.showFoobar === false) {
      this.$store.commit('m_showFoobar', true)
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scope>
@import url('../../../assets/css/main.css');
@import url('../../../assets/css/illustrations.css');

.anunciar-passeio {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(40deg, #B5D9F0, #49A5FC);
  color: white;
  height: 100vh;
  transition: var(--main-transition);
  /* ******************** PLANO PASSEIO ******************** */
  & .plano-passeio {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img-header {
      margin: 2rem 0;
      width: 6rem;
      height: auto;
      filter: grayscale(100%) brightness(200%);
    }
    & .__title {
      font-size: 26px;
      font-weight: 500;
      padding: 0 7%;
    }
    & .pricing-box {
      display: flex;
      flex-flow: column;
      align-self: stretch;
      padding: 2rem 7% 0 7%;
      & .__pricing-box-title {
        font-size: 20px;
        font-weight: 400;
      }
      & .plano-row {
        position: relative;
        z-index: 3;
        margin-top: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 3.3rem;
        border-radius: 4px;
        box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.3);
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        transition: all .2s ease;
        & .__plano-valor {
          font-size: 23px;
          font-weight: 300;
          padding-left: .7rem;
        }
        & .__plano-valor-mes {
          transform: translateY(2px);
          font-size: 15px;
          font-weight: 300;
          padding-right: .8rem;
        }
        & .__plano-title {
          font-size: 14px;
          font-weight: 500;
        }
      }
      & .plano-row-expanded {
        z-index: 2;
        width: 100%;
        margin-bottom: .5rem;
        border-radius: 0 0 4px 4px;
        overflow: hidden;
        transition: all .2s ease;
        & .__item {
          font-size: 16px;
          font-weight: 300;
          margin: .5rem 0;
        }
      }
      & .casual {
        background: white;
        color: var(--color01);
      }
      & .profissional {
        background: rgb(13, 13, 13);
      }
    }
  }
}

.plano-row-expanded-animation-enter,
.plano-row-expanded-animation-leave-active {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
