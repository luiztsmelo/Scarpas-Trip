<template>
  <div class="home">

    <div class="home-body">




      <Roteiro/>




      <!-- ______________________________ ACOMODAÇÕES ______________________________ -->
      <div class="category-container">


        <h1 class="__title">Acomodações</h1>
        

        <div class="cards-container" v-show="$store.state.acomods !== null">

          <nuxt-link :to="`/acomodacoes/${acomod.acomodID}`" class="card" v-for="acomod in $store.state.acomods" :key="acomod.acomodID">

            <progressive-background class="__card-img" :src="imageAcH(acomod)" :placeholder="acomod.images[0].L" :aspect-ratio="2/3"/>

            <p class="__card-info" style="color: #FFA04F">{{ acomod.tipoAcomod }}</p>

            <p class="__card-title">{{ acomod.title }}</p>

            <p class="__card-subtitle">R${{ acomod.valorNoite.toLocaleString() }}<span class="__card-valor-noite"> por noite</span></p>

            <div class="rating" v-if="acomod.avaliacoes.length > 0">
              <star-rating
                :rating="acomod.averageRating"
                :increment="0.5"
                :read-only="true"
                :show-rating="false"
                active-color="#161616"
                inactive-color="#dedede"
                :star-size="10"
                :padding="2">
              </star-rating>
              <p class="rating-count">{{ acomod.avaliacoes.length }}</p>
            </div>

            <div class="new" v-else><p>NOVA</p></div>
            
          </nuxt-link>

        </div>


      </div><!-- ______________________________ ACOMODAÇÕES ______________________________ -->






      <!-- ______________________________ PASSEIOS ______________________________ -->
      <div class="category-container">


        <h1 class="__title">Passeios</h1>

        

        <div class="cards-container" v-show="$store.state.passeios !== null">
          <nuxt-link :to="'/passeios/' + passeio.passeioID" class="card" v-for="passeio in $store.state.passeios" :key="passeio.passeioID">

            <progressive-background class="__card-img" :src="imagePasH(passeio)" :placeholder="passeio.images[0].L" :aspect-ratio="2/3"/>

            <p class="__card-info" style="color: #0784FD">{{ passeio.tipoPasseio }}</p>

            <p class="__card-title">{{ passeio.title }}</p>

            <p class="__card-subtitle">R${{ passeio.rotas[0].valor.toLocaleString() }}<span class="__card-valor-noite"> por pessoa</span></p>
            
            <div class="rating" v-if="passeio.avaliacoes.length > 0">
              <star-rating
                :rating="passeio.averageRating"
                :increment="0.5"
                :read-only="true"
                :show-rating="false"
                active-color="#161616"
                inactive-color="#dedede"
                :star-size="10"
                :padding="2">
              </star-rating>
              <p class="rating-count">{{ passeio.avaliacoes.length }}</p>
            </div>

            <div class="new" v-else><p>NOVO</p></div>

          </nuxt-link> 
        </div>


      </div><!-- ______________________________ PASSEIOS ______________________________ -->







      <!-- ______________________________ EVENTOS ______________________________ -->
      <div class="category-container">


        <h1 class="__title">Eventos</h1>
        

        <h3 class="__subtitle">Em breve.</h3>


      </div><!-- ______________________________ EVENTOS ______________________________ -->






      <!-- ______________________________ ATRAÇÕES ______________________________ -->
      <div class="category-container">


        <h1 class="__title">Atrações</h1>
        

        <h3 class="__subtitle">Em breve.</h3>


      </div><!-- ______________________________ ATRAÇÕES ______________________________ -->






      <!-- ______________________________ RESTAURANTES ______________________________ -->
      <div class="category-container">


        <h1 class="__title">Restaurantes</h1>
        

        <h3 class="__subtitle">Em breve.</h3>


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
  transition: 'opacity',
  methods: {
    imageAcH (acomod) {
      return supportsWebP ? acomod.images[0].HW : acomod.images[0].HJ
    },
    imagePasH (passeio) {
      return supportsWebP ? passeio.images[0].HW : passeio.images[0].HJ
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
        font-size: 23px;
        font-weight: 700;
      }
      & .__subtitle {
        padding: 0 7%;
      }
      & .cards-container {
        padding: 0 7%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 14px;
        & .card {
          & .__card-img {
            width: 100%; 
            height: auto;
            border-radius: 5px;
            margin-bottom: .2rem;
          }
          & .__card-info {
            padding-top: .3rem;
            text-transform: uppercase;
            font-size: 11px;
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
              font-weight: 500;
            }
          }
          & .rating {
            padding-top: .1rem;
            display: flex;
            align-items: center;
            & .rating-count {
              font-size: 12px;
              font-weight: 600;
              padding-left: 2px;
            }
          }
          & .new {
            margin-top: .3rem;
            display: inline-flex;
            border: 1px solid #dedede;
            border-radius: 50px;
            & p {
              padding: 3px 8px;
              font-size: 11px;
              font-weight: 600;
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
          font-size: 29px;
          font-weight: 700;
        }
        & .__subtitle {
        }
        & .cards-container {
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 20px;
          & .card {
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
              & .__card-valor-noite {
                font-size: 15px;
              }
            }
            & .rating {
              padding-top: .2rem;
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
