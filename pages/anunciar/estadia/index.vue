<template>
  <div class="anunciar-estadia">

    <!-- PLANO ESTADIA -->
    <div class="plano-estadia" v-show="$store.state.cadastroEvento0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-estadia.svg">

      <h1 class="__title">Amplie seus ganhos anunciando sua casa com a gente!</h1>

      <div class="pricing-box">
        <h2 class="__pricing-box-title">Selecione seu plano:</h2>

        <div class="plano-row casual">
          <span class="__plano-valor">R$49</span>
          <span class="__plano-valor-mes">/mês</span>
          <span class="__plano-title">AVANÇADO</span>
          <div class="__arrow-down-black"></div>
        </div>

        <div class="plano-row profissional">
          <span class="__plano-valor">R$79</span>
          <span class="__plano-valor-mes">/mês</span>
          <span class="__plano-title">PROFISSIONAL</span>
          <div class="__arrow-down-white"></div>
        </div>

      </div>
    </div><!-- PLANO ESTADIA -->

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Estadia em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
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

<style scoped>
@import url('../../../assets/css/main.css');

.anunciar-estadia {
  margin-top: 3.2rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(40deg, #93EDC7, #1CD8D2);
  color: white;
  height: calc(100vh - 3.2rem);
  transition: var(--main-transition);
  /* ******************** PLANO PASSEIO ******************** */
  & .plano-estadia {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img-header {
      margin: 2rem 0;
      width: 6rem;
      height: auto;
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
        padding-bottom: .5rem;
      }
      & .plano-row {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 3.2rem;
        margin: .5rem 0;
        border-radius: 3px;
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
</style>
