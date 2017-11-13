<template>
  <div class="anunciar-passeio">

    <!-- PLANO PASSEIO -->
    <div class="plano-passeio" v-show="$store.state.cadastroPasseio0">
      
      <div class="imgs-header">
        <img class="__img-boat" src="../../../assets/img/anuncio-passeio-boat.svg">
        <img class="__img-jeep" src="../../../assets/img/anuncio-passeio-jeep.svg">
      </div>
      
      <h1 class="__title">Amplie seus ganhos anunciando seu passeio com a gente!</h1>
      
      <div class="pricing-box">
        <h2 class="__pricing-box-title">Escolha seu plano:</h2>

        <div class="plano-row avancado" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_planoAvancadoPasseio', true), $store.commit('m_planoProPasseio', false), $store.commit('m_passeioProgressBar', (100/10))">
          <span class="__plano-valor">R$49</span>
          <span class="__plano-valor-mes">/mês</span>
          <span class="__plano-title">AVANÇADO</span>
          <div class="__arrow-down-black"></div>
        </div>

        <div class="plano-row profissional" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_planoAvancadoPasseio', false), $store.commit('m_planoProPasseio', true), $store.commit('m_passeioProgressBar', (100/10))">
          <span class="__plano-valor">R$79</span>
          <span class="__plano-valor-mes">/mês</span>
          <span class="__plano-title">PROFISSIONAL</span>
          <div class="__arrow-down-white"></div>
        </div>

      </div>
    </div><!-- PLANO PASSEIO -->


    <div class="progress-bar" v-show="!$store.state.cadastroPasseio0" :style="'width:' + $store.state.passeioProgressBar + '%'"></div>


    <!-- CADASTRO EVENTO -->


    <!-- ########## TIPO DE PASSEIO PG.1 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio1">

      <h1 class="__form-title">Qual será o tipo de passeio?</h1>



      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TIPO DE PASSEIO PG.1 ########## -->


    <!-- CADASTRO EVENTO -->

  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  head () {
    return {
      title: 'Anunciar Passeio em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  methods: {
    /* ******************** BACK BUTTONS ******************** */
    backBtn1 () {
      return this.$store.commit('m_cadastroPasseio1', false), this.$store.commit('m_cadastroPasseio0', true)
    },
    backBtn2 () {
      return this.$store.commit('m_cadastroPasseio2', false), this.$store.commit('m_cadastroPasseio1', true)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
    }
  },
  computed: {
    form1ok () {
      if (1>2) {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
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

<style>
@import url('../../../assets/css/main.css');
@import url('../../../assets/css/illustrations.css');

.anunciar-passeio {
  margin-top: 3.2rem;
  display: flex;
  flex-flow: column;
  background: linear-gradient(40deg, #B5D9F0, #49A5FC);
  color: white;
  height: calc(100vh - 3.2rem);
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.2rem;
    height: 3px;
    z-index: 8888;
    background: linear-gradient(80deg, #B5D9F0, #49A5FC);
    transition: all .3s ease;
  }
  /* ******************** PLANO PASSEIO ******************** */
  & .plano-passeio {
    display: flex;
    flex-flow: column;
    align-items: center;
    & .imgs-header {
      width: 65%;
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      align-items: center;
      & .__img-boat {
        margin: 2rem 0;
        width: 5.7rem;
        height: auto;
      }
      & .__img-jeep {
        transform: translateY(-5px) rotate(-17deg);
        margin: 2rem 0;
        width: 5.5rem;
        height: auto;
      }
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
      & .avancado {
        background: white;
        color: var(--color01);
      }
      & .profissional {
        background: rgb(13, 13, 13);
      }
    }
  }
  /* ******************** CADASTRO PASSEIO ******************** */
  & .cadastro-passeio {
    height: 100%;
    background: white;
    color: var(--color01);
    padding: 0 7% 3rem 7%;
    & .__form-title {
      line-height: 35px;
      font-size: 29px;
      font-weight: 600;
      padding: 3rem 0 1.5rem 0;
      z-index: 999;
    }
    & .back-next {
      position: fixed;
      z-index: 3;
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
          cursor: pointer;
          background: white;
        }
        & .__next {
          cursor: no-drop;
          background: #A0CFFD;
          color: white;
        }
      }
    }
  }
}
</style>
