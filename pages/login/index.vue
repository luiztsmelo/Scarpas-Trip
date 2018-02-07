<template>
  <div class="login">
    <img src="../../assets/img/login.svg" class="__img-header">
    <h1 class="__title">Continuar como:</h1>
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
    margin: 2rem 0;
    width: 6rem;
    height: auto;
  }
  & .__title {
    font-size: 28px;
    font-weight: 700;
  }
}
</style>