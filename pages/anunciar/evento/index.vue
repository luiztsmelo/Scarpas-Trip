<template>
  <div class="anunciar-evento" :class="{ whitebgcolor: !cadastroEvento0 }">

    <!-- PLANO EVENTO -->
    <div class="plano-evento" v-show="cadastroEvento0">
      
      <h1 class="__title">Divulgação: a chave para o sucesso do seu evento!</h1>

      <div class="pricing-box">
        <h2 class="__pricing-box-title">Selecione um plano:</h2>

        <div class="plano-row casual" @click="$store.commit('m_cadastroEvento1', true), $store.commit('m_cadastroEvento0', false), $store.commit('m_eventoPlanoCasual', true), $store.commit('m_eventoPlanoPro', false)">
          <span class="__plano-valor">R$25</span>
          <span class="__plano-title">CASUAL</span>
        </div>

        <div class="plano-row profissional" @click="$store.commit('m_cadastroEvento1', true), $store.commit('m_cadastroEvento0', false), $store.commit('m_eventoPlanoPro', true), $store.commit('m_eventoPlanoCasual', false)">
          <span class="__plano-valor">R$100</span>
          <span class="__plano-title">PROFISSIONAL</span>
        </div>

      </div>
    </div><!-- PLANO CONTAINER -->

      <!-- CADASTRO EVENTO Pg.1 -->
      <form class="cadastro-evento" v-show="cadastroEvento1">

        <h1 class="__form-title">Informações básicas</h1>

        <div class="item-form">
          <label>Plano</label>
          <span class="__plano" v-show="eventoPlanoCasual">Casual</span>
          <span class="__plano" v-show="eventoPlanoPro">Profissional</span>
        </div>  

        <div class="item-form">
          <label>Nome do evento</label>
          <input type="text" v-model="eventTitle" required>
        </div>  

        <div class="item-form">
          <label>Descrição básica</label>
          <input type="text" v-model="eventSubtitle" required>
        </div>   

        <div class="back-next"> 
          <div class="back-next-body">
            <button type="button" class="__back" @click="backBtn1">Voltar</button>
            <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
          </div>
        </div> 

      </form> <!-- CADASTRO EVENTO Pg.1 -->
   

      <!-- CADASTRO EVENTO Pg.2 -->
      <form class="cadastro-evento" v-show="cadastroEvento2">

        <h1 class="__form-title">Data e Horário</h1>

        <div class="back-next"> 
          <div class="back-next-body">
            <button type="button" class="__back" @click="backBtn2">Voltar</button>
            <button type="button" class="__next" @click="nextBtn2">Próximo</button>
          </div>
        </div> 
      
      </form><!-- CADASTRO EVENTO Pg.2 -->

      <!-- CADASTRO EVENTO Pg.3 -->
      <form class="cadastro-evento" v-show="cadastroEvento3">

        <h1 class="__form-title">Local</h1>
      
      </form><!-- CADASTRO EVENTO Pg.3 -->

      <!-- CADASTRO EVENTO Pg.4 -->
      <form class="cadastro-evento" v-show="cadastroEvento4">

        <h1 class="__form-title">Valor do Ingresso</h1>
      
      </form><!-- CADASTRO EVENTO Pg.4 -->

      <!-- CADASTRO EVENTO Pg.5 -->
      <form class="cadastro-evento" v-show="cadastroEvento5">

        <h1 class="__form-title">Imagens e Vídeo</h1>
      
      </form><!-- CADASTRO EVENTO Pg.5 -->

      <!-- CADASTRO EVENTO Pg.6 -->
      <form class="cadastro-evento" v-show="cadastroEvento6">

        <h1 class="__form-title">Investimento</h1>
      
      </form><!-- CADASTRO EVENTO Pg.6 -->
   

    

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar Evento em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data () {
    return {
      eventTitle: '',
      eventSubtitle: ''
    }
  },
  methods: {
    backBtn1 () {
      return this.$store.commit('m_cadastroEvento1', false), this.$store.commit('m_cadastroEvento0', true)
    },
    backBtn2 () {
      return this.$store.commit('m_cadastroEvento2', false), this.$store.commit('m_cadastroEvento1', true)
    },
    nextBtn1 () {
      if (this.eventTitle.length > 0 && this.eventSubtitle.length > 0) {
        return this.$store.commit('m_cadastroEvento1', false), this.$store.commit('m_cadastroEvento2', true)
      }
    },  
    nextBtn2 () {
    }  
  },
  computed: {
    form1ok () {
      if (this.eventTitle.length > 0 && this.eventSubtitle.length > 0) {
        return 'background: rgb(252, 86, 86)'
      }
    },
    eventoPlanoCasual () {
      return this.$store.state.eventoPlanoCasual
    },
    eventoPlanoPro () {
      return this.$store.state.eventoPlanoPro
    },
    cadastroEvento0 () {
      return this.$store.state.cadastroEvento0
    },
    cadastroEvento1 () {
      return this.$store.state.cadastroEvento1
    },
    cadastroEvento2 () {
      return this.$store.state.cadastroEvento2
    },
    cadastroEvento3 () {
      return this.$store.state.cadastroEvento3
    },
    cadastroEvento4 () {
      return this.$store.state.cadastroEvento4
    },
    cadastroEvento5 () {
      return this.$store.state.cadastroEvento5
    },
    cadastroEvento6 () {
      return this.$store.state.cadastroEvento6
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
  background: linear-gradient(60deg, #4568dc, #b06ab3);
  color: white;
  transition: all .222s ease;
  height: calc(100vh - 3.5rem);
  & .plano-evento {
    & .__title {
      font-size: 28px;
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
      padding: .4rem 0 .7rem 0;
      color: rgb(92, 92, 92);
      border-bottom: 1px solid rgb(210, 210, 210);
    }
    & .__form-title {
      font-size: 29px;
      font-weight: 600;
      padding: 3rem 0 1.5rem 0;
    }
    & .item-form {
      display: flex;
      flex-flow: column;
      margin: 1.5rem 0;
      & label {
        font-size: 17px;
        font-weight: 500;
      }
      & input {
        font-size: 19px;
        font-weight: 300;
        color: rgb(92, 92, 92);
        padding: .4rem 0 .7rem 0;
        border: none;
        border-bottom: 1px solid rgb(210, 210, 210);
        outline: none;
      }
    }
    & .back-next {
      position: fixed;
      z-index: 4;
      bottom: 0;
      left: 0;
      height: 3rem;
      width: 100%;
      background: white;
      box-shadow: 0px -1px 1px 0px rgba(0,0,0,0.15);
      & .back-next-body {
        display: flex;
        & button {
          width: 50%;
          height: 3rem;
        }
        & .__back {
          background: white;
        }
        & .__next {
          background: rgb(255, 165, 165);
          color: white;
        }
      }
    }
  }
}

.whitebgcolor {
  background: white;
}
/* TRANSITIONS */

.cadastro-evento-animation-enter-active, .cadastro-evento-animation-leave-active {
  transition: all .3s ease;
}
.cadastro-evento-animation-enter {
  opacity: 0;
  transform: translateY(100%);
}
.cadastro-evento-animation-leave-to {
  opacity: 1;
  transform: translateY(-100%);
}
</style>
