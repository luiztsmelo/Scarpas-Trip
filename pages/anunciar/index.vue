<template>
  <div class="anunciar">

    <h1 class="__title">Amplie seus Ganhos. Anuncie Gratuitamente:</h1>

    <div class="category-container">

      <nuxt-link to="/anunciar/acomodacao" class="card">
        <img src="../../assets/img/anuncio-acomod.svg" class="__card-img">
        <button class="__card-btn">Acomodação</button>
      </nuxt-link>

      <nuxt-link to="/anunciar/passeio" class="card">
        <img src="../../assets/img/anuncio-passeio.svg" class="__card-img">
        <button class="__card-btn">Passeio</button>
      </nuxt-link>

      <nuxt-link to="/anunciar/evento" class="card">
        <img src="../../assets/img/anuncio-evento.svg" class="__card-img">
        <button class="__card-btn">Evento</button>
      </nuxt-link>

      <nuxt-link to="/anunciar/restaurante" class="card">
        <img src="../../assets/img/anuncio-restaurante.svg" class="__card-img">
        <button class="__card-btn">Restaurante</button>
      </nuxt-link>

    </div>



  </div>
</template>

<script>
export default {
  transition: 'opacity',
}
</script>

<style scoped>
@import url('../../assets/css/main.css');

.anunciar {
  padding: 4rem 7%;
  margin-bottom: 10rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  transition: var(--main-transition);
  & .__title {
    padding: 4rem 20% 5rem;
    font-size: 34px;
    font-weight: 600;
    text-align: center;
    line-height: 45px;
  }
  & .category-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    & .card {
      cursor: pointer;
      display: flex;
      flex-flow: column;
      align-items: center;
      width: 17%;
      & .__card-img {
        width: 55%;
        height: auto;
      }
      & .__card-btn {
        width: 100%;
        height: 4rem;
        font-size: 20px;
        font-weight: 600;
        background: white;
      }
    }
  }
}

</style>