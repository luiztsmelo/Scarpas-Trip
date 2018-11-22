<template>
  <modal
    name="add-avaliacao-desktop"
    class="add-avaliacao-desktop"
    width="45%"
    height="94%">


    <div class="body">


      <img src="../assets/img/close-modal.svg" style="cursor:pointer;position:absolute;top:1rem;right:1rem;width:1rem;height:auto" @click="$modal.hide('add-avaliacao-desktop')" v-if="$route.name === 'acomodacoes-id' ? $store.state.avaliacaoAcomodEtapa1 || $store.state.avaliacaoAcomodEtapa2 : $store.state.avaliacaoPasseioEtapa1 || $store.state.avaliacaoPasseioEtapa2">




      <h1 class="title" v-if="$route.name === 'acomodacoes-id' ? $store.state.avaliacaoAcomodEtapa1 || $store.state.avaliacaoAcomodEtapa2 : $store.state.avaliacaoPasseioEtapa1 || $store.state.avaliacaoPasseioEtapa2">{{ title }}</h1>




      <!-- ____________________ RATINGS ACOMOD ____________________ -->
      <div class="ratings-input" v-if="$store.state.avaliacaoAcomodEtapa1 && $route.name === 'acomodacoes-id'">
        <div class="category" v-for="(category, index) in categoriesAcomod" :key="index">
          <div class="description">
            <h2 class="__name">{{ category.name }}</h2>
            <h3 class="__desc">{{ category.desc }}</h3>
          </div>
          <star-rating
            class="rating"
            v-model="category.rating"
            :increment="0.5"
            :show-rating="false"
            active-color="#161616"
            inactive-color="#dedede"
            :star-size="24"
            :padding="5">
          </star-rating>
        </div>
      </div><!-- ____________________ RATINGS ACOMOD ____________________ -->




      <!-- ____________________ RATINGS PASSEIO ____________________ -->
      <div class="ratings-input" v-if="$store.state.avaliacaoPasseioEtapa1 && $route.name === 'passeios-id'">
        <div class="category" v-for="(category, index) in categoriesPasseio" :key="index">
          <div class="description">
            <h2 class="__name">{{ category.name }}</h2>
            <h3 class="__desc">{{ category.desc }}</h3>
          </div>
          <star-rating
            class="rating"
            v-model="category.rating"
            :increment="0.5"
            :show-rating="false"
            active-color="#161616"
            inactive-color="#dedede"
            :star-size="24"
            :padding="5">
          </star-rating>
        </div>
      </div><!-- ____________________ RATINGS PASSEIO ____________________ -->





      <!-- ____________________ COMMENT ACOMOD ____________________ -->
      <div class="comment-input" v-if="$store.state.avaliacaoAcomodEtapa2 && $route.name === 'acomodacoes-id'">

        <input
          type="text" 
          placeholder="Seu nome"
          pattern="[A-Za-z]"
          v-model="$store.state.avaliacaoAcomod.fullName">

        <textarea 
          rows="15" 
          maxlength="700" 
          placeholder="Seu comentário"
          v-model="$store.state.avaliacaoAcomod.comment">
        </textarea>

      </div><!-- ____________________ COMMENT ACOMOD ____________________ -->




      <!-- ____________________ COMMENT PASSEIO ____________________ -->
      <div class="comment-input" v-if="$store.state.avaliacaoPasseioEtapa2 && $route.name === 'passeios-id'">

        <input
          type="text" 
          placeholder="Seu nome"
          pattern="[A-Za-z]"
          v-model="$store.state.avaliacaoPasseio.fullName">

        <textarea 
          rows="15" 
          maxlength="700" 
          placeholder="Seu comentário"
          v-model="$store.state.avaliacaoPasseio.comment">
        </textarea>

      </div><!-- ____________________ COMMENT PASSEIO ____________________ -->





      <!-- ____________________ AFTER ____________________ -->
      <div class="after" v-if="$route.name === 'acomodacoes-id' ? !$store.state.avaliacaoAcomodEtapa1 && !$store.state.avaliacaoAcomodEtapa2 : !$store.state.avaliacaoPasseioEtapa1 && !$store.state.avaliacaoPasseioEtapa2">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div><!-- ____________________ AFTER ____________________ -->





      <button 
        type="button" 
        :style="btnStyle" 
        @click="btnClick" 
        v-if="$route.name === 'acomodacoes-id' ? $store.state.avaliacaoAcomodEtapa1 || $store.state.avaliacaoAcomodEtapa2 : $store.state.avaliacaoPasseioEtapa1 || $store.state.avaliacaoPasseioEtapa2">
        {{ $store.state.avaliacaoAcomodEtapa1 || $store.state.avaliacaoPasseioEtapa1 ? 'Próximo' : 'Publicar avaliação' }}
      </button>




    </div>
    

  </modal>  
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import { tipoAcomod } from '@/mixins/tipoAcomod'

