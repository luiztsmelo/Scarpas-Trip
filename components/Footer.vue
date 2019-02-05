<template>
  <div class="footer">

    <img class="__img" src="../static/brand.svg">

    <div class="box">
      <h1 class="__title">Escarpas Trip</h1>
      <nuxt-link to="#"><h3 class="__subtitle">Sobre</h3></nuxt-link>
      <nuxt-link to="/termos"><h3 class="__subtitle">Termos de Serviço</h3></nuxt-link>
      <nuxt-link to="/termos#politica_privacidade"><h3 class="__subtitle">Política de Privacidade</h3></nuxt-link>
    </div>

    <div class="box">
      <h1 class="__title">Anunciar</h1>
      <nuxt-link to="/anunciar/acomodacao"><h3 class="__subtitle">Acomodação</h3></nuxt-link>
      <nuxt-link to="/anunciar/passeio"><h3 class="__subtitle">Passeio</h3></nuxt-link>
      <!-- <nuxt-link to="/anunciar/evento"><h3 class="__subtitle">Evento</h3></nuxt-link> -->
      <!-- <nuxt-link to="/anunciar/restaurante"><h3 class="__subtitle">Restaurante</h3></nuxt-link> -->
    </div>

    <div class="box" style="margin-left: 4rem">
      <h1 class="__title">Siga-nos</h1>
      <div class="follow">
        <a href="https://www.facebook.com/escarpastrip/"><img class="__img-follow" src="../assets/img/facebookb.svg"></a>
        <a href="https://www.instagram.com/escarpastrip/"><img class="__img-follow" src="../assets/img/instagram.svg"></a>
      </div>
    </div>

    <h3 class="copyright">
      &copy {{ new Date().getFullYear() }} Escarpas Trip. Todos os direitos reservados. CNPJ: 32.673.211/0001-81. Capitólio/MG - Brasil. <!-- Desenvolvido por TMstudio. -->
    </h3>

  </div>
</template>

<script>
export default {
}
</script>

<style>

.footer {
  position: relative;
  display: flex;
  margin-top: 4.5rem;
  width: 100%;
  height: 15rem;
  padding: 3.5rem 7%;
  & .__img {
    width: 3.6rem;
    height: auto;
    margin-right: 2.8rem;
    align-self: flex-start;
  }
  & .box {
    margin: 0 2.3rem;
    & .__title {
      font-size: 15px;
      padding-bottom: .5rem;
    }
    & .__subtitle {
      font-size: 14px;
      line-height: 26px;
    }
    & .__subtitle:hover {
      text-decoration: underline;
    }
    & .follow {
      display: flex;
      align-items: center;
      & .__img-follow {
        width: 2rem;
        height: auto;
        margin: .5rem 1rem 0 0;
      }
    }
  }
  & .copyright {
    position: absolute;
    text-align: center;
    bottom: 1.1rem;
    left: 7%;
    font-size: 13px;

  }
}

@media (max-width: 1024px) {
  .footer {
    display: none;
  }
}

</style>