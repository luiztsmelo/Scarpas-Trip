<template>
  <div class="anunciar">
    <h1 class="__title">Quanto maior sua visibilidade, maiores serão os seus ganhos</h1>

    <ul class="escolha-anuncio-box">

      <li>
        <nuxt-link to="#" class="anuncio-row">
          <img src="../../assets/img/estadia.svg" alt="Anunciar Estadia" class="__anuncio-img">
          <span class="__anuncio-text">Anunciar Estadia</span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="#" class="anuncio-row">
          <img src="../../assets/img/passeios.svg" alt="Anunciar Passeio" class="__anuncio-img">
          <span class="__anuncio-text">Anunciar Passeio</span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="#" class="anuncio-row">
          <img src="../../assets/img/eventos.svg" alt="Anunciar Evento" class="__anuncio-img">
          <span class="__anuncio-text">Anunciar Evento</span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="#" class="anuncio-row">
          <img src="../../assets/img/comidas.svg" alt="Anunciar Restaurante" class="__anuncio-img">
          <span class="__anuncio-text">Anunciar Restaurante</span>
        </nuxt-link>
      </li>

    </ul>

  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Anunciar ‒ Escarpas Trip'
    }
  },
  transition: 'slide-left'
}
</script>

<style scope>
@import url('../../assets/css/main.css');

.anunciar {
  margin-top: 3.5rem;
  display: flex;
  flex-flow: column;
  transition: all ease .3s;
  & .__title {
    padding: 3rem 7%;
  }
  & .escolha-anuncio-box {
    padding: 0 7%;
    & .anuncio-row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: .9rem;
      & .__anuncio-img {
        width: 1.8rem;
        height: auto;
        margin-right: .8rem;
      }
      & .__anuncio-text {
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
}
</style>
