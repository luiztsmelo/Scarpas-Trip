<template>
  <div class="anunciar-acomodacao">

    <!-- PLANO ACOMODAÇÃO -->
    <div class="plano-acomodacao" v-show="$store.state.cadastroAcomod0">
      
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

      <button class="__anunciar-btn" @click="$store.commit('m_cadastroAcomod1', true), $store.commit('m_cadastroAcomod0', false), $store.commit('m_acomodProgressBar', (100/10))">Anunciar</button>

    </div><!-- PLANO ACOMODAÇÃO -->




    <div class="progress-bar" v-show="!$store.state.cadastroAcomod0" :style="'width:' + $store.state.acomodProgressBar + '%'"></div>




    <!-- CADASTRO ACOMODAÇÃO -->



    <!-- ########## TIPO DE ACOMODAÇÃO PG.1 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod1">

      <h1 class="__form-title">Que tipo de propriedade deseja anunciar?</h1>

      <div class="item-form">
        <label>Tipo</label>
        <select v-model="$store.state.acomodData.tipoAcomod">
          <option>Casa</option>
          <option>Rancho</option>
          <option>Camping</option>
          <option>Hostel</option>
          <option>Pousada</option>
          <option>Hotel</option>
          <option>Fazenda</option>
        </select>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn1">Voltar</button>
          <button type="button" class="__next" :style="form1ok" @click="nextBtn1">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TIPO DE ACOMODAÇÃO PG.1 ########## -->




    <!-- ########## TOTAL DE HÓSPEDES PG.2 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod2">

      <h1 class="__form-title">Quantas pessoas podem se hospedar?</h1>

      <div class="item-form">
        <label>Total de Hóspedes</label>
        <select v-model="$store.state.acomodData.totalHospedes">
          <option v-for="n in 20">{{ n }}</option>
          <option>Mais de 20</option>
        </select>
      </div> 

      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn2">Voltar</button>
          <button type="button" class="__next" :style="form2ok" @click="nextBtn2">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## TOTAL DE HÓSPEDES PG.2 ########## -->




    <!-- ########## CARACTERÍSTICAS PG.3 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod3">

      <h1 class="__form-title">Características da sua {{ $store.state.acomodData.tipoAcomod }}</h1>

      <div class="item-form">
        <label>Nº de Quartos</label>
        <select v-model="$store.state.acomodData.totalQuartos">
          <option v-for="n in 10">{{ n }}</option>
          <option>Mais de 10</option>
        </select>
      </div> 

      <div class="item-form">
        <label>Nº de Banheiros</label>
        <select v-model="$store.state.acomodData.totalBanheiros">
          <option v-for="n in 6">{{ n }}</option>
          <option>Mais de 6</option>
        </select>
      </div> 


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn3">Voltar</button>
          <button type="button" class="__next" :style="form3ok" @click="nextBtn3">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## CARACTERÍSTICAS PG.3 ########## -->




    <!-- ########## COMODIDADES PG.4 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod4">

      <h1 class="__form-title">Quais comodidades são oferecidas?</h1>

      


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn4">Voltar</button>
          <button type="button" class="__next" :style="form4ok" @click="nextBtn4">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## COMODIDADES PG.4 ########## -->




    <!-- ########## LOCAL PG.5 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod5">

      <h1 class="__form-title">Qual a localização?</h1>

      


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn5">Voltar</button>
          <button type="button" class="__next" :style="form5ok" @click="nextBtn5">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## LOCAL PG.5 ########## -->




    <!-- ########## IMAGEM E VÍDEOS PG.6 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod6">

      <h1 class="__form-title">Adicione Imagens e Vídeo</h1>

      


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn6">Voltar</button>
          <button type="button" class="__next" :style="form6ok" @click="nextBtn6">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## IMAGEM E VÍDEOS PG.6 ########## -->




    <!-- ########## VALOR DO ALUGUEL PG.7 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod7">

      <h1 class="__form-title">Quanto será cobrado?</h1>

      


      <div class="back-next"> 
        <div class="back-next-body">
          <button type="button" class="__back" @click="backBtn7">Voltar</button>
          <button type="button" class="__next" :style="form7ok" @click="nextBtn7">Próximo</button>
        </div>
      </div> 
    
    </form><!-- ########## VALOR DO ALUGUEL PG.7 ########## -->




    <!-- ########## TÍTULO PG.8 ########## -->
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod8">

      <h1 class="__form-title">Dê um nome para seu anúncio</h1>

      <textarea 
      v-model="$store.state.acomodData.title"
      v-autosize="title"
      maxlength="50"
      rows="1"
      placeholder="ex: Linda casa em Escarpas do Lago"
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
    <form class="cadastro-acomodacao" v-show="$store.state.cadastroAcomod9">

      <h1 class="__form-title">Descreva melhor seu anúncio</h1>   

      <textarea 
      v-model="$store.state.acomodData.subtitle"
      v-autosize="subtitle"
      maxlength="400"
      rows="1"
      placeholder="Coloque informações importantes aqui, que não foram perguntadas antes"
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


    <!-- CADASTRO ACOMODAÇÃO -->


  </div>
