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

        <div class="plano-row avancado" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_planoMarinheiro', true), $store.commit('m_planoCapitao', false), $store.commit('m_passeioProgressBar', (100/11))">
          <span class="__plano-valor">R$49</span>
          <span class="__plano-valor-mes">/mês</span>
          <span class="__plano-title">MARINHEIRO</span>
          <div class="__arrow-down-black"></div>
        </div>

        <div class="plano-row profissional" @click="$store.commit('m_cadastroPasseio1', true), $store.commit('m_cadastroPasseio0', false), $store.commit('m_planoMarinheiro', false), $store.commit('m_planoCapitao', true), $store.commit('m_passeioProgressBar', (100/11))">
          <span class="__plano-valor">R$79</span>
          <span class="__plano-valor-mes">/mês</span>
          <span class="__plano-title">CAPITÃO</span>
          <div class="__arrow-down-white"></div>
        </div>

      </div>
    </div><!-- PLANO PASSEIO -->



    <div class="progress-bar" v-show="!$store.state.cadastroPasseio0" :style="'width:' + $store.state.passeioProgressBar + '%'"></div>




    <!-- CADASTRO EVENTO -->



    <!-- ########## TIPO DE PASSEIO PG.1 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio1">

      <h1 class="__form-title">Que tipo de passeio deseja anunciar?</h1>

      <div class="form-radio" v-ripple="'rgba(0,0,0,.03)'" @click="isLancha()">
        <div class="form-radio-body">
          <h3>Lancha</h3>
          <input type="radio" value="Lancha" v-model="$store.state.passeioData.tipoPasseio" ref="lancha">
        </div>
      </div> 

      <div class="form-radio" v-ripple="'rgba(0,0,0,.03)'" @click="is4x4()">
        <div class="form-radio-body">
          <h3>4x4</h3>
          <input type="radio" value="4x4" v-model="$store.state.passeioData.tipoPasseio" ref="jeep">
        </div>
      </div> 

      <div class="form-radio" v-ripple="'rgba(0,0,0,.03)'" @click="isBuggy()">
        <div class="form-radio-body">
          <h3>Buggy</h3>
          <input type="radio" value="Buggy" v-model="$store.state.passeioData.tipoPasseio" ref="buggy">
        </div>
      </div> 

      <div class="form-radio" v-ripple="'rgba(0,0,0,.03)'">
        <div class="form-radio-body" style="border-bottom:none" @click="isHelicoptero()">
          <h3>Helicóptero</h3>
          <input type="radio" value="Helicóptero" v-model="$store.state.passeioData.tipoPasseio" ref="helicoptero">
        </div>
      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TIPO DE PASSEIO PG.1 ########## -->




    <!-- ########## LOTAÇÃO PG.2 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio2">

      <h1 class="__form-title">Passeio de {{ tipoPasseioTitle }} para até quantas pessoas?</h1>

      <div class="item-form">
        <label>Lotação</label>
        <select v-model="$store.state.passeioData.lotacao">
          <option v-for="n in 20">{{ n }} pessoas</option>
        </select>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## LOTAÇÃO PG.2 ########## -->




    <!-- ########## DURAÇÃO PG.3 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio3">

      <h1 class="__form-title">Quanto tempo de passeio?</h1>

      <div class="item-form">
        <label>Duração</label>
        <input type="time" v-model="$store.state.passeioData.duracao" required>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## DURAÇÃO PG.3 ########## -->




    <!-- ########## LOCAL DE SAÍDA PG.4 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio4">

      <h1 class="__form-title">O passeio sairá de onde?</h1>

      <div class="item-form">
        <label>Local</label>
        <select v-model="$store.state.passeioData.localSaida">
          <option>Clube Campestre Escarpas do Lago</option>
          <option>Heliponto Escarpas do Lago</option>
          <option>Ponte do Turvo</option>
          <option>Barragem do Dique</option>
          <option>Kanto da Ilha</option>
          <option>Outro</option>
        </select>
      </div> 



      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## LOCAL DE SAÍDA PG.4 ########## -->




    <!-- ########## PONTOS VISITADOS PG.5 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio5">

      <h1 class="__form-title">Quais serão os pontos visitados?</h1>

 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## PONTOS VISITADOS PG.5 ########## -->




    <!-- ########## VALOR PASSEIO PG.6 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio6">

      <h1 class="__form-title">Qual será o valor por pessoa?</h1>

      <div class="item-form">
        <label>Valor</label>
        <money v-model="$store.state.passeioData.valorPasseio"></money>
      </div>


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## VALOR PASSEIO PG.6 ########## -->




    <!-- ########## IMAGENS E VÍDEO PG.7 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio7">

      <h1 class="__form-title">Adicione imagens e vídeo</h1>

 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IMAGENS E VÍDEO PG.7 ########## -->




    <!-- ########## TÍTULO PG.8 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio8">

      <h1 class="__form-title">Dê um nome para seu passeio</h1>

      <textarea 
      v-model="$store.state.passeioData.title"
      v-autosize="title"
      maxlength="50"
      placeholder="ex: Passeio de Lancha no Lago de Furnas"
      required>
      {{title}}</textarea>

      <span class="__lenght-calc">{{ titleLength }}</span>

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn8">Voltar</button>
          <button type="button" class="__next" :style="form8ok" @click="nextBtn8">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TÍTULO PG.8 ########## -->




    <!-- ########## DESCRIÇÃO PG.9 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio9">

      <h1 class="__form-title">Descreva seu passeio</h1>   

      <textarea 
      v-model="$store.state.passeioData.subtitle"
      v-autosize="subtitle"
      maxlength="400"
      placeholder="Coloque informações importantes sobre seu passeio aqui"
      required>
      {{subtitle}}</textarea>

      <span class="__lenght-calc">{{ subtitleLength }}</span> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn9">Voltar</button>
          <button type="button" class="__next" :style="form9ok" @click="nextBtn9">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## DESCRIÇÃO PG.9 ########## -->




    <!-- ########## IDENTIFICAÇÃO PG.10 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio10">

      <h1 class="__form-title">Identifique-se {{ planoEscolhido }}</h1>   


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn10">Voltar</button>
          <button type="button" class="__next" :style="form10ok" @click="nextBtn10">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IDENTIFICAÇÃO PG.10 ########## -->




    <!-- ########## INVESTIMENTO PG.11 ########## -->
    <form class="cadastro-passeio" v-show="$store.state.cadastroPasseio11">

      <h1 class="__form-title">Investimento</h1>   


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn11">Voltar</button>
          <button type="button" class="__next" :style="form11ok" @click="concluir">Concluir</button>
        </div>
      </div> 
    
    </form><!-- ########## INVESTIMENTO PG.11 ########## -->




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
  data() {
    return {
      title: '',/* Vue Autosize */
      subtitle: '',/* Vue Autosize */
    }
  },
  methods: {
    isLancha () {
      this.$refs.lancha.click()
    },
    is4x4 () {
      this.$refs.jeep.click()
    },
    isBuggy () {
      this.$refs.buggy.click()
    },
    isHelicoptero () {
      this.$refs.helicoptero.click()
    },
    /* ******************** BACK BUTTONS ******************** */
    backBtn1 () {
      return this.$store.commit('m_cadastroPasseio1', false), this.$store.commit('m_cadastroPasseio0', true)
    },
    backBtn2 () {
      return this.$store.commit('m_cadastroPasseio2', false), this.$store.commit('m_cadastroPasseio1', true)
    },
    backBtn3 () {
      return this.$store.commit('m_cadastroPasseio3', false), this.$store.commit('m_cadastroPasseio2', true)
    },
    backBtn4 () {
      return this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio3', true)
    },
    backBtn5 () {
      return this.$store.commit('m_cadastroPasseio5', false), this.$store.commit('m_cadastroPasseio4', true)
    },
    backBtn6 () {
      return this.$store.commit('m_cadastroPasseio6', false), this.$store.commit('m_cadastroPasseio5', true)
    },
    backBtn7 () {
      return this.$store.commit('m_cadastroPasseio7', false), this.$store.commit('m_cadastroPasseio6', true)
    },
    backBtn8 () {
      return this.$store.commit('m_cadastroPasseio8', false), this.$store.commit('m_cadastroPasseio7', true)
    },
    backBtn9 () {
      return this.$store.commit('m_cadastroPasseio9', false), this.$store.commit('m_cadastroPasseio8', true)
    },
    backBtn10 () {
      return this.$store.commit('m_cadastroPasseio10', false), this.$store.commit('m_cadastroPasseio9', true)
    },
    backBtn11 () {
      return this.$store.commit('m_cadastroPasseio11', false), this.$store.commit('m_cadastroPasseio10', true)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (this.$store.state.passeioData.tipoPasseio !== null) {
        return this.$store.commit('m_cadastroPasseio1', false), this.$store.commit('m_cadastroPasseio2', true), this.$store.commit('m_passeioProgressBar', (100/11)*2)
      }
    },
    nextBtn2 () {
      if (this.$store.state.passeioData.lotacao !== null) {
        return this.$store.commit('m_cadastroPasseio2', false), this.$store.commit('m_cadastroPasseio3', true), this.$store.commit('m_passeioProgressBar', (100/11)*3)
      }
    },
    nextBtn3 () {
      if (this.$store.state.passeioData.duracao !== null) {
        return this.$store.commit('m_cadastroPasseio3', false), this.$store.commit('m_cadastroPasseio4', true), this.$store.commit('m_passeioProgressBar', (100/11)*4)
      }
    },
    nextBtn4 () {
      if (1<2) {
        return this.$store.commit('m_cadastroPasseio4', false), this.$store.commit('m_cadastroPasseio5', true), this.$store.commit('m_passeioProgressBar', (100/11)*5)
      }
    },
    nextBtn5 () {
      if (1<2) {
        return this.$store.commit('m_cadastroPasseio5', false), this.$store.commit('m_cadastroPasseio6', true), this.$store.commit('m_passeioProgressBar', (100/11)*6)
      }
    },
    nextBtn6 () {
      if (1<2) {
        return this.$store.commit('m_cadastroPasseio6', false), this.$store.commit('m_cadastroPasseio7', true), this.$store.commit('m_passeioProgressBar', (100/11)*7)
      }
    },
    nextBtn7 () {
      if (1<2) {
        return this.$store.commit('m_cadastroPasseio7', false), this.$store.commit('m_cadastroPasseio8', true), this.$store.commit('m_passeioProgressBar', (100/11)*8)
      }
    },
    nextBtn8 () {
      if (this.$store.state.passeioData.title !== '') {
        return this.$store.commit('m_cadastroPasseio8', false), this.$store.commit('m_cadastroPasseio9', true), this.$store.commit('m_passeioProgressBar', (100/11)*9)
      }
    },
    nextBtn9 () {
      if (this.$store.state.passeioData.subtitle !== '') {
        return this.$store.commit('m_cadastroPasseio9', false), this.$store.commit('m_cadastroPasseio10', true), this.$store.commit('m_passeioProgressBar', (100/11)*10)
      }
    },
    nextBtn10 () {
      if (1<2) {
        return this.$store.commit('m_cadastroPasseio10', false), this.$store.commit('m_cadastroPasseio11', true), this.$store.commit('m_passeioProgressBar', (100/11)*11)
      }
    },
    concluir () {
    }
  },
  computed: {
    tipoPasseioTitle () {
      if (this.$store.state.passeioData.tipoPasseio !== null) {
        return this.$store.state.passeioData.tipoPasseio.toLowerCase()
      }
    },
    titleLength () {
      return 50 - this.$store.state.passeioData.title.length
    },
    subtitleLength () {
      return 400 - this.$store.state.passeioData.subtitle.length
    },
    planoEscolhido () {
      if (this.$store.state.passeioData.planoMarinheiro === true) {
        return 'marinheiro'
      }
      if (this.$store.state.passeioData.planoCapitao === true) {
        return 'capitão'
      }
    },
    form1ok () {
      if (this.$store.state.passeioData.tipoPasseio !== null) {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form2ok () {
      if (this.$store.state.passeioData.lotacao !== null) {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form3ok () {
      if (this.$store.state.passeioData.duracao !== null) {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form4ok () {
      if (1<2) {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form5ok () {
      if (1<2) {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form6ok () {
      if (1<2) {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form7ok () {
      if (1<2) {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form8ok () {
      if (this.$store.state.passeioData.title !== '') {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form9ok () {
      if (this.$store.state.passeioData.subtitle !== '') {
        return 'background:#49A5FC;cursor:pointer'
      }
    },
    form10ok () {
      if (1<2) {
        return 'background:#49A5FC;cursor:pointer'
      }
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

<style>
@import url('../../../assets/css/main.css');
@import url('../../../assets/css/illustrations.css');

.anunciar-passeio {
  margin-top: 3.2rem;
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
        transform: translateY(-4px) rotate(-20deg);
        margin: 2rem 0;
        width: 5.3rem;
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
    padding: 0 0 3rem 0;
    & .__form-title {
      padding: 3rem 7% 1.5rem 7%;
      line-height: 35px;
      font-size: 29px;
      font-weight: 600;
      z-index: 999;
    }
    & textarea {
      padding: 0 7%;
      margin-bottom: .5rem;
      width: 100%;
      font-size: 19px;
      font-weight: 300;
      line-height: 26px;
      background: white;
      color: rgb(92, 92, 92);
      border: none;
      outline: none;
      resize: none;
    }
    & .__lenght-calc {
      padding: 0 7%;
      padding-bottom: 5rem;
      z-index: 999;
      font-size: 20px;
      font-weight: 600;
      color: rgb(112, 112, 112);
    }
    & .item-form {
      padding: 0 7%;
      display: flex;
      flex-flow: column;
      margin: 1.7rem 0;
      & label {
        font-size: 18px;
        font-weight: 500;
      }
      & input {
        width: 100%;
        font-size: 19px;
        font-weight: 300;
        background: white;
        color: rgb(92, 92, 92);
        padding: .5rem 0 .6rem 0;
        border: none;
        border-bottom: 1px solid rgb(222, 222, 222);
        outline: none;
      }
      & select {
        width: 100%;
        font-size: 19px;
        font-weight: 300;
        background: white;
        color: rgb(92, 92, 92);
        padding: .5rem 0 .6rem 0;
        border: none;
        border-bottom: 1px solid rgb(222, 222, 222);
        outline: none;
      }
    }
    & .form-radio {
      padding: 0 7%;
      & .form-radio-body {
        padding: 1rem 0;
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        border-bottom: 1px solid rgb(222, 222, 222);
      }
      & input[type="radio"] {
        all: initial;
        background: rgb(237, 237, 237);
        border: 1px solid rgb(222, 222, 222);
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        
      }
      & input[type=radio]:checked {
        background: #49A5FC;
        border: 1px solid #49A5FC;
      }
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
          transition: all .3s ease;
          cursor: no-drop;
          background: rgb(222, 222, 222);
          color: white;
        }
      }
    }
  }
}
</style>
