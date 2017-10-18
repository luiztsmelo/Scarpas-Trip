<template>
  <div class="anunciar-evento">
    <h1 class="__title">Divulgação: a chave para o sucesso do seu evento!</h1>

    <div class="pricing-box">
      <h2 class="__pricing-box-title">Selecione um plano:</h2>

      <div class="plano-row casual">
        <span class="__plano-valor">R$25</span>
        <span class="__plano-title">CASUAL</span>
      </div>

      <div class="plano-row profissional">
        <span class="__plano-valor">R$100</span>
        <span class="__plano-title">PROFISSIONAL</span>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Evento em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left'
}
</script>

<style scope>
@import url('../../../assets/css/main.css');

.anunciar-evento {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(45deg, #ee0979, #ff6a00);
  color: white;
  transition: all .222s ease;
  height: calc(100vh - 3.5rem);
  & .__title {
    font-size: 26px;
    font-weight: 600;
    padding: 3rem 7% 0 7%;
    
  }
  & .pricing-box {
    display: flex;
    flex-flow: column;
    padding: 3rem 7% 0 7%;
    & .__pricing-box-title {
      font-size: 21px;
      font-weight: 400;
      padding-bottom: .5rem;
    }
    & .plano-row {
      display: flex;
      align-items: center;
      height: 3rem;
      margin: .5rem 0;
        & .__plano-valor {
        font-size: 25px;
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
</style>