</template>

<script>
import * as firebase from 'firebase'
import MaskedInput from 'vue-text-mask'

export default {
  components: { 
    MaskedInput 
  },
  head () {
    return {
      title: 'Anunciar Acomodação em Escarpas do Lago ‒ Escarpas Trip'
    }
  },
  transition: 'opacity',
  data() {
    return {
      title: '',/* Vue Autosize */
      subtitle: '',/* Vue Autosize */
      showCroppaModal1: false,
      showCroppaModal2: false,
      imageURL1: null,
      imageURL2: null
    }
  },
  methods: {
    googleSignIn () {
      this.$store.dispatch('a_googleSignIn')
    },
    /* ******************** IMAGE INPUT ******************** */
    /* --- Image 1 --- */
    imageChoose1 () {
      this.showCroppaModal1 = true
    },
    async imageConfirmed1 () {
      if (this.imageURL1 !== null) {
        return 
      } else {
        const blobAcL1 = await this.$refs.myCroppa1.promisedBlob('image/jpeg', 0.01)
        const blobAcH1J = await this.$refs.myCroppa1.promisedBlob('image/jpeg')
        const blobAcH1W = await this.$refs.myCroppa1.promisedBlob('image/webp')
        let url1 = URL.createObjectURL(blobAcH1J)
        this.imageURL1 = url1
        this.$store.state.blobAcL1 = blobAcL1
        this.$store.state.blobAcH1J = blobAcH1J
        this.$store.state.blobAcH1W = blobAcH1W
      }
    },
    removeImage1 () {
      this.imageURL1 = null
      this.$refs.myCroppa1.remove()
      this.showCroppaModal1 = false
    },
    /* --- Image 2 --- */
    imageChoose2 () {
      this.showCroppaModal2 = true
    },
    async imageConfirmed2 () {
      if (this.imageURL2 !== null) {
        return 
      } else {
        const blobAcL2 = await this.$refs.myCroppa2.promisedBlob('image/jpeg', 0.01)
        const blobAcH2J = await this.$refs.myCroppa2.promisedBlob('image/jpeg')
        const blobAcH2W = await this.$refs.myCroppa2.promisedBlob('image/webp')
        let url2 = URL.createObjectURL(blobAcH2J)
        this.imageURL2 = url2
        this.$store.state.blobAcL2 = blobAcL2
        this.$store.state.blobAcH2J = blobAcH2J
        this.$store.state.blobAcH2W = blobAcH2W
      }
    },
    removeImage2 () {
      this.imageURL2 = null
      this.$refs.myCroppa2.remove()
      this.showCroppaModal2 = false
    },
    /* ******************** BACK BUTTONS ******************** */
    backBtn1 () {
      return this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod0', true)
    },
    backBtn2 () {
      return this.$store.commit('m_cadastroAcomod2', false), this.$store.commit('m_cadastroAcomod1', true)
    },
    backBtn3 () {
      return this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod2', true)
    },
    backBtn4 () {
      return this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod3', true)
    },
    backBtn5 () {
      return this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod4', true)
    },
    backBtn6 () {
      return this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod5', true)
    },
    backBtn7 () {
      return this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod6', true)
    },
    backBtn8 () {
      return this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod7', true)
    },
    backBtn9 () {
      return this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod8', true)
    },
    /* ******************** NEXT BUTTONS ******************** */
    nextBtn1 () {
      if (this.$store.state.acomodData.tipoAcomod !== null) {
        return this.$store.commit('m_cadastroAcomod1', false), this.$store.commit('m_cadastroAcomod2', true), this.$store.commit('m_acomodProgressBar', (100/10)*2)
      }
    },
    nextBtn2 () {
      if (this.$store.state.acomodData.totalHospedes !== null) {
        return this.$store.commit('m_cadastroAcomod2', false), this.$store.commit('m_cadastroAcomod3', true), this.$store.commit('m_acomodProgressBar', (100/10)*3)
      }
    },
    nextBtn3 () {
      if (1<2) {
        return this.$store.commit('m_cadastroAcomod3', false), this.$store.commit('m_cadastroAcomod4', true), this.$store.commit('m_acomodProgressBar', (100/10)*4)
      }
    },
    nextBtn4 () {
      if (1<2) {
        return this.$store.commit('m_cadastroAcomod4', false), this.$store.commit('m_cadastroAcomod5', true), this.$store.commit('m_acomodProgressBar', (100/10)*5)
      }
    },
    nextBtn5 () {
      if (1<2) {
        return this.$store.commit('m_cadastroAcomod5', false), this.$store.commit('m_cadastroAcomod6', true), this.$store.commit('m_acomodProgressBar', (100/10)*6)
      }
    },
    nextBtn6 () {
      if (1<2) {
        return this.$store.commit('m_cadastroAcomod6', false), this.$store.commit('m_cadastroAcomod7', true), this.$store.commit('m_acomodProgressBar', (100/10)*7)
      }
    },
    nextBtn7 () {
      if (1<2) {
        return this.$store.commit('m_cadastroAcomod7', false), this.$store.commit('m_cadastroAcomod8', true), this.$store.commit('m_acomodProgressBar', (100/10)*8)
      }
    },
    nextBtn8 () {
      if (1<2) {
        return this.$store.commit('m_cadastroAcomod8', false), this.$store.commit('m_cadastroAcomod9', true), this.$store.commit('m_acomodProgressBar', (100/10)*9)
      }
    },
    nextBtn9 () {
      if (1<2) {
        return this.$store.commit('m_cadastroAcomod9', false), this.$store.commit('m_cadastroAcomod10', true), this.$store.commit('m_acomodProgressBar', (100/10)*10)
      }
    },
  },
  computed: {
    titleLength () {
      return 50 - this.$store.state.passeioData.title.length
    },
    subtitleLength () {
      return 400 - this.$store.state.passeioData.subtitle.length
    },
    form1ok () {
      if (this.$store.state.acomodData.tipoAcomod !== null) {
        return 'background:#1CD8D2;cursor:pointer'
      }
    },
    form2ok () {
      if (this.$store.state.acomodData.totalHospedes !== null) {
        return 'background:#1CD8D2;cursor:pointer'
      }
    },
    form3ok () {
      if (1<2) {
        return 'background:#1CD8D2;cursor:pointer'
      }
    },
    form4ok () {
      if (1<2) {
        return 'background:#1CD8D2;cursor:pointer'
      }
    },
    form5ok () {
      if (1<2) {
        return 'background:#1CD8D2;cursor:pointer'
      }
    },
    form6ok () {
      if (1<2) {
        return 'background:#1CD8D2;cursor:pointer'
      }
    },
    form7ok () {
      if (1<2) {
        return 'background:#1CD8D2;cursor:pointer'
      }
    },
    form8ok () {
      if (1<2) {
        return 'background:#1CD8D2;cursor:pointer'
      }
    },
    form9ok () {
      if (1<2) {
        return 'background:#1CD8D2;cursor:pointer'
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

.anunciar-acomodacao {
  margin-top: 3.2rem;
  background: linear-gradient(45deg, #93EDC7, #1CD8D2);
  color: white;
  transition: var(--main-transition);
  & .progress-bar {
    position: fixed;
    top: 3.2rem;
    height: 3px;
    z-index: 8888;
    background: linear-gradient(80deg, #93EDC7, #1CD8D2);
    transition: all .3s ease;
  }
  /* ******************** PLANO ACOMODAÇÃO ******************** */
  & .plano-acomodacao {
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
  /* ******************** CADASTRO ACOMODAÇÃO ******************** */
  & .cadastro-acomodacao {
    height: 100%;
    background: white;
    color: var(--color01);
    padding: 0 0 3rem 0;
    & .__form-title {
      padding: 3rem 7% 1.5rem 7%;
      line-height: 35px;
      font-size: 30px;
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
      color: var(--color01);
      border: none;
      outline: none;
      resize: none;
    }
    & .__lenght-calc {
      padding: 0 7%;
      padding-bottom: 6rem;
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
        text-transform: uppercase;
        font-weight: 600;
        font-size: 15px;
      }
      & input {
        width: 100%;
        font-size: 19px;
        font-weight: 300;
        background: white;
        color: var(--color01);
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
        color: var(--color01);
        padding: .5rem 0 .6rem 0;
        border: none;
        border-bottom: 1px solid rgb(222, 222, 222);
        outline: none;
      }
      & .__local-saida-text {
        padding: .5rem 0 .6rem 0;
        border-bottom: 1px solid rgb(222, 222, 222);
      }
    }
    & .modal-croppa {
      background: rgba(0, 0, 0, 0.84);
      width:  100%;
      height: 100%;
      position: fixed;
      top:  0;
      left: 0;
      z-index: 9999;
      & .modal-croppa-body {
        display: flex;
        flex-flow: column;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: white;
        & h1 {
          font-weight: 300;
        }
        & canvas {
          margin: 3rem 0 1rem 0;
          border: 2px dashed white;
        }
        & .modal-croppa-btns {
          display: flex;
          flex-flow: column;
          width: 100%
        }
      }
    }
    & .__input-btn {
      margin: 1rem 7%;
      font-size: 16px;
      background: #49A5FC;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .__croppa-btn {
      margin: .3rem 0;
      font-size: 16px;
      background: #49A5FC;
      color: white;
      padding: .8rem 1.2rem;
      border-radius: 2rem;
    }
    & .after-choose-image {
      margin-top: 1.5rem;
      padding: 0 calc(7% - .3rem);
      display: flex;
      flex-flow: row wrap;
      & .__preview-img {
        margin: 0 .3rem;
        width: 145px;
        height: 97px;
        border-radius: 4px;
      }
    }
    & .signin-btns {
      display: flex;
      padding: 0 7%;
    }
    & .back-next {
      position: fixed;
      z-index: 3;
      bottom: 1rem;
      left: 0;
      right: 0;
      margin: auto;
      height: 3rem;
      width: 86%;
      background: white;
      box-shadow: 2px 2px 6px 1px rgba(0,0,0,0.1);
      border-radius: 2rem;
      & .back-next-body {
        display: flex;
        align-items: center;
        & button {
          width: 50%;
          height: 3rem;
        }
        & .__back {
          border-radius: 2rem 0 0 2rem;
          cursor: pointer;
          background: white;
        }
        & .__next {
          border-radius: 0 2rem 2rem 0;
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
