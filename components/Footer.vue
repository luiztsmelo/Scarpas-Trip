<template>
  <div class="footer">

    <img class="__img" src="../static/brand.svg">

    <div class="box">
      <h1 class="__title">Escarpas Trip</h1>
      <nuxt-link to="#"><h3 class="__subtitle">Sobre</h3></nuxt-link>
      <nuxt-link to="#"><h3 class="__subtitle">Contato</h3></nuxt-link>
      <nuxt-link to="#"><h3 class="__subtitle">Termos de Serviço</h3></nuxt-link>
      <nuxt-link to="#"><h3 class="__subtitle">Política de Reserva</h3></nuxt-link>
      <nuxt-link to="#"><h3 class="__subtitle">Política de Cancelamento</h3></nuxt-link>
    </div>

    <div class="box">
      <h1 class="__title">Anunciar</h1>
      <nuxt-link to="/anunciar/acomodacao"><h3 class="__subtitle">Acomodação</h3></nuxt-link>
      <nuxt-link to="/anunciar/passeio"><h3 class="__subtitle">Passeio</h3></nuxt-link>
      <nuxt-link to="/anunciar/evento"><h3 class="__subtitle">Evento</h3></nuxt-link>
      <nuxt-link to="/anunciar/restaurante"><h3 class="__subtitle">Restaurante</h3></nuxt-link>
    </div>

    <div class="box" style="margin-left: 4rem">
      <div class="follow">
        <a href="https://www.instagram.com/escarpastrip/"><img class="__img-follow" src="../assets/img/instagram.svg"></a>
        <a href="https://www.facebook.com/escarpastrip/"><img class="__img-follow" src="../assets/img/facebookb.svg"></a>
        <a href=""><img class="__img-follow" src="../assets/img/pinterest.svg" style="transform: scale(.98)"></a>
      </div>

      <div class="imgs-payment">
        <img class="__img-payment" src="../assets/img/mastercard.svg" style="transform: scale(.8)">
        <img class="__img-payment" src="../assets/img/visa.svg">
        <img class="__img-payment" src="../assets/img/hipercard.svg">
        <img class="__img-payment" src="../assets/img/amex.svg" style="transform: scale(.5)">
        <img class="__img-payment" src="../assets/img/elo.svg" style="transform: scale(1.18)">
        <img class="__img-payment" src="../assets/img/boleto.png" style="transform: scale(.69)">
      </div>

      <div class="trust">
        <img class="__img-lock" src="../assets/img/lock.svg">
        <div class="trust-text">
          <h2>Reserva 100% segura</h2>
          <h3>Seus dados protegidos</h3>
        </div>
      </div>
    </div>

    <h3 class="copyright">
      Copyright &copy {{ new Date().getFullYear() }} Escarpas Trip. Todos os direitos reservados. CNPJ: 99.999.999/9999-99. Capitólio/MG - Brasil. Desenvolvido com ♥ por TMstudio.
    </h3>

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
  height: 19rem;
  border-top: 1px solid rgb(232,232,232);
  /* background: #EAEAEC; */
  padding: 3.2rem 7%;
  & .__img {
    width: 5.5rem;
    height: auto;
    margin-right: 2.5rem;
    align-self: flex-start;

  }
  & .box {
    margin: 0 2.2rem;
    & .__title {
      font-size: 16px;
      padding-bottom: .5rem;

    }
    & .__subtitle {
      font-size: 15px;
      line-height: 25px;
    }
    & .trust {
      display: flex;
      align-items: center;
      & .__img-lock {
        width: 2.1rem;
        height: auto;
        margin-right: .5rem;

      }
      & .trust-text {
        & h2 {
          font-size: 14px;
          font-weight: 700;
          line-height: 17px;

        }
        & h3 {
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
        }
      }
    }
    & .imgs-payment {
      display: flex;
      align-items: center;
      margin: 1.2rem 0;
      transform: translateX(-0.3rem);
      & .__img-payment {
        width: 2.5rem;
        height: auto;
        margin-right: .6rem;
      }
    }
    & .follow {
      display: flex;
      align-items: center;
      & .__img-follow {
        width: 1.6rem;
        height: auto;
        margin-right: 1.8rem;

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