<template>
  <div class="home">

    <div class="home-body">




      <Roteiro/>




      <!-- ______________________________ ACOMODAÇÕES ______________________________ -->
      <div class="category-container">


        <div class="title-row">

          <h1 class="__title">Acomodações</h1>

          <nuxt-link to="/acomodacoes" class="see-all" style="color: #FFA04F">Ver mais ❯</nuxt-link> 

        </div>
        

        <div class="cards-container" v-show="$store.state.acomods !== null">

          <nuxt-link :to="`/acomodacoes/${acomod.acomodID}`" class="card" v-for="acomod in $store.state.acomods" :key="acomod.acomodID">

            <progressive-background class="__card-img" :src="imageAcH(acomod)" :placeholder="acomod.images[0].L" :aspect-ratio="2/3"/>

            <p class="__card-info" style="color: #FFA04F">{{ acomod.tipoAcomod }}</p>

            <p class="__card-title">{{ acomod.title }}</p>

            <p class="__card-subtitle">R${{ acomod.valorNoite.toLocaleString() }}<span class="__card-valor-noite"> por noite</span></p>

            <div class="rating">
              <star-rating
                :rating="4.2"
                :increment="0.1"
                :read-only="true"
                :show-rating="false"
                active-color="#161616"
                inactive-color="#dedede"
                :star-size="10"
                :padding="2">
              </star-rating>
              <p class="rating-number">4,2</p>
            </div>
            
          </nuxt-link>

        </div>


      </div><!-- ______________________________ ACOMODAÇÕES ______________________________ -->






      <!-- ______________________________ PASSEIOS ______________________________ -->
      <div class="category-container">


        <div class="title-row">

          <h1 class="__title">Passeios</h1>

          <nuxt-link to="/passeios" class="see-all" style="color: #198CFE">Ver mais ❯</nuxt-link> 

        </div>
        

        <div class="cards-container" v-show="$store.state.passeios !== null">
          <nuxt-link :to="'/passeios/' + passeio.passeioID" class="card" v-for="passeio in $store.state.passeios" :key="passeio.passeioID">

            <progressive-background class="__card-img" :src="imagePasH(passeio)" :placeholder="passeio.images[0].L" :aspect-ratio="2/3"/>

            <p class="__card-info" style="color: #0784FD">{{ passeio.tipoPasseio }}</p>

            <p class="__card-title">{{ passeio.title }}</p>

            <p class="__card-subtitle">R${{ passeio.valorPasseio.toLocaleString() }}<span class="__card-valor-noite"> por pessoa</span></p>
            
            <div class="rating">
              <star-rating
                :rating="4.6"
                :increment="0.1"
                :read-only="true"
                :show-rating="false"
                active-color="#161616"
                inactive-color="#dedede"
                :star-size="10"
                :padding="2">
              </star-rating>
              <p class="rating-number">4,6</p>
            </div>

          </nuxt-link> 
        </div>


      </div><!-- ______________________________ PASSEIOS ______________________________ -->






      <!-- ______________________________ EVENTOS ______________________________ -->
      <div class="category-container">


        <div class="title-row">

          <h1 class="__title">Próximos Eventos</h1>

          <nuxt-link to="/eventos" class="see-all" style="color: #FF7E65">Ver mais ❯</nuxt-link> 

        </div>
        

        <div class="cards-container" v-show="$store.state.eventos !== null">
          <nuxt-link :to="'/eventos/' + evento.eventoID" class="card" v-for="evento in $store.state.eventos" :key="evento.eventoID">

            <progressive-background class="__card-img" :src="imageEvH(evento)" :placeholder="evento.imageL1" :aspect-ratio="2/3"/>

            <p class="__card-info" style="color: #FF7D6C">{{ evento.date }}&#160;&#8231;&#160;{{ evento.hour }}</p>

            <p class="__card-title">{{ evento.title }}</p>

            <p class="__card-subtitle">{{ evento.subtitle }}</p>

          </nuxt-link> 
        </div>


      </div><!-- ______________________________ EVENTOS ______________________________ -->






      <!-- ______________________________ ATRAÇÕES ______________________________ -->
      <div class="category-container">


        <div class="title-row">

          <h1 class="__title">Atrações</h1>

          <nuxt-link to="/atracoes" class="see-all" style="color: #81C784">Ver mais ❯</nuxt-link> 

        </div>
        

        <div class="cards-container" v-show="$store.state.atracoes !== null">
          <nuxt-link :to="'/atracoes/' + atracao.atracaoID" class="card" v-for="atracao in $store.state.atracoes" :key="atracao.atracaoID">

            <progressive-background class="__card-img" :src="imageAtH(atracao)" :placeholder="atracao.imageL1" :aspect-ratio="2/3"/>

            <p class="__card-info" style="color: #81C784">{{ atracao.tipoAtracao }}</p>

            <p class="__card-title">{{ atracao.title }}</p>

          </nuxt-link> 
        </div>


      </div><!-- ______________________________ ATRAÇÕES ______________________________ -->





      <!-- ______________________________ RESTAURANTES ______________________________ -->
      <div class="category-container">


        <div class="title-row">

          <h1 class="__title">Restaurantes</h1>

          <nuxt-link to="/restaurantes" class="see-all" style="color: #fc5656">Ver mais ❯</nuxt-link> 

        </div>
        

        <h3 class="__subtitle">Em breve os melhores restaurantes de Capitólio.</h3>


      </div><!-- ______________________________ RESTAURANTES ______________________________ -->





      <Footer/>

    </div>
  </div>
