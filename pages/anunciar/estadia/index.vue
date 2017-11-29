<template>
  <div class="anunciar-estadia">

    <!-- PLANO ESTADIA -->
    <div class="plano-estadia" v-show="$store.state.cadastroPasseio0">
      
      <img class="__img-header" src="../../../assets/img/anuncio-estadia.svg">
       
      <h1 class="__title">Amplie seus ganhos anunciando sua casa com a gente!</h1>
      
      <span class="__subtitle">Como funciona?</span>
      <h3 class="__item">A Escarpas Trip </h3>


      <span class="__subtitle">Quais as vantagens?</span>
      <h3 class="__item">Destaque nas redes sociais</h3>
      <h3 class="__item">Transparência</h3>
      <h3 class="__item">Segurança</h3>
      
      <span class="__subtitle">Investimento Mensal</span>
      <span class="__price">R$59</span>
      <h3 class="__subitem">Primeiro mês grátis</h3>
      <h3 class="__subitem">Cancele quando quiser</h3>

      <button class="__anunciar-btn" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_passeioProgressBar', (100/11))">Anunciar</button>

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

<style>
@import url('../../../assets/css/main.css');

.anunciar-estadia {
  margin-top: 3.2rem;
  background: linear-gradient(45deg, #93EDC7, #1CD8D2);
  color: white;
  transition: var(--main-transition);
  /* ******************** PLANO ESTADIA ******************** */
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
      text-align: center;
    }
    & .__subtitle {
      text-transform: uppercase;
      margin: 3rem 0 .5rem 0;
      font-size: 17px;
      font-weight: 600;
      padding: 0 7%;
      text-align: center;
    }
    & .__item {
      padding: 0 7%;
      font-size: 20px;
      font-weight: 300;
      margin: 0 0 .2rem 0;
      color: white;
    }
    & .__subitem {
      padding: 0 7%;
      font-size: 15px;
      font-weight: 400;
      margin: 0 ;
      color: white;
      line-height: 21px;
    }
    & .__price {
      font-size: 48px;
      font-weight: 200;
      margin-bottom: .5rem;
    }
    & .__anunciar-btn {
      color: var(--color01);
      width: 65%;
      background: white;
      padding: 1rem 0;
      border-radius: 100px;
      font-size: 17px;
      font-weight: 500;
      margin: 3rem 0 2rem 0;
      box-shadow: 2px 2px 7px 2px rgba(0,0,0,0.17);
    }
  }
}
</style>
