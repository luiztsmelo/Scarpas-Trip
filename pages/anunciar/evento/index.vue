<template>
  <div class="anunciar-evento">

    <!-- PLANO CONTAINER -->
    
      <div class="plano-evento" v-show="!planoEventoSelecionado">
        
        <h1 class="__title">Divulgação: a chave para o sucesso do seu evento!</h1>

        <div class="pricing-box">
          <h2 class="__pricing-box-title">Selecione um plano:</h2>

          <div class="plano-row casual" @click="$store.commit('m_planoEventoSelecionado', true)">
            <span class="__plano-valor">R$25</span>
            <span class="__plano-title">CASUAL</span>
          </div>

          <div class="plano-row profissional" @click="$store.commit('m_planoEventoSelecionado', true)">
            <span class="__plano-valor">R$100</span>
            <span class="__plano-title">PROFISSIONAL</span>
          </div>

        </div>
      </div>
    <!-- PLANO CONTAINER -->

    <transition name="plano-animation">
      <form class="cadastro-evento" v-show="planoEventoSelecionado">

        <h1 class="__form-title">Informações básicas</h1>

        <div class="item-form">
          <label>Nome do evento</label>
          <input type="text">
        </div>  

        <div class="item-form">
          <label>Descrição básica</label>
          <input type="text">
        </div>  
 
      

      </form>
    </transition>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Evento em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left',
  computed: {
    planoEventoSelecionado () {
      return this.$store.getters.planoEventoSelecionado
    }
  },
}
</script>

<style scope>
@import url('../../../assets/css/main.css');

.anunciar-evento {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(60deg, #ee0979, #ff6a00);
  color: white;
  transition: all .222s ease;
  height: calc(100vh - 3.5rem);
  & .plano-evento {
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
        height: 3.5rem;
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
  & .cadastro-evento {
    background: white;
    color: var(--color01);
    height: calc(100vh - 3.5rem);
    padding: 0 7%;
    & .__form-title {
      font-size: 22px;
      font-weight: 600;
      padding-top: 3rem;
    }
    & .item-form {
      display: flex;
      flex-flow: column;
      margin: 1.2rem 0;
      & label {
        font-size: 14px;
        font-weight: 500;
      }
      & input {
        padding: .5rem 0 .8em 0;
        border: none;
        border-bottom: 1px solid rgb(210, 210, 210);
        outline: none;
      }
    }
  }
}

/* TRANSITIONS */
.plano-animation-enter,
.plano-animation-leave-active {
  opacity: 0;
  transform: translateX(60px);
}
</style>
