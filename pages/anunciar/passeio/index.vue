<template>
  <div class="anunciar-passeio">

    <!-- PLANO PASSEIO -->
    <div class="plano-evento" v-show="$store.state.cadastroEvento0">
      
      <h1 class="__title">Amplie seus ganhos anunciando seu passeio de lancha ou 4x4 com a gente!</h1>

      <div class="pricing-box">
        <h2 class="__pricing-box-title">Selecione um plano:</h2>

        <div class="plano-row casual">
          <span class="__plano-valor">R$50</span>
          <span class="__plano-title">AVANÇADO</span>
        </div>

        <div class="plano-row profissional">
          <span class="__plano-valor">R$100</span>
          <span class="__plano-title">PROFISSIONAL</span>
        </div>

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

.anunciar-passeio {
  margin-top: 3.3rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(40deg, #B5D9F0, #49A5FC);
  color: white;
  transition: var(--main-transition);
  height: calc(100vh - 3.3rem);
  & .plano-evento {
    & .__title {
      font-size: 29px;
      font-weight: 600;
      padding: 3rem 7% 0 7%;
    }
    & .pricing-box {
      display: flex;
      flex-flow: column;
      padding: 3rem 7% 0 7%;
      & .__pricing-box-title {
        font-size: 20px;
        font-weight: 400;
        padding-bottom: .5rem;
      }
      & .plano-row {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 3.3rem;
        margin: .5rem 0;
        border-radius: 3px;
        & .__plano-valor {
          font-size: 23px;
          font-weight: 300;
          padding: 0 .7rem;
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
        background: black;
      }
    }
  }
}
</style>