</template>

<script>
import firebase from '@firebase/app'
import 'firebase/firestore'
import supportsWebP from 'supports-webp'
import Roteiro from '~/components/Roteiro'
import Footer from '~/components/Footer'

export default {
  components: { Roteiro, Footer },
  head () {
    return {
      meta: [
        { hid: 'description', name: 'description', content: 'Planeje sua viagem para Capitólio de forma simples, agradável e segura.' }
      ]
    }
  },
  transition: 'opacity',
  methods: {
    imageEvH (evento) {
      return supportsWebP ? evento.imageH1W : evento.imageH1J
    },
    imageAcH (acomod) {
      return supportsWebP ? acomod.images[0].HW : acomod.images[0].HJ
    },
    imagePasH (passeio) {
      return supportsWebP ? passeio.images[0].HW : passeio.images[0].HJ
    },
    imageAtH (atracao) {
      return supportsWebP ? atracao.imageH1W : atracao.imageH1J
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.state.offFoobar1 = true
      vm.$store.state.offFoobar2 = true
      vm.$store.state.offFoobar3 = true
      vm.$store.state.offFoobar4 = true
      vm.$store.state.offFoobar5 = true
      vm.$store.state.concludedNewAcomod = false
      !vm.$store.state.isOnline ? vm.$modal.show('offline-modal') : ''
      !vm.$store.state.showFoobar ? vm.$store.commit('m_showFoobar', true) : ''
      !vm.$store.state.showNavbar ? vm.$store.commit('m_showNavbar', true) : ''
      
      firebase.firestore().collection('acomods').get().then(acomods => {
        vm.$store.commit('m_acomods', acomods.docs.map(acomod => acomod.data()))
      })
      firebase.firestore().collection('passeios').get().then(passeios => {
        vm.$store.commit('m_passeios', passeios.docs.map(passeio => passeio.data()))
      })
      firebase.firestore().collection('eventos').get().then(eventos => {
        vm.$store.commit('m_eventos', eventos.docs.map(evento => evento.data()))
      })
      firebase.firestore().collection('atracoes').get().then(atracoes => {
        vm.$store.commit('m_atracoes', atracoes.docs.map(atracao => atracao.data()))
      })
    })
  }
}
</script>

<style scoped>

.home {
  margin-top: var(--navbarHeightMobile);
  display: flex;
  flex-flow: column;
  transition: var(--pages-transition);
  & .home-body {
    display: flex;
    flex-flow: column;
    margin-bottom: 5.3rem;
    & .category-container {
      padding: 2rem 0;
      display: flex;
      flex-flow: column;
      overflow-x: hidden;
      & .title-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 7% 1.1rem 7%;
        & .__title {
          font-size: 23px;
          font-weight: 700;
        }
        & .see-all {
          display: none;
          font-size: 14px;
          font-weight: 600;
          padding-right: 4px;
        }
        & .see-all:hover {
          text-decoration: underline;
        }
      }
      & .__subtitle {
        padding: 0 7%;
      }
      & .cards-container {
        padding: 0 5.9%;
        display: flex;
        flex-flow: row wrap;
        & .card {
          margin: .6rem 1.3%;
          flex: 0 1 47%;
          & .__card-img {
            width: 100%; 
            height: auto;
            border-radius: 3px;
            margin-bottom: .2rem;
          }
          & .__card-info {
            padding-top: .3rem;
            text-transform: uppercase;
            font-size: 10px;
            font-weight: 600;
            color: #007B77;
          }
          & .__card-title {
            padding: .3rem 0;
            font-size: 14px;
            font-weight: 700;
          }
          & .__card-subtitle {
            font-size: 14px;
            font-weight: 500;
            & .__card-valor-noite {
              font-size: 14px;
              font-weight: 400;
            }
          }
          & .rating {
            padding-top: .1rem;
            display: flex;
            align-items: center;
            & .rating-number {
              font-size: 12px;
              font-weight: 500;
              padding-left: 2px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1023px) {
  .home {
    & .home-body {
      & .category-container {
        & .see-all {
          display: none;
        }
      }
    }
  }
}
@media (min-width: 1024px) {
  .home {
    margin-top: var(--navbarHeightDesktop);
    & .home-body {
      margin-bottom: 0;
      & .category-container {
        padding-bottom: 5rem;
        & .title-row {
          padding: 0 7% 1.2rem 7%;
          & .__title {
            font-size: 29px;
            font-weight: 700;
          }
        }
        & .__subtitle {
        }
        & .cards-container {
          padding: 0 6.5%;
          & .card {
            margin: 1rem .6%;
            flex: 0 1 23.8%;
            & .__card-img {
              margin-bottom: .3rem;
            }
            & .__card-info {
              padding-top: .3rem;
              text-transform: uppercase;
              font-size: 11px;
              font-weight: 600;
            }
            & .__card-title {
              padding: .4rem 0 .3rem 0;
              font-size: 16px;
              font-weight: 700;
              line-height: 1.3;
            }
            & .__card-subtitle {
              font-size: 15px;
              font-weight: 500;
              & .__card-valor-noite {
                font-size: 15px;
                font-weight: 400;
              }
            }
            & .rating {
              padding-top: .2rem;
              & .rating-number {
              }
            }
          }
        }
      }
    }
  }
}
</style>
