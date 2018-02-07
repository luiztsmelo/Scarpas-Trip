<template>
  <div class="login">
    <h1 class="__title">Continuar como:</h1>
    <img src="../../assets/img/anunciante.svg" class="__img-header">
    <h2 class="__subtitle">Anunciante</h2>
    <img src="../../assets/img/turista.svg" class="__img-header">
    <h2 class="__subtitle">Turista</h2>
  </div>
</template>

<script>
export default {
  transition: 'opacity'
}
</script>

<style>
@import url('../../assets/css/main.css');

.login {
  margin-top: 3.2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  transition: var(--main-transition);
  & .__img-header {
    margin: 3rem 0 .7rem 0;
    width: 5.2rem;
    height: auto;
  }
  & .__title {
    padding-top: 2.5rem;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
  }
  & .__subtitle {
    font-size: 20px;
    font-weight: 400;
  }
}
</style>