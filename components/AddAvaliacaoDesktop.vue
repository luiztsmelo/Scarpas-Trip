<template>
  <modal
    name="add-avaliacao-desktop"
    class="add-avaliacao-desktop"
    width="45%"
    height="94%">


    <div class="body">

      <img src="../assets/img/close-modal.svg" style="cursor:pointer;position:absolute;top:1rem;right:1rem;width:1rem;height:auto" @click="$modal.hide('add-avaliacao-desktop')">



      <h1 class="title">{{ title }}</h1>



      <!-- ____________________ RATINGS ____________________ -->
      <div class="ratings-input" v-if="$store.state.avaliacaoAcomodEtapa1">
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
            :star-size="25"
            :padding="5">
          </star-rating>
        </div>
      </div><!-- ____________________ RATINGS ____________________ -->




      <!-- ____________________ COMMENT ____________________ -->
      <div class="comment-input" v-if="$store.state.avaliacaoAcomodEtapa2">


      </div><!-- ____________________ COMMENT ____________________ -->




      <button type="button" @click="btnClick">{{ $store.state.avaliacaoAcomodEtapa1 ? 'Próximo' : 'Publicar avaliação' }}</button>



    </div>
    

  </modal>  
</template>

<script>
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
      ]
    }
  },
  methods: {
    btnClick () {
      if (this.$store.state.avaliacaoAcomodEtapa1) {
        if (this.categoriesAcomod[0].rating !== 0 && this.categoriesAcomod[1].rating !== 0 && this.categoriesAcomod[2].rating !== 0 && this.categoriesAcomod[3].rating !== 0) {
          this.$store.state.avaliacaoAcomod.ratings.recepcao = this.categoriesAcomod[0].rating
          this.$store.state.avaliacaoAcomod.ratings.limpeza = this.categoriesAcomod[1].rating
          this.$store.state.avaliacaoAcomod.ratings.precisao = this.categoriesAcomod[2].rating
          this.$store.state.avaliacaoAcomod.ratings.valor = this.categoriesAcomod[3].rating
          this.$store.commit('m_avaliacaoAcomodEtapa1', false)
          this.$store.commit('m_avaliacaoAcomodEtapa2', true)
        }
      } else {
        alert('else')
      }
    }
  },
  computed: {
    title () {
      if (this.$route.name === 'acomodacoes-id') {
        if (this.$store.state.avaliacaoAcomodEtapa1) {
          return `Como você avalia sua estadia ${this.tipoAcomodN} de ${this.$store.state.host.firstName}?`
        } else {
          return `Deixe seu comentário`
        }
      }
      if (this.$route.name === 'passeio-id') {
        if (this.$store.state.avaliacaoPasseioEtapa1) {
          return `Como você avalia esse passeio?`
        } else {
          return `Deixe seu comentário`
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
      line-height: 1.35;
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
            font-size: 18px;
            font-weight: 600;
            padding-bottom: 4px;
          }
          & .__desc {
            font-size: 15px;
            font-weight: 400;
          }
        }
        & rating {

        }
      }
    }
    & .comment-input {
      
    }
    & button {
      align-self: center;
      padding: 0 2rem;
      background: var(--colorAcomod);
      color: white;
      font-size: 16px;
      font-weight: 600;
      border-radius: 200px;
      height: 3rem;
    }
  }
}

</style>