<template>
  <div class="home">

    <div class="home-body">




      <Roteiro/>




      <!-- ______________________________ ACOMODAÇÕES ______________________________ -->
      <div class="category-container">


        <h2 class="__title">Acomodações</h2>
        

        <div class="cards-container" v-show="$store.state.acomods !== null">

          <nuxt-link :to="`/acomodacoes/${acomod.acomodID}`" class="card" v-for="acomod in $store.state.acomods" :key="acomod.acomodID">

            <div class="__card-img" :style="`background-image: url(${imageAcH(acomod)})`"></div>

            <p class="__card-info" style="color: #FFA04F">{{ acomod.tipoAcomod }}</p>

            <h3 class="__card-title">{{ acomod.title }}</h3>

            <p class="__card-subtitle">R${{ acomod.valorNoiteWeekdays.toLocaleString() }} por noite</p>

            <div class="rating" v-if="acomod.avaliacoes.length > 0">
              <star-rating
                :rating="acomod.averageRating"
                :increment="0.5"
                :read-only="true"
                :show-rating="false"
                active-color="#343434"
                inactive-color="#dedede"
                :star-size="10"
                :padding="2">
              </star-rating>
              <span class="rating-count">{{ acomod.avaliacoes.length }}</span>
            </div>

            <div class="new" v-else><span>NOVA</span></div>
            
          </nuxt-link>

        </div>


      </div><!-- ______________________________ ACOMODAÇÕES ______________________________ -->






      <!-- ______________________________ PASSEIOS ______________________________ -->
      <div class="category-container">


        <h2 class="__title">Passeios</h2>

        

        <div class="cards-container" v-show="$store.state.passeios !== null">
          <nuxt-link :to="'/passeios/' + passeio.passeioID" class="card" v-for="passeio in $store.state.passeios" :key="passeio.passeioID">
            
            <div class="__card-img" :style="`background-image: url(${imagePasH(passeio)})`"></div>

            <p class="__card-info" style="color: #0784FD">{{ passeio.tipoPasseio }}</p>

            <h3 class="__card-title">{{ passeio.title }}</h3>

            <p class="__card-subtitle">R${{ passeio.rotas[0].valor.toLocaleString() }} por pessoa</p>
            
            <div class="rating" v-if="passeio.avaliacoes.length > 0">
              <star-rating
                :rating="passeio.averageRating"
                :increment="0.5"
                :read-only="true"
                :show-rating="false"
                active-color="#343434"
                inactive-color="#dedede"
                :star-size="10"
                :padding="2">
              </star-rating>
              <span class="rating-count">{{ passeio.avaliacoes.length }}</span>
            </div>

            <div class="new" v-else><span>NOVO</span></div>

          </nuxt-link> 
        </div>


      </div><!-- ______________________________ PASSEIOS ______________________________ -->







      <!-- ______________________________ EVENTOS ______________________________ -->
      <div class="category-container">


        <h2 class="__title">Eventos</h2>
        

        <div class="cards-container" v-show="$store.state.eventos !== null">
          <nuxt-link :to="'/eventos/' + evento.eventoID" class="card" v-for="evento in $store.state.eventos" :key="evento.eventoID">

            <div class="__card-img" :style="`background-image: url(${imageEvH(evento)})`"></div>

            <p class="__card-info" style="color: #FF7E65">{{ eventoDate(evento) }}</p>

            <h3 class="__card-title">{{ evento.title }}</h3>

            <p class="__card-subtitle">R${{ evento.valorIngresso }} por pessoa</p>

          </nuxt-link> 
        </div>


      </div><!-- ______________________________ EVENTOS ______________________________ -->








      <!-- ______________________________ RESTAURANTES ______________________________ -->
      <div class="category-container">


        <h2 class="__title">Restaurantes</h2>
        

        <p class="__subtitle">Em breve.</p>


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
import format from 'date-fns/format'
import pt from 'date-fns/locale/pt'

export default {
  components: { Roteiro, Footer },
  transition: 'opacity',
  methods: {
    imageAcH (acomod) {
      return supportsWebP ? acomod.images[0].HW : acomod.images[0].HJ
    },
    imagePasH (passeio) {
      return supportsWebP ? passeio.images[0].HW : passeio.images[0].HJ
    },
    imageEvH (evento) {
      return supportsWebP ? evento.flyerHW : evento.flyerHJ
    },
    eventoDate (evento) {
      const dateFormatted = format(evento.dates[0].date, 'DD/MM/YYYY')
      return `${dateFormatted} ⋅ ${evento.dates[0].startTime}`
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.state.foobar1 = false
      vm.$store.state.foobar2 = false
      vm.$store.state.foobar3 = false
      vm.$store.state.foobar4 = false
      vm.$store.state.concludedNewAcomod = false
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
      & .__title {
        padding: 0 7% 1rem 7%;
        font-size: 25px;
        font-weight: 700;
      }
      & .__subtitle {
        padding: 0 7%;
      }
      & .cards-container {
        padding: 0 7%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 13px;
        & .card {
          & .__card-img {
            background-color: #dedede;
            background-size: cover;
            background-position: center; 
            background-repeat: no-repeat;
            width: 100%;
            height: 0;
            padding-top: calc(2/3 * 100%);
            border-radius: 5px;
            margin-bottom: .2rem;
          }
          /* & .__card-img {
            width: 100%; 
            height: auto;
            border-radius: 5px;
            margin-bottom: .2rem;
          } */
          & .__card-info {
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 700;
          }
          & .__card-title {
            font-size: 15px;
            font-weight: 700;
            line-height: 19px;
          }
          & .__card-subtitle {
            font-size: 14px;
            font-weight: 400;
          }
          & .rating {
            display: flex;
            align-items: center;
            & .rating-count {
              font-size: 12px;
              font-weight: 500;
              padding-left: 3px;
            }
          }
          & .new {
            margin-top: .15rem;
            display: inline-flex;
            border: 1px solid #dedede;
            border-radius: 50px;
            & span {
              padding: 3px 8px;
              font-size: 11px;
              font-weight: 500;
            }
          }
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
        padding-bottom: 4.5rem;
        & .__title {
          padding: 0 7% 1.5rem 7%;
          font-size: 31px;
          font-weight: 700;
        }
        & .__subtitle {
        }
        & .cards-container {
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 22px;
          & .card {
            & .__card-img {
            }
            & .__card-info {
            }
            & .__card-title {;
              font-size: 17px;
              line-height: 1.3;
            }
            & .__card-subtitle {
              font-size: 15px;
            }
            & .rating {
              & .rating-count {
              }
            }
          }
        }
      }
    }
  }
}
</style>
