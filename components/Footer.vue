<template>
  <div class="footer">

    <img class="__img" src="../static/brand.svg">

    <div class="box">
      <h1 class="__title">Escarpas Trip</h1>
      <nuxt-link to="#"><h3 class="__subtitle">Sobre</h3></nuxt-link>
      <nuxt-link to="#"><h3 class="__subtitle">Contato</h3></nuxt-link>
      <nuxt-link to="#"><h3 class="__subtitle">Termos de Serviço</h3></nuxt-link>
      <nuxt-link to="#"><h3 class="__subtitle">Política de Cancelamento</h3></nuxt-link>
    </div>

    <div class="box">
      <h1 class="__title">Anunciar</h1>
      <nuxt-link to="/anunciar/acomodacao"><h3 class="__subtitle">Acomodação</h3></nuxt-link>
      <nuxt-link to="/anunciar/passeio"><h3 class="__subtitle">Passeio</h3></nuxt-link>
      <nuxt-link to="/anunciar/evento"><h3 class="__subtitle">Evento</h3></nuxt-link>
      <nuxt-link to="/anunciar/restaurante"><h3 class="__subtitle">Restaurante</h3></nuxt-link>
    </div>

    <h3 class="copyright">&copy {{ new Date().getFullYear() }} Escarpas Trip. Todos os direitos reservados.</h3>

  </div>
</template>

<script>
export default {
  
}
</script>

<style>
@import url('../assets/css/main.css');

.footer {
  position: relative;
  display: flex;
  margin-top: 4.3rem;
  width: 100%;
  height: 16rem;
  border-top: 1px solid rgb(232,232,232);
  background: #EAEAEC;
  padding: 3.2rem 9%;
  & .__img {
    width: 7.5rem;
    height: auto;
    margin-right: 2.5rem;
    align-self: flex-start;
  }
  & .box {
    margin: 0 2rem;
    & .__title {
      font-size: 16px;
      padding-bottom: .5rem;
    }
    & .__subtitle {
      font-size: 15px;
      line-height: 23px;
    }
  }
  & .copyright {
    position: absolute;
    text-align: center;
    bottom: 1rem;
    left: 9%;
    font-size: 15px;

  }
}

@media (max-width: 1024px) {
  .footer {
    display: none;
  }
}

</style>