export default {
  mixins: [ tipoAcomod ],
  data () {
    return {
      categoriesAcomod: [
        { name: 'Recepção', desc: 'Quão boa foi a sua recepção?', rating: 0 },
        { name: 'Limpeza', desc: 'Quão limpa estava?', rating: 0 },
        { name: 'Precisão do anúncio', desc: 'Quão preciso está o anúncio?', rating: 0 },
        { name: 'Valor', desc: 'O valor correspondeu às suas expectativas?', rating: 0 }
      ],
      categoriesPasseio: [
        { name: 'Habilidade do Guia', desc: 'Quão bem o guia conduziu o passeio?', rating: 0 },
        { name: 'Segurança', desc: 'Quão seguro você se sentiu?', rating: 0 },
        { name: 'Precisão do anúncio', desc: 'Quão preciso está o anúncio?', rating: 0 },
        { name: 'Valor', desc: 'O valor correspondeu às suas expectativas?', rating: 0 }
      ]
    }
  },
  methods: {
    async btnClick () {
      try {

        if (this.$route.name === 'acomodacoes-id') {

          /* _______________ ETAPA 1 _______________ */
          if (this.$store.state.avaliacaoAcomodEtapa1) {

            if (this.categoriesAcomod[0].rating !== 0 && this.categoriesAcomod[1].rating !== 0 && this.categoriesAcomod[2].rating !== 0 && this.categoriesAcomod[3].rating !== 0) {
              this.$store.state.avaliacaoAcomod.ratings.recepcao = this.categoriesAcomod[0].rating
              this.$store.state.avaliacaoAcomod.ratings.limpeza = this.categoriesAcomod[1].rating
              this.$store.state.avaliacaoAcomod.ratings.precisao = this.categoriesAcomod[2].rating
              this.$store.state.avaliacaoAcomod.ratings.valor = this.categoriesAcomod[3].rating
              this.$store.commit('m_avaliacaoAcomodEtapa1', false)
              this.$store.commit('m_avaliacaoAcomodEtapa2', true)
            }

          } else { /* _______________ ETAPA 2 _______________ */  

            if (this.$store.state.avaliacaoAcomod.fullName !== '' && this.$store.state.avaliacaoAcomod.comment !== '') {

              this.$store.state.avaliacaoAcomod.createdAt = Date.now()

              /* Set new avaliacao */
              await firebase.firestore().doc(`acomods/${this.acomod.acomodID}`).update({
                avaliacoes: firebase.firestore.FieldValue.arrayUnion(this.$store.state.avaliacaoAcomod)
              })

              const avaliacaoAcomodClone = JSON.parse(JSON.stringify(this.$store.state.avaliacaoAcomod))
              this.acomod.avaliacoes.push(avaliacaoAcomodClone)

              /* Calc & set averages */
              let ratings = []
              let recepcaoRatings = []
              let limpezaRatings = []
              let precisaoRatings = []
              let valorRatings = []

              this.acomod.avaliacoes.forEach(avaliacao => {
                ratings.push(avaliacao.ratings.recepcao)
                ratings.push(avaliacao.ratings.limpeza)
                ratings.push(avaliacao.ratings.precisao)
                ratings.push(avaliacao.ratings.valor)
                recepcaoRatings.push(avaliacao.ratings.recepcao)
                limpezaRatings.push(avaliacao.ratings.limpeza)
                precisaoRatings.push(avaliacao.ratings.precisao)
                valorRatings.push(avaliacao.ratings.valor)
              })

              const averageRating = ratings.reduce((sum, a) => { return sum + a }, 0) / (ratings.length || 1)
              const averageRating_recepcao = recepcaoRatings.reduce((sum, a) => { return sum + a }, 0) / (recepcaoRatings.length || 1)
              const averageRating_limpeza = limpezaRatings.reduce((sum, a) => { return sum + a }, 0) / (limpezaRatings.length || 1)
              const averageRating_precisao = precisaoRatings.reduce((sum, a) => { return sum + a }, 0) / (precisaoRatings.length || 1)
              const averageRating_valor = valorRatings.reduce((sum, a) => { return sum + a }, 0) / (valorRatings.length || 1)

              await firebase.firestore().doc(`acomods/${this.acomod.acomodID}`).update({
                averageRating: averageRating,
                averageRating_recepcao: averageRating_recepcao,
                averageRating_limpeza: averageRating_limpeza,
                averageRating_precisao: averageRating_precisao,
                averageRating_valor: averageRating_valor
              })

              this.acomod.averageRating = averageRating
              this.acomod.averageRating_recepcao = averageRating_recepcao
              this.acomod.averageRating_limpeza = averageRating_limpeza
              this.acomod.averageRating_precisao = averageRating_precisao
              this.acomod.averageRating_valor = averageRating_valor

              this.$store.commit('m_avaliacaoAcomodEtapa2', false)

              await new Promise(resolve => setTimeout(resolve, 1800))

              this.$modal.hide('add-avaliacao-desktop')

              this.$store.commit('m_resetAvaliacaoAcomod')

              this.categoriesAcomod[0].rating = 0
              this.categoriesAcomod[1].rating = 0
              this.categoriesAcomod[2].rating = 0
              this.categoriesAcomod[3].rating = 0
            }

          }
        }


        if (this.$route.name === 'passeios-id') {

          /* _______________ ETAPA 1 _______________ */
          if (this.$store.state.avaliacaoPasseioEtapa1) {

            if (this.categoriesPasseio[0].rating !== 0 && this.categoriesPasseio[1].rating !== 0 && this.categoriesPasseio[2].rating !== 0 && this.categoriesPasseio[3].rating !== 0) {
              this.$store.state.avaliacaoPasseio.ratings.habilidade = this.categoriesPasseio[0].rating
              this.$store.state.avaliacaoPasseio.ratings.seguranca = this.categoriesPasseio[1].rating
              this.$store.state.avaliacaoPasseio.ratings.precisao = this.categoriesPasseio[2].rating
              this.$store.state.avaliacaoPasseio.ratings.valor = this.categoriesPasseio[3].rating
              this.$store.commit('m_avaliacaoPasseioEtapa1', false)
              this.$store.commit('m_avaliacaoPasseioEtapa2', true)
            }

          } else { /* _______________ ETAPA 2 _______________ */  

            if (this.$store.state.avaliacaoPasseio.fullName !== '' && this.$store.state.avaliacaoPasseio.comment !== '') {

              this.$store.state.avaliacaoPasseio.createdAt = Date.now()

              /* Set new avaliacao */
              await firebase.firestore().doc(`passeios/${this.passeio.passeioID}`).update({
                avaliacoes: firebase.firestore.FieldValue.arrayUnion(this.$store.state.avaliacaoPasseio)
              })

              const avaliacaoPasseioClone = JSON.parse(JSON.stringify(this.$store.state.avaliacaoPasseio))
              this.passeio.avaliacoes.push(avaliacaoPasseioClone)

              /* Calc & set averages */
              let ratings = []
              let habilidadeRatings = []
              let segurancaRatings = []
              let precisaoRatings = []
              let valorRatings = []

              this.passeio.avaliacoes.forEach(avaliacao => {
                ratings.push(avaliacao.ratings.habilidade)
                ratings.push(avaliacao.ratings.seguranca)
                ratings.push(avaliacao.ratings.precisao)
                ratings.push(avaliacao.ratings.valor)
                habilidadeRatings.push(avaliacao.ratings.habilidade)
                segurancaRatings.push(avaliacao.ratings.seguranca)
                precisaoRatings.push(avaliacao.ratings.precisao)
                valorRatings.push(avaliacao.ratings.valor)
              })

              const averageRating = ratings.reduce((sum, a) => { return sum + a }, 0) / (ratings.length || 1)
              const averageRating_habilidade = habilidadeRatings.reduce((sum, a) => { return sum + a }, 0) / (habilidadeRatings.length || 1)
              const averageRating_seguranca = segurancaRatings.reduce((sum, a) => { return sum + a }, 0) / (segurancaRatings.length || 1)
              const averageRating_precisao = precisaoRatings.reduce((sum, a) => { return sum + a }, 0) / (precisaoRatings.length || 1)
              const averageRating_valor = valorRatings.reduce((sum, a) => { return sum + a }, 0) / (valorRatings.length || 1)

              await firebase.firestore().doc(`passeios/${this.passeio.passeioID}`).update({
                averageRating: averageRating,
                averageRating_habilidade: averageRating_habilidade,
                averageRating_seguranca: averageRating_seguranca,
                averageRating_precisao: averageRating_precisao,
                averageRating_valor: averageRating_valor
              })

              this.passeio.averageRating = averageRating
              this.passeio.averageRating_habilidade = averageRating_habilidade
              this.passeio.averageRating_seguranca = averageRating_seguranca
              this.passeio.averageRating_precisao = averageRating_precisao
              this.passeio.averageRating_valor = averageRating_valor

              this.$store.commit('m_avaliacaoPasseioEtapa2', false)

              await new Promise(resolve => setTimeout(resolve, 1800))

              this.$modal.hide('add-avaliacao-desktop')

              this.$store.commit('m_resetAvaliacaoPasseio')

              this.categoriesPasseio[0].rating = 0
              this.categoriesPasseio[1].rating = 0
              this.categoriesPasseio[2].rating = 0
              this.categoriesPasseio[3].rating = 0
            }

          }
        }

      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    acomod () { return this.$store.state.acomod },
    passeio () { return this.$store.state.passeio },
    title () {
      if (this.$route.name === 'acomodacoes-id') {
        if (this.$store.state.avaliacaoAcomodEtapa1) {
          return `Como você avalia sua estadia ${this.tipoAcomodN} de ${this.$store.state.host.firstName}?`
        } else {
          return `Deixe seu comentário`
        }
      }
      if (this.$route.name === 'passeios-id') {
        if (this.$store.state.avaliacaoPasseioEtapa1) {
          return `Como você avalia esse passeio?`
        } else {
          return `Deixe seu comentário`
        }
      }
    },
    btnStyle () {
      if (this.$route.name === 'acomodacoes-id') {
        if (this.$store.state.avaliacaoAcomodEtapa1) {
          if (this.categoriesAcomod[0].rating !== 0 && this.categoriesAcomod[1].rating !== 0 && this.categoriesAcomod[2].rating !== 0 && this.categoriesAcomod[3].rating !== 0) {
            return 'background: #FFA04F'
          }
        } else {
          if (this.$store.state.avaliacaoAcomod.fullName !== '' && this.$store.state.avaliacaoAcomod.comment !== '') {
            return 'background: #FFA04F'
          }
        }
      }
      if (this.$route.name === 'passeios-id') {
        if (this.$store.state.avaliacaoPasseioEtapa1) {
          if (this.categoriesPasseio[0].rating !== 0 && this.categoriesPasseio[1].rating !== 0 && this.categoriesPasseio[2].rating !== 0 && this.categoriesPasseio[3].rating !== 0) {
            return 'background: #198CFE'
          }
        } else {
          if (this.$store.state.avaliacaoPasseio.fullName !== '' && this.$store.state.avaliacaoPasseio.comment !== '') {
            return 'background: #198CFE'
          }
        }
      }
    }
  }
}
</script>

<style scoped>

.add-avaliacao-desktop {
  & .body {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
    padding: 2.6rem 3rem;
    & .title {
      font-size: 33px;
      line-height: 1.3;
    }
    & .ratings-input {
      & .category {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 4.2% 0;
        & .description {
          display: flex;
          flex-flow: column;
          margin-right: 1rem;
          & .__name {
            font-size: 17px;
            font-weight: 600;
            padding-bottom: 4px;
          }
          & .__desc {
            font-size: 14px;
            font-weight: 400;
          }
        }
        & rating {
        }
      }
    }
    & .comment-input {
      & input {
        cursor: text;
        width: 100%;
        font-size: 21px;
        font-weight: 600;
        background: white;
        color: var(--color01);
        padding: 1.8rem 0;
        border: none;
        outline: none;
      }
      & textarea {
        border: none;
        outline: none;
        resize: none;
        font-size: 17px;
        width: 100%;
      }
    }
    & .after {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    & button {
      align-self: center;
      padding: 0 2.3rem;
      background: #dedede;
      color: white;
      font-size: 16px;
      font-weight: 600;
      border-radius: 200px;
      height: 2.9rem;
      transition: var(--main-transition);
    }
  }
}

/* CHECKMARK */
.checkmark__circle {
  stroke-dasharray: 332;
  stroke-dashoffset: 332;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: var(--colorAcomod);
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.checkmark {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px var(--colorAcomod);
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}
.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 96;
  stroke-dashoffset: 96;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.2, 1.2, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 60px var(--colorAcomod);
  }
}

</style>