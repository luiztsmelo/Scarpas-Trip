<template>
  <div class="anunciar-restaurante">

    <!-- PLANO RESTAURANTE -->
    <div class="plano-restaurante">
      
      <img class="__img-header" src="../../../assets/img/restaurantes.svg" style="transform: scale(1.06)">
       
      <h1 class="__title">A melhor maneira de encontrar o seu cliente é ser encontrado por ele.</h1>
      
      <span class="__subtitle">Como funciona?</span>
      <h3 class="__item">A Escarpas Trip </h3>


      <span class="__subtitle">Quais as vantagens?</span>
      <h3 class="__item">Destaque nas redes sociais</h3>
      <h3 class="__item">Transparência</h3>
      <h3 class="__item">Segurança</h3>
      
      <span class="__subtitle">Investimento Mensal</span>
      <span class="__price">R$49</span>
      <h3 class="__subitem">Primeiro mês grátis</h3>
      <h3 class="__subitem">Cancele quando quiser</h3>

      <button class="__anunciar-btn" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_passeioProgressBar', (100/11))">Anunciar</button>

    </div><!-- PLANO RESTAURANTE -->



  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Restaurante em Capitólio ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.state.showFoobar === true) {
        vm.$store.commit('m_showFoobar', false)
      }
    })
  }
}
</script>

<style>
@import url('~/assets/css/main.css');

.anunciar-restaurante {
  margin-top: 3.4rem;
  background: #feb47b;
  color: white;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.4rem;
    height: 3px;
    z-index: 8888;
    background: linear-gradient(80deg, #feb47b, #ff7e5f);
    transition: all .3s ease;
  }
  
  /* ******************** PLANO RESTAURANTE ******************** */
  & .plano-restaurante {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .__img-header {
        margin: 2rem 0;
        width: 6rem;
        height: auto;
        filter: grayscale(100%) brightness(250%);
      }
    & .__title {
      font-size: 26px;
      font-weight: 700;
      padding: 0 7%;
      text-align: center;
    }
    & .__subtitle {
      text-transform: uppercase;
      margin: 3rem 0 .5rem 0;
      font-size: 15px;
      font-weight: 700;
      padding: 0 7%;
      text-align: center;
    }
    & .__item {
      padding: 0 7%;
      font-size: 18px;
      font-weight: 400;
      margin: 0 0 .2rem 0;
      color: white;
    }
    & .__subitem {
      padding: 0 7%;
      font-size: 14px;
      font-weight: 400;
      margin: 0 ;
      color: white;
      line-height: 21px;
    }
    & .__price {
      font-size: 52px;
      font-weight: 100;
      margin-bottom: .5rem;
    }
    & .__anunciar-btn {
      color: var(--color01);
      width: 65%;
      background: white;
      padding: 1rem 0;
      border-radius: 100px;
      font-size: var(--fontSizeAnuncioText);
      font-weight: 600;
      margin: 3rem 0 2rem 0;
      box-shadow: 2px 2px 9px 4px rgba(0,0,0,0.13);
    }
  }
}
</style>
