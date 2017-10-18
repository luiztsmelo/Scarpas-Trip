<template>
  <div class="anunciar-evento">

    <!-- PLANO EVENTO -->
    <div class="plano-evento" v-show="!planoEventoSelecionado">
      
      <h1 class="__title">Divulgação: a chave para o sucesso do seu evento!</h1>

      <div class="pricing-box">
        <h2 class="__pricing-box-title">Selecione um plano:</h2>

        <div class="plano-row casual" @click="$store.commit('m_planoEventoSelecionado', true), $store.commit('m_isPlanoEventoCasual', true)">
          <span class="__plano-valor">R$25</span>
          <span class="__plano-title">CASUAL</span>
        </div>

        <div class="plano-row profissional" @click="$store.commit('m_planoEventoSelecionado', true), $store.commit('m_isPlanoEventoPro', true)">
          <span class="__plano-valor">R$100</span>
          <span class="__plano-title">PROFISSIONAL</span>
        </div>

      </div>
    </div><!-- PLANO CONTAINER -->

    <!-- CADASTRO EVENTO -->
    <transition name="plano-animation">
      <form class="cadastro-evento" v-show="planoEventoSelecionado">

        <h1 class="__title">Cadastro de Evento</h1> 

        <h1 class="__form-title">Informações básicas</h1>

        <div class="item-form">
          <label>Plano</label>
          <span class="__plano">{{ plano }}</span>
        </div>  

        <div class="item-form">
          <label>Nome do evento</label>
          <input type="text">
        </div>  

        <div class="item-form">
          <label>Descrição básica</label>
          <input type="text">
        </div>  

        <h1 class="__form-title">Pagamento</h1>
      
      </form>
    </transition><!-- CADASTRO EVENTO -->

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
      return this.$store.state.planoEventoSelecionado
    },
    plano () {
      if (this.$store.state.isPlanoEventoCasual === true) {
        return 'Casual'
      } else {
        return 'Profissional'
      }
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
  background: linear-gradient(60deg, #4568dc  , #b06ab3);
  color: white;
  transition: all .222s ease;
  height: calc(100vh - 3.5rem);
  & .plano-evento {
    & .__title {
      font-size: 27px;
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
        border-radius: 3px;
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
    & .__title {
      font-size: 30px;
      font-weight: 600;
      padding-top: 3rem;
    }
    & .__plano {
      font-size: 19px;
      font-weight: 300;
      padding: .5rem 0 .6em 0;
      color: rgb(92, 92, 92);
      border-bottom: 1px solid rgb(210, 210, 210);
    }
    & .__form-title {
      font-size: 24px;
      font-weight: 600;
      padding-top: 3rem;
    }
    & .item-form {
      display: flex;
      flex-flow: column;
      margin: 1.3rem 0;
      & label {
        font-size: 16px;
        font-weight: 500;
      }
      & input {
        font-size: 19px;
        font-weight: 300;
        color: rgb(92, 92, 92);
        padding: .5rem 0 .6em 0;
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
