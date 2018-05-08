<template>
  <div class="anunciar">

    <h1 class="__title">Amplie seus Ganhos. Anuncie Gratuitamente:</h1>

    <div class="category-container">

      <nuxt-link to="/anunciar/acomodacao" class="card">
        <img src="../../assets/img/casa.jpg" class="__card-img">
        <button class="__card-btn">Acomodação</button>
      </nuxt-link>

      <nuxt-link to="/anunciar/passeio" class="card">
        <img src="../../assets/img/passeio.jpg" class="__card-img">
        <button class="__card-btn">Passeio</button>
      </nuxt-link>

      <nuxt-link to="/anunciar/evento" class="card">
        <img src="../../assets/img/evento.jpg" class="__card-img">
        <button class="__card-btn">Evento</button>
      </nuxt-link>

      <nuxt-link to="/anunciar/restaurante" class="card">
        <img src="../../assets/img/restaurante.jpg" class="__card-img">
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
    padding: 4rem 20% 4rem;
    font-size: 34px;
    font-weight: 700;
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
      width: 23%;
      border-radius: 3px;
      box-shadow: 2px 2px 9px 4px rgba(0,0,0,0.13);
      & .__card-img {
        width: 100%;
        height: auto;
      }
      & .__card-btn {
        width: 100%;
        height: 2.9rem;
        font-size: 16px;
        font-weight: 600;
        background: white;
      }
    }
  }
}

</style>