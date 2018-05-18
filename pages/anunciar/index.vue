<template>
  <div class="anunciar">

    <h1 class="__title">Ainda gasta com anúncio?</h1>


    <h1 class="__subtitle">Aqui é Gratuito!</h1>

    <img src="../../assets/img/money.svg" class="__money-img"> 


    <h1 class="__subtitle">E se não bastasse, oferecemos:</h1>

    <div class="beneficios">

      <div class="card">
        <img src="../../assets/img/reserva.svg" class="__card-img">
        <h1 class="__card-title">Intermediação Financeira</h1>
        <h3 class="__card-subtitle">Alugue</h3>
      </div>

      <div class="card">
        <img src="../../assets/img/seguranca.svg" class="__card-img">
        <h1 class="__card-title">Segurança</h1>
        <h3 class="__card-subtitle">Anunciando conosco você estará protegido contra eventuais problemas.</h3>
      </div>

      <div class="card">
        <img src="../../assets/img/money2.svg" class="__card-img">
        <h1 class="__card-title">Relatórios Personalizados</h1>
        <h3 class="__card-subtitle">Receba relatórios trimestrais acerca do desempenho de seu anúncio.</h3>
      </div>

    </div>


    <h1 class="__subtitle">Não perca mais tempo! Anuncie:</h1>

    <div class="categorias">

      <nuxt-link to="/anunciar/acomodacao" class="card">
        <img src="../../assets/img/anuncio-acomod2.svg" class="__card-img">
        <h1 class="__card-title">Acomodação</h1>
      </nuxt-link>

      <nuxt-link to="/anunciar/passeio" class="card">
        <img src="../../assets/img/anuncio-passeio.svg" class="__card-img">
        <h1 class="__card-title">Passeio</h1>
      </nuxt-link>

      <!-- <nuxt-link to="/anunciar/evento" class="card">
        <img src="../../assets/img/anuncio-evento.svg" class="__card-img">
        <h1 class="__card-title">Evento</h1>
      </nuxt-link>

      <nuxt-link to="/anunciar/restaurante" class="card">
        <img src="../../assets/img/anuncio-restaurante.svg" class="__card-img">
        <h1 class="__card-title">Restaurante</h1>
      </nuxt-link> -->

    </div>


    <Footer/>


  </div>
</template>

<script>
import Footer from '../../components/Footer'

export default {
  components: {
    Footer
  },
  transition: 'opacity',
}
</script>

<style scoped>
@import url('../../assets/css/main.css');

.anunciar {
  padding-top: 4rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transition: var(--main-transition);
  & .__title {
    padding: 4rem 7% 0;
    font-size: 46px;
    font-weight: 800;
    text-align: center;
  }
  & .__subtitle {
    padding: 1rem 7%;
    font-size: 30px;
    font-weight: 500;
    text-align: center;
  }
  & .__money-img {
    margin: 1rem 0 7rem;
    width: 6.8rem;
    height: auto;
    transform: rotate(-25deg);
  }
  & .beneficios {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 3rem 12% 10rem;
    & .card {
      display: flex;
      flex-flow: column;
      align-items: center;
      width: 27%;
      & .__card-img {
        width: 5.3rem;
        height: auto;
      }
      & .__card-title {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        padding: 1rem 0 .5rem;
      }
      & .__card-subtitle {
        text-align: center;
        line-height: 21px;
        font-size: 17px;
      }
    }
  }
  & .categorias {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 3.5rem 7% 8rem;
    & .card {
      cursor: pointer;
      display: flex;
      flex-flow: column;
      align-items: center;
      width: 21.5%;
      & .__card-img {
        width: 22rem;
        height: auto;
        transition: .3s all ease;
      }
      & .__card-img:hover {
        transform: scale(1.15);
      }
      & .__card-title {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        padding-top: 1rem;
      }
    }
  }
}

</style